import React, { useContext, useEffect, useState } from 'react';
import { Hero, Button } from '../..';
import { BackArrow } from '../../Button/styles';
import { useParams } from 'react-router-dom';

import * as ROUTES from '../../../constants/routes';
import {
	ButtonOutline,
	Container,
	CountryAndLinkContainer,
	Header,
	HeaderLeft,
	HeaderRight,
	ImageContainer,
	Img,
	Inner,
	SmallText,
	TextContainer,
	Title,
	ViewLink,
	Middle,
	SearchContainer,
	SeasonContainer,
	SeasonText,
	SearchBox,
	SearchText,
	SearchInput,
	MySelect,
	TableContainer,
	TableHeading,
	TableRow,
	TableHeader,
	TableColumn,
	TableBody,
	Remove,
	SearchIconContainer,
	SearchIcon,
	SmallImageContainer,
	SmallImage,
} from './styles';

import { CreateModalContext } from '../../../context/Modal';
import { GlobalContext } from '../../../context/Global';
import axios from '../../../helpers/axios';
import { DeleteContext } from '../../../context/Delete';

const ViewTeam = () => {
	const { team_id } = useParams();
	const [query, setQuery] = useState('');
	const [seasonPlayer, setSeasonPlayer] = useState(null);
	const [teamOptions, setTeamOptions] = useState([]);
	const {
		singleTeam,
		setSingleTeam,
		seasonPlayerId,
		setSeasonPlayerId,
		playersInASeason,
		setPlayersInASeason,
	} = useContext(GlobalContext);

	function searchQuery(data) {
		return data.filter(
			(each) => each.first_name.toLowerCase().indexOf(query.toLowerCase()) > -1
		);
	}

	const newDataTeam = searchQuery(playersInASeason);

	const { setDeleteCompetitionTeamModal } = useContext(CreateModalContext);

	const {
		setShowTeamSeasonModal,
		setShowTeamModal,
		setDeleteCompType,
		setDeleteCompTeam,
		showTeamModal,
		showTeamSeasonModal,
	} = useContext(CreateModalContext);

	const { logo, country, name } = singleTeam;

	const { setPlayerId } = useContext(DeleteContext);

	useEffect(() => {
		axios
			.get(`/team/season/${team_id}`)
			.then((response) => {
				setTeamOptions(
					response.data.data.map((each) => {
						return {
							value: each.season_name,
							label: each.season_name,
							id: each._id,
						};
					})
				);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [showTeamSeasonModal, showTeamModal, singleTeam, team_id]);

	useEffect(() => {
		axios
			.get(`/team/team/${team_id}`)
			.then((response) => {
				setSingleTeam(response.data.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [team_id]);

	useEffect(() => {
		axios
			.get(`/team/season/season/${seasonPlayerId}`)
			.then((result) => {
				setPlayersInASeason(result.data.data[0].squad);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [seasonPlayerId]);

	const handleSeasonChange = (e) => {
		setSeasonPlayer(e);
		setSeasonPlayerId(e.id);
	};

	const handleDelete = (e) => {
		setDeleteCompType('player');
		setDeleteCompTeam(`${e.first_name} ${e.last_name}`);
		setPlayerId(e.player_id);
		setDeleteCompetitionTeamModal(true);
	};

	return (
		<>
			<Hero>
				<Button>
					<Button.Inner>
						<Button.TxtContainer>
							<Hero.Text>Team Details</Hero.Text>
						</Button.TxtContainer>

						<Button.ButtonLink to={ROUTES.TEAMS}>
							<BackArrow />
							BACK
						</Button.ButtonLink>
					</Button.Inner>
				</Button>

				<Container>
					<Inner>
						<Header>
							<HeaderLeft>
								<ImageContainer>
									<Img src={logo} />
								</ImageContainer>

								<TextContainer>
									<Title>{name}</Title>
									<CountryAndLinkContainer>
										<SmallText>{country}</SmallText>
										<ViewLink>View Competition Details</ViewLink>
									</CountryAndLinkContainer>
								</TextContainer>
							</HeaderLeft>
							<HeaderRight>
								<ButtonOutline onClick={() => setShowTeamSeasonModal(true)}>
									ADD NEW SEASON
								</ButtonOutline>
								<ButtonOutline onClick={() => setShowTeamModal(true)}>
									ADD PLAYER
								</ButtonOutline>
							</HeaderRight>
						</Header>
						<Middle>
							<SearchContainer>
								<SeasonContainer>
									<SeasonText>Season</SeasonText>
									<MySelect
										value={seasonPlayer}
										onChange={handleSeasonChange}
										options={teamOptions}
									/>
								</SeasonContainer>
								<SearchBox>
									<SearchText>Search</SearchText>

									<SearchIconContainer>
										<SearchIcon />
										<SearchInput
											onChange={({ target }) => setQuery(target.value)}
											placeholder='search player'
										/>
									</SearchIconContainer>
								</SearchBox>
							</SearchContainer>
						</Middle>
						<TableContainer>
							<TableHeading>
								<TableRow>
									<TableHeader>#</TableHeader>
									<TableHeader>Player</TableHeader>
									<TableHeader>Position</TableHeader>
									<TableHeader>Role</TableHeader>
									<TableHeader>Nationality</TableHeader>
									<TableHeader>Action</TableHeader>
								</TableRow>
							</TableHeading>
							<TableBody>
								{newDataTeam.length === 0 && query && <p>Try another search</p>}
								{newDataTeam &&
									newDataTeam.map((each, index) => {
										return (
											<TableRow key={index}>
												<TableColumn>{index + 1}</TableColumn>
												<TableColumn img={'true'}>
													<SmallImageContainer>
														<SmallImage src={each.image} alt={each.role} />
													</SmallImageContainer>
													{each.first_name} {each.last_name}
												</TableColumn>
												<TableColumn>{each.position}</TableColumn>
												<TableColumn>{each.role[0]}</TableColumn>
												<TableColumn>{each.nationality}</TableColumn>
												<TableColumn
													onClick={() => handleDelete(each)}
													display={'flex'}>
													<Remove />
													Remove
												</TableColumn>
											</TableRow>
										);
									})}
							</TableBody>
						</TableContainer>
					</Inner>
				</Container>
			</Hero>
		</>
	);
};

export default ViewTeam;
