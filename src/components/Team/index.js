import React, { useContext, useEffect, useState } from 'react';
import { Hero, Button } from '../index';
import { DeleteOutline, EditOutlined } from '@material-ui/icons';
import * as ROUTES from '../../constants/routes';
import Pagination from '../Pagination';

import {
	InputContainer,
	SearchContainer,
	SearchInput,
	SearchText,
	Table,
	Icon,
	View,
	IconLink,
	TableBody,
	TableHeader,
	TableHeading,
	TableRow,
	TableColumn,
	TableContainer,
	ImageContainer,
	Image,
	SearchIcon,
} from './styles';

import axios from '../../helpers/axios';

import { CreateModalContext } from '../../context/Modal';
import { DeleteContext } from '../../context/Delete';
import { GlobalContext } from '../../context/Global';

const Teams = () => {
	const [query, setQuery] = useState('');

	function searchQuery(data) {
		return data.filter(
			(each) => each.name.toLowerCase().indexOf(query.toLowerCase()) > -1
		);
	}

	const { setDeleteType, setDeleteModalName } = useContext(CreateModalContext);

	const { teams, team, setTeams, setId, setDeleteModal } =
		useContext(DeleteContext);
	const { setSingleTeam, number, setNumber } = useContext(GlobalContext);
	const [num, setNum] = useState(1);

	const newTeam = searchQuery(teams);

	const [prev, setPrev] = useState(false);
	const [next, setNext] = useState(false);

	const deleteTeam = (name, id) => {
		setDeleteModal(true);
		setDeleteModalName(name);
		setDeleteType('team');
		setId(id);
	};

	const handleCompetition = (each) => {
		setSingleTeam(each);
	};

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

	useEffect(() => {
		axios
			.get(`/team?page=${number}&perPage=10`)
			.then((response) => {
				setNext(response.data.pagination.hasNext);
				setPrev(response.data.pagination.hasPrevious);
				setNum(response.data.pagination.total);
				// setGetNum(false ?true : false);
				setTeams(response.data.data);
			})
			.catch((err) => console.log(err));
	}, [number, setTeams, prev]);

	return (
		<Hero>
			<Button>
				<Button.Inner>
					<Button.TxtContainer>
						<Hero.Text>Teams</Hero.Text>
					</Button.TxtContainer>

					<Button.ButtonLink to={ROUTES.CREATETEAM}>
						CREATE TEAM
					</Button.ButtonLink>
				</Button.Inner>
			</Button>

			<SearchContainer>
				<SearchText>Search</SearchText>
				<InputContainer>
					<SearchIcon />
					<SearchInput
						onChange={({ target }) => setQuery(target.value)}
						placeholder='Search team'
					/>
				</InputContainer>
			</SearchContainer>
			<TableContainer>
				{query && newTeam?.length === 0 && <p>Try another search</p>}
				{newTeam.length > 0 && (
					<Table>
						<TableHeader>
							<TableRow>
								<TableHeading>#</TableHeading>
								<TableHeading>Team Name</TableHeading>
								<TableHeading>Nickname</TableHeading>
								<TableHeading>Country</TableHeading>
								<TableHeading max='true'>Action</TableHeading>
							</TableRow>
						</TableHeader>

						<TableBody>
							{newTeam.map((team, index) => (
								<TableRow key={index}>
									<TableColumn>{index + 1}</TableColumn>
									<TableColumn img={true}>
										<ImageContainer>
											<Image src={team.logo} alt={team.nick_name} />
										</ImageContainer>
										{team.name}
									</TableColumn>
									<TableColumn>{team.nick_name}</TableColumn>
									<TableColumn>{team.country}</TableColumn>

									<TableColumn display={'flex'}>
										<Icon>
											<IconLink to={`${ROUTES.EDITTEAM}/${team._id}`}>
												<EditOutlined style={iconStyles.ic1} size='small' />
											</IconLink>
										</Icon>
										<Icon background={'#f14336'}>
											<DeleteOutline
												onClick={() => deleteTeam(team.name, team._id)}
												style={iconStyles.ic2}
											/>
										</Icon>
										<Icon>
											<View
												onClick={() => handleCompetition(team)}
												to={`${ROUTES.VIEWTEAM}/${team._id}`}>
												View
											</View>
										</Icon>
									</TableColumn>
								</TableRow>
							))}
						</TableBody>
					</Table>
				)}
				{teams.length > 0 && (
					<Pagination
						setNumber={setNumber}
						number={number}
						next={next}
						num={num}
						prev={prev}
					/>
				)}
			</TableContainer>
		</Hero>
	);
};

export default Teams;
