import React, { useContext, useEffect, useState } from 'react';

import { Hero, Button } from '../../components';
import { BackArrow } from '../../components/Button/styles';
import * as ROUTES from '../../constants/routes';

import { useLocation, useHistory } from 'react-router-dom';
import axios from '../../helpers/axios';

import HomeTeamLineup from './HomeTeamLineup';
import AwayTeamLineup from './AwayTeamLineup';

import {
	AwayContainer,
	AwayStartingLineUp,
	AwayTeamLogo,
	AwayTeamLogoContainer,
	AwayTeamName,
	Box,
	ButtonContainer,
	DisabledButton,
	FormationAndTeamContainer,
	FormationContainer,
	FormationLabel,
	FormationSelectContainer,
	HomeContainer,
	HomeStartingLineUp,
	HomeTeamLogo,
	HomeTeamLogoContainer,
	HomeTeamName,
	MySelect,
	SelectionContainer,
	SelectionInner,
	StartingLineUp,
	TagButton,
} from './styles';
import FootballPitch from './FootballPitch';
import { PlayersContext } from '../../context/Players';

import { ToastContainer, toast } from 'react-toastify';

const SelectTeamLineup = () => {
	const search = useLocation().search;

	const history = useHistory();
	const { homePlayers, setHomePlayers, awayPlayers, setAwayPlayers } =
		useContext(PlayersContext);

	const homeSearch = new URLSearchParams(search).get('home');
	const awaySearch = new URLSearchParams(search).get('away');
	const m_id = new URLSearchParams(search).get('m_id');

	const [seasonAway, setSeasonAway] = useState([]);
	const [seasonHome, setSeasonHome] = useState([]);

	const [homeTeam, setHomeTeam] = useState({});
	const [awayTeam, setAwayTeam] = useState({});

	const [homeSelect, setHomeSelect] = useState(null);
	const [awaySelect, setAwaySelect] = useState(null);

	const [homeId, setHomeId] = useState('');
	const [awayId, setAwayId] = useState('');

	useEffect(() => {
		axios
			.get(`/team/team/${homeSearch}`)
			.then((response) => {
				setHomeTeam(response.data.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [homeSearch]);

	useEffect(() => {
		axios
			.get(`/team/team/${awaySearch}`)
			.then((response) => {
				setAwayTeam(response.data.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [awaySearch]);

	useEffect(() => {
		axios
			.get(`/team/season/${homeSearch}`)
			.then((response) => {
				// console.log(response.data.data);
				setSeasonHome(
					response.data.data.map((each) => {
						return {
							id: each._id,
							value: each.season_name,
							label: each.season_name,
						};
					})
				);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [homeSearch]);

	useEffect(() => {
		axios
			.get(`/team/season/${awaySearch}`)
			.then((response) => {
				setSeasonAway(
					response.data.data.map((each) => {
						return {
							id: each._id,
							value: each.season_name,
							label: each.season_name,
						};
					})
				);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [awaySearch]);

	useEffect(() => {
		axios
			.get(`/team/season/season/${homeId}`)
			.then((response) => {
				setHomePlayers(
					response.data.data[0].squad.map((each) => {
						return { ...each, checked: false };
					})
				);
			})
			.catch((err) => {
				console.log(err);
			});

		axios
			.get(`/team/season/season/${awayId}`)
			.then((response) =>
				setAwayPlayers(
					response.data.data[0].squad.map((each) => {
						return { ...each, checked: false };
					})
				)
			)
			.catch((err) => {
				console.log(err);
			});
	}, [homeId, setHomePlayers, setAwayPlayers, awayId]);

	//{home starting}
	const homeStarting = homePlayers.filter((each) => each.checked);
	const awayStarting = awayPlayers.filter((each) => each.checked);

	const homeSubs = homePlayers.filter((each) => !each.checked);
	const awaySubs = awayPlayers.filter((each) => !each.checked);

	//{disabled}
	const homeDisabled =
		!homePlayers[0]?.checked ||
		homeStarting.length < 11 ||
		homeStarting.length > 11;

	const awayDisabled =
		!awayPlayers[0]?.checked ||
		awayStarting.length < 11 ||
		awayStarting.length > 11;
	// console.log(awayDisabled);

	const [formation, setFormation] = useState(433);
	const [secondFormation, setSecondFormation] = useState(442);

	const newFormation = parseInt(formation?.value);
	const secondNewFormation = parseInt(secondFormation?.value);

	const [click, setClick] = useState(false);
	// renderFootballField //

	const formationOption = [
		{
			value: '442',
			label: '4-4-2',
		},
		{
			value: '433',
			label: '4-3-3',
		},
		{
			value: '4411',
			label: '4-4-1-1',
		},
		{
			value: '4321',
			label: '4-3-2-1',
		},
		{
			value: '532',
			label: '5-3-2',
		},
		{
			value: '343',
			label: '3-4-3',
		},
	];

	const handleHomeSelect = (e) => {
		setHomeSelect(e);
		setHomeId(e.id);
	};

	const handleAwaySelect = (e) => {
		setAwaySelect(e);
		setAwayId(e.id);
	};

	const handleSubmit = () => {
		// e.preventDefault();
		// navigate('/subs');

		setClick(true);
		const homeLineUp = homeStarting.map(({ checked, ...each }) => {
			return { ...each };
		});

		const awayLineUp = awayStarting.map(({ checked, ...each }) => {
			return { ...each };
		});

		const homeTeamSubs = homeSubs.map(({ checked, ...each }) => {
			return { ...each };
		});

		const awayTeamSubs = awaySubs.map(({ checked, ...each }) => {
			return { ...each };
		});

		const data = {
			matchId: m_id,
			home_team_line_up: homeLineUp,
			away_team_line_up: awayLineUp,
			home_team_subs: homeTeamSubs,
			away_team_subs: awayTeamSubs,
		};

		axios
			.post('/match/lineup', data)
			.then((res) => {
				setClick(false);
				history.push({
					pathname: ROUTES.STARTMATCH,
					search,
				});
			})
			.catch((err) => {
				setClick(false);
				toast.error('Something went wrong, try again later');
			});
	};

	return (
		<>
			<Hero>
				<ToastContainer />
				<Button>
					<Button.Inner>
						<Hero.Text>Team Selection</Hero.Text>
						<Button.ButtonLink to={{ pathname: ROUTES.MATCHFIXTURES, search }}>
							<BackArrow />
							BACK
						</Button.ButtonLink>
					</Button.Inner>
				</Button>

				<SelectionContainer>
					<SelectionInner>
						<FormationAndTeamContainer>
							<HomeContainer>
								<Box>
									<HomeTeamLogoContainer>
										<HomeTeamLogo src={homeTeam?.logo} alt='home' />
									</HomeTeamLogoContainer>
									<HomeTeamName>{homeTeam?.name}</HomeTeamName>
								</Box>

								<FormationContainer>
									<FormationLabel>Team Season</FormationLabel>
									<FormationSelectContainer>
										<MySelect
											first
											value={homeSelect}
											options={seasonHome}
											onChange={handleHomeSelect}
											placeholder='2021/2022'
										/>
									</FormationSelectContainer>
									<FormationLabel>Select Formation</FormationLabel>
									<FormationSelectContainer>
										<MySelect
											value={formation}
											onChange={setFormation}
											options={formationOption}
											placeholder='4-3-3'
										/>
									</FormationSelectContainer>
								</FormationContainer>
							</HomeContainer>
							<AwayContainer>
								<Box>
									<AwayTeamLogoContainer>
										<AwayTeamLogo src={awayTeam?.logo} alt='away' />
									</AwayTeamLogoContainer>
									<AwayTeamName>{awayTeam?.name}</AwayTeamName>
								</Box>
								<FormationContainer right>
									<FormationLabel>Team Season</FormationLabel>
									<FormationSelectContainer>
										<MySelect
											first
											onChange={handleAwaySelect}
											value={awaySelect}
											options={seasonAway}
											placeholder='2021/2022'
										/>
									</FormationSelectContainer>
									<FormationLabel opp>Select Formation</FormationLabel>
									<FormationSelectContainer>
										<MySelect
											value={secondFormation}
											onChange={setSecondFormation}
											options={formationOption}
											placeholder='4-4-2'
										/>
									</FormationSelectContainer>
								</FormationContainer>
							</AwayContainer>
						</FormationAndTeamContainer>

						<StartingLineUp>
							<HomeStartingLineUp>
								Starting Line-Up
								{homePlayers.map((each) => {
									return (
										<HomeTeamLineup
											homePlayers={homePlayers}
											setHomePlayers={setHomePlayers}
											each={each}
											key={each.id}
										/>
									);
								})}
							</HomeStartingLineUp>

							{/* {renderFootballField} */}
							<FootballPitch
								newFormation={newFormation}
								secondNewFormation={secondNewFormation}
							/>
							<AwayStartingLineUp>
								Starting Line-Up
								{awayPlayers.map((each) => {
									return (
										<AwayTeamLineup
											awayPlayers={awayPlayers}
											setAwayPlayers={setAwayPlayers}
											each={each}
											key={each.id}
										/>
									);
								})}
							</AwayStartingLineUp>
						</StartingLineUp>

						<ButtonContainer>
							{homeDisabled || awayDisabled ? (
								<DisabledButton disabled={homeDisabled || awayDisabled}>
									Start tagging match
								</DisabledButton>
							) : (
								<TagButton
									type='submit'
									className={click && 'not-allowed'}
									onClick={handleSubmit}>
									Start tagging match
								</TagButton>
							)}
						</ButtonContainer>
					</SelectionInner>
				</SelectionContainer>
			</Hero>
		</>
	);
};

export default SelectTeamLineup;
