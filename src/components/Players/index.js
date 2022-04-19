import React, { useContext, useEffect, useState } from 'react';
import { Button, Hero } from '..';
import Pagination from '../Pagination';

import * as ROUTES from '../../constants/routes';
import {
	Icon,
	IconLink,
	Image,
	ImageContainer,
	InputContainer,
	SearchContainer,
	SearchInput,
	SearchText,
	Table,
	TableBody,
	TableColumn,
	TableContainer,
	TableHeader,
	TableHeading,
	TableRow,
	View,
	SearchIcon,
} from './styles';

import { DeleteOutline, EditOutlined } from '@material-ui/icons';
import { CreateModalContext } from '../../context/Modal';
import { DeleteContext } from '../../context/Delete';
import axios from '../../helpers/axios';

const Players = () => {
	const [prev, setPrev] = useState(false);
	const [next, setNext] = useState(false);
	const [number, setNumber] = useState(1);
	const [num, setNum] = useState(1);

	const { setDeleteType, setDeleteModalName } = useContext(CreateModalContext);

	const { players, setPlayers, setId, setDeleteModal } =
		useContext(DeleteContext);

	const [query, setQuery] = useState('');

	useEffect(() => {
		axios
			.get(`/player?page=${number}&perPage=10`)
			.then((response) => {
				setPlayers(response.data.data);
				setNext(response.data.pagination.hasNext);
				setPrev(response.data.pagination.hasPrevious);
				setNum(response.data.pagination.total);
			})
			.catch((err) => console.log(err));
	}, [number]);

	const searchQuery = (data) => {
		return data.filter(
			(each) => each.first_name.toLowerCase().indexOf(query.toLowerCase()) > -1
		);
	};

	const deletePlayer = (name, id) => {
		setDeleteModal(true);
		setDeleteModalName(name);
		setId(id);
		setDeleteType('player');
	};

	const newPlayers = searchQuery(players);

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

	return (
		<Hero>
			<Button>
				<Button.Inner>
					<Button.TxtContainer>
						<Hero.Text>Players</Hero.Text>
					</Button.TxtContainer>

					<Button.ButtonLink to={ROUTES.CREATEPLAYER}>
						CREATE PLAYER
					</Button.ButtonLink>
				</Button.Inner>
			</Button>

			<SearchContainer>
				<SearchText>Search</SearchText>
				<InputContainer>
					<SearchIcon />
					<SearchInput
						onChange={({ target }) => setQuery(target.value)}
						placeholder='Search player'
					/>
				</InputContainer>
			</SearchContainer>

			<TableContainer>
				{query && newPlayers.length === 0 && <p>Try another search</p>}
				{newPlayers.length === 0 && (
					<p style={{ fontSize: '14px', fontStyle: 'italic' }}>
						No players, create one
					</p>
				)}

				{newPlayers.length > 0 && (
					<Table>
						<TableHeading>
							<TableRow>
								<TableHeader>#</TableHeader>
								<TableHeader>Player</TableHeader>
								<TableHeader>Position</TableHeader>
								<TableHeader>Role</TableHeader>
								<TableHeader>Nationality</TableHeader>
								<TableHeader max='true'>Action</TableHeader>
							</TableRow>
						</TableHeading>
						<TableBody>
							{newPlayers.map((each, index) => {
								return (
									<TableRow key={each.id}>
										<TableColumn>{index + 1}</TableColumn>
										<TableColumn img='true'>
											<ImageContainer>
												<Image src={each.image} alt={each.role} />
											</ImageContainer>
											{each.first_name} {each.last_name}
										</TableColumn>
										<TableColumn>{each.position}</TableColumn>
										<TableColumn>{each.role}</TableColumn>
										<TableColumn>{each.nationality}</TableColumn>
										<TableColumn display='flex'>
											<Icon>
												<IconLink to={`${ROUTES.EDITPLAYER}/${each._id}`}>
													<EditOutlined style={iconStyles.ic1} size='small' />
												</IconLink>
											</Icon>
											<Icon background='#f14336'>
												<DeleteOutline
													onClick={() =>
														deletePlayer(
															`${each.first_name} ${each.last_name}`,
															each._id
														)
													}
													style={iconStyles.ic2}
												/>
											</Icon>
											<Icon>
												<View to={`${ROUTES.VIEWSTATS}/${each._id}`}>View</View>
											</Icon>
										</TableColumn>
									</TableRow>
								);
							})}
						</TableBody>
					</Table>
				)}

				{newPlayers.length > 0 && (
					<Pagination
						next={next}
						num={num}
						prev={prev}
						setNumber={setNumber}
						number={number}
					/>
				)}
			</TableContainer>
		</Hero>
	);
};

export default Players;
