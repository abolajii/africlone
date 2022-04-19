import React, { useState, useEffect } from 'react';
import { BackArrow } from '../components/Button/styles';
import * as ROUTES from '../constants/routes';
import { Hero, Button, MatchFixture } from '../components';
import { useLocation, useHistory } from 'react-router-dom';
import axios from '../helpers/axios';

import bg from '../components/RecentMatches/img/stadium.png';

const MatchFixtureContainer = () => {
	const query = new URLSearchParams(useLocation().search);
	const search = useLocation().search;

	const history = useHistory();
	const homeId = query.get('home');
	const awayId = query.get('away');
	const m_id = query.get('m_id');
	const d = query.get('d');
	const c = query.get('c');

	const [homeTeam, setHomeTeam] = useState([]);
	const [awayTeam, setAwayTeam] = useState([]);
	const [matchDetails, setMatchDetails] = useState({});

	const [competition, setCompetition] = useState({});

	useEffect(() => {
		const data = { match: m_id };

		axios
			.get(`/team/team/${homeId}`)
			.then((response) => {
				setHomeTeam(response.data.data);
			})
			.catch((err) => {
				console.log(err);
			});

		axios
			.get(`/team/team/${awayId}`)
			.then((response) => {
				setAwayTeam(response.data.data);
			})
			.catch((err) => {
				console.log(err);
			});

		axios
			.post(`/match/view-match`, data)
			.then((response) => {
				setMatchDetails(response.data.data);
			})
			.catch((err) => {
				console.log(err);
			});

		axios
			.get(`competition/competition/${c}`)
			.then((response) => {
				setCompetition(response.data.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [homeId, awayId, c, m_id]);

	const handleSubmit = (e) => {
		e.preventDefault();
		history.push({
			pathname: '/select-team',
			search,
		});
	};

	return (
		<>
			<Hero>
				<Button>
					<Button.Inner>
						<Button.TxtContainer>
							<Hero.Text>Match Fixture</Hero.Text>
						</Button.TxtContainer>

						<Button.ButtonLink to={ROUTES.ADD}>
							<BackArrow />
							BACK
						</Button.ButtonLink>
					</Button.Inner>
				</Button>

				<MatchFixture>
					<MatchFixture.Inner>
						<MatchFixture.Box>
							<MatchFixture.HomeTeam>
								<MatchFixture.HomeTeamLogoContainer>
									<MatchFixture.HomeTeamLogo src={homeTeam?.logo} alt='home' />
								</MatchFixture.HomeTeamLogoContainer>
								<MatchFixture.HomeTeamName>
									{homeTeam?.name}
								</MatchFixture.HomeTeamName>
							</MatchFixture.HomeTeam>

							<MatchFixture.TimeAndDateContainer>
								<MatchFixture.LogoContainer>
									<MatchFixture.Logo src={competition?.logo} alt='logo' />
								</MatchFixture.LogoContainer>

								<MatchFixture.TimeContainer>
									<MatchFixture.Time>{matchDetails?.time}</MatchFixture.Time>
								</MatchFixture.TimeContainer>

								<MatchFixture.DateContainer>
									<MatchFixture.Date>{d}</MatchFixture.Date>
								</MatchFixture.DateContainer>

								<MatchFixture.StadiumName>
									<MatchFixture.Logo stadium='true' src={bg} alt='stadium' />
									{matchDetails?.stadium}
								</MatchFixture.StadiumName>
							</MatchFixture.TimeAndDateContainer>
							<MatchFixture.AwayTeam>
								<MatchFixture.AwayTeamLogoContainer>
									<MatchFixture.AwayTeamLogo src={awayTeam?.logo} alt='away' />
								</MatchFixture.AwayTeamLogoContainer>
								<MatchFixture.AwayTeamName>
									{awayTeam?.name}
								</MatchFixture.AwayTeamName>
							</MatchFixture.AwayTeam>
						</MatchFixture.Box>

						<MatchFixture.ButtonContainer>
							<MatchFixture.ButtonInner>
								<MatchFixture.SelectTeamButton
									type='submit'
									onClick={handleSubmit}>
									SELECT TEAM LINEUP
								</MatchFixture.SelectTeamButton>
								<MatchFixture.EditMatchButton to={ROUTES.EDITMATCH}>
									EDIT MATCH DETAILS
								</MatchFixture.EditMatchButton>
							</MatchFixture.ButtonInner>
						</MatchFixture.ButtonContainer>
					</MatchFixture.Inner>
				</MatchFixture>
			</Hero>
		</>
	);
};

export default MatchFixtureContainer;
