import React, { useContext, useState, useEffect } from 'react';
import { DeleteOutline, EditOutlined } from '@material-ui/icons';
import * as ROUTES from '../../../constants/routes';
import { tableHeading } from './data';

import {
	Icon,
	Table,
	TableBody,
	TableColumn,
	TableContainer,
	TableHeader,
	TableHeading,
	TableRow,
	IconLink,
	View,
	SearchContainer,
	SearchText,
	InputContainer,
	SearchInput,
	ImageContainer,
	Image,
	SearchIcon,
} from './styles';
import { CreateModalContext } from '../../../context/Modal';
import { DeleteContext } from '../../../context/Delete';
import axios from '../../../helpers/axios';
import { GlobalContext } from '../../../context/Global';

import Pagination from '../../Pagination';

const iconStyles = {
	ic1: {
		height: '18px',
		width: '18px',
		color: '#fbbb00',
	},
	ic2: {
		height: '18px',
		width: '18px',
		color: ' #F14336',
	},
};

const Tables = () => {
	const [prev, setPrev] = useState(false);
	const [next, setNext] = useState(false);
	const [number, setNumber] = useState(1);
	const [num, setNum] = useState(1);

	const { competition, setCompetition, setDeleteModal, setId } =
		useContext(DeleteContext);
	const { setSingleCompetition } = useContext(GlobalContext);
	const { setDeleteType, setDeleteModalName } = useContext(CreateModalContext);

	const [query, setQuery] = useState('');

	useEffect(() => {
		axios
			.get(`/competition?page=${number}&perPage=10`)
			.then((response) => {
				setCompetition(response.data.data);
				setNext(response.data.pagination.hasNext);
				setPrev(response.data.pagination.hasPrevious);
				setNum(response.data.pagination.total);
			})
			.catch((err) => console.log(err));
	}, [number]);

	const handleCompetition = (each) => {
		setSingleCompetition(each);
	};

	function searchQuery(data) {
		return data.filter(
			(each) => each.name.toLowerCase().indexOf(query.toLowerCase()) > -1
		);
	}

	const deleteCompetition = (name, id) => {
		setDeleteModal(true);
		setDeleteModalName(name);
		setId(id);
		setDeleteType('competition');
	};

	const newCompetitionData = searchQuery(competition);

	return (
		<>
			<SearchContainer>
				<SearchText>Search</SearchText>
				<InputContainer>
					<SearchIcon />
					<SearchInput
						onChange={({ target }) => setQuery(target.value)}
						placeholder='Search competition'
					/>
				</InputContainer>
			</SearchContainer>

			<TableContainer>
				{query && newCompetitionData.length === 0 && <p>Try another search</p>}
				{newCompetitionData.length > 0 && (
					<Table>
						<TableHeader>
							<TableRow>
								{tableHeading.map((hd, index) => (
									<TableHeading max={hd.max} key={index}>
										{hd.head}
									</TableHeading>
								))}
							</TableRow>
						</TableHeader>
						<TableBody>
							{competition &&
								newCompetitionData.map((each, index) => (
									<TableRow key={index}>
										<TableColumn>{index + 1}</TableColumn>
										<TableColumn img={true}>
											<ImageContainer>
												<Image src={each.logo} alt={each.abbrev} />
											</ImageContainer>
											{each.name}
										</TableColumn>
										<TableColumn>{each.abbrev}</TableColumn>
										<TableColumn>{each.type}</TableColumn>
										<TableColumn>{each.country}</TableColumn>
										<TableColumn display='flex'>
											<Icon>
												<IconLink to={`${ROUTES.EDITCOMPETITION}/${each._id}`}>
													<EditOutlined style={iconStyles.ic1} size='small' />
												</IconLink>
											</Icon>
											<Icon background='#f14336'>
												<DeleteOutline
													onClick={() => deleteCompetition(each.name, each._id)}
													style={iconStyles.ic2}
												/>
											</Icon>
											<Icon>
												<View
													onClick={() => handleCompetition(each)}
													to={`${ROUTES.VIEWCOMPETITION}/${each._id}`}>
													View
												</View>
											</Icon>
										</TableColumn>
									</TableRow>
								))}
						</TableBody>
					</Table>
				)}
				{newCompetitionData.length > 0 && (
					<Pagination
						next={next}
						num={num}
						prev={prev}
						setNumber={setNumber}
						number={number}
					/>
				)}
			</TableContainer>
		</>
	);
};

export default Tables;
