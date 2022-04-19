import React, { useContext, useEffect, useState } from 'react';

import { Hero, Button } from '../../index';
import * as ROUTES from '../../../constants/routes';
import { BackArrow } from '../../Button/styles';

import { teamData1, teamData2 } from './data';

import {
	ButtonOutline,
	Container,
	Header,
	HeaderLeft,
	HeaderRight,
	ImageContainer,
	Img,
	Inner,
	SearchContainer,
	SeasonText,
	MySelect,
	Middle,
	SearchBox,
	SearchText,
	SearchInput,
	SeasonContainer,
	TextContainer,
	CountryAndLinkContainer,
	SmallText,
	ViewLink,
	Title,
	TableHeader,
	TableColumn,
	TableRow,
	Bottom,
	TableHeading,
	TableBody,
	TableContainer,
	Remove,
	SmallImageContainer,
	SmallImage,
	SearchIconContainer,
	SearchIcon,
	TableInner,
	TableOne,
	TableTwo,
} from './styles';
import { CreateModalContext } from '../../../context/Modal';
import { GlobalContext } from '../../../context/Global';
import axios from '../../../helpers/axios';
import { DeleteContext } from '../../../context/Delete';
import { useParams } from 'react-router-dom';

const ViewCompetition = () => {
	const { id } = useParams();

	const [query, setQuery] = useState('');
	const {
		selectTeamsInCompetitionSeason,
		setSelectTeamsInCompetitionSeason,
		seasonOptions,
		setSeasonOptions,
	} = useContext(GlobalContext);
	const {
		setShowCompetitionTeamModal,
		setShowCompetitionSeasonModal,
		showCompetitionSeasonModal,
		setDeleteCompType,
		setDeleteCompTeam,
		setDeleteCompetitionTeamModal,
	} = useContext(CreateModalContext);

	const [teamSeasonId, setTeamSeasonId] = useState(null); //teamId

	const { setTeamCompId } = useContext(DeleteContext);
	const {
		singleCompetition,
		setSingleCompetition,
		tableCompetition,
		setTableCompetition,
	} = useContext(GlobalContext);

	const { logo, country, name } = singleCompetition;
	useEffect(() => {
		axios
			.get(`/competition/competition/${id}`)
			.then((response) => {
				setSingleCompetition(response.data.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [id]);

	useEffect(() => {
		axios
			.get(`/competition/season/${singleCompetition._id}`)
			.then((response) => {
				setSeasonOptions(
					response.data.data?.map((each) => {
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
	}, [showCompetitionSeasonModal]);

	useEffect(() => {
		axios
			.get(`/competition/season/season/${teamSeasonId}`)
			.then((response) => {
				setTableCompetition(response.data.data?.teams);
			})
			.catch((err) => console.log(err));
	}, [teamSeasonId, showCompetitionSeasonModal]);

	function searchQuery(data) {
		return data?.filter(
			(each) => each.name.toLowerCase().indexOf(query.toLowerCase()) > -1
		);
	}

	const newTeamOne = searchQuery(tableCompetition);

	const handleDelete = (e) => {
		setDeleteCompType('team');
		setDeleteCompTeam(e.name);
		setTeamCompId(e.team_id);
		console.log(e.team_id);
		setDeleteCompetitionTeamModal(true);
	};

	const handleSelectChange = (e) => {
		setSelectTeamsInCompetitionSeason(e);
		setTeamSeasonId(e.id);
	};

	return (
		<Hero>
			<Button>
				<Button.Inner>
					<Button.TxtContainer>
						<Hero.Text>Competition Details</Hero.Text>
					</Button.TxtContainer>

					<Button.ButtonLink to={ROUTES.COMPETITION}>
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
							<ButtonOutline
								onClick={() => setShowCompetitionSeasonModal(true)}>
								ADD NEW SEASON
							</ButtonOutline>
							<ButtonOutline onClick={() => setShowCompetitionTeamModal(true)}>
								ADD TEAM
							</ButtonOutline>
						</HeaderRight>
					</Header>
					<Middle>
						<SearchContainer>
							<SeasonContainer>
								<SeasonText>Season</SeasonText>
								<MySelect
									value={selectTeamsInCompetitionSeason}
									options={seasonOptions}
									onChange={handleSelectChange}
									placeholder='Select a season'
								/>
							</SeasonContainer>
							<SearchBox>
								<SearchText>Search</SearchText>

								<SearchIconContainer>
									<SearchIcon />
									<SearchInput
										onChange={({ target }) => setQuery(target.value)}
										placeholder='search competition'
									/>
								</SearchIconContainer>
							</SearchBox>
						</SearchContainer>
					</Middle>

					<TableInner>
						<TableOne>
							<TableHeader>
								<TableRow>
									<TableHeading>#</TableHeading>
									<TableHeading>Name</TableHeading>
									<TableHeading>Action</TableHeading>
								</TableRow>
							</TableHeader>
							<TableBody>
								{query && newTeamOne.length === 0 && <p>Try another search </p>}
								{newTeamOne &&
									newTeamOne.map((each, index) => {
										return (
											<TableRow>
												<TableColumn>{index + 1}</TableColumn>
												<TableColumn img={true}>
													<SmallImageContainer>
														<SmallImage src={each.logo} alt={each.nickname} />
													</SmallImageContainer>
													{each.name}
												</TableColumn>
												<TableColumn onClick={() => handleDelete(each)}>
													<Remove />
													Remove
												</TableColumn>
											</TableRow>
										);
									})}
							</TableBody>
						</TableOne>
						{/* <TableTwo>
							{' '}
							<TableHeader>
								<TableRow>
									<TableHeading>#</TableHeading>
									<TableHeading>Name</TableHeading>
									<TableHeading>Action</TableHeading>
								</TableRow>
							</TableHeader>
							<TableBody>
								<TableRow>
									<TableColumn>1</TableColumn>
									<TableColumn>Oshimen</TableColumn>
									<TableColumn>- Remove</TableColumn>
								</TableRow>
							</TableBody>
						</TableTwo> */}
					</TableInner>
				</Inner>
			</Container>
		</Hero>
	);
};

export default ViewCompetition;
