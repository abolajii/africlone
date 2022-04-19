import axios from '../helpers/axios';
import React, { useEffect } from 'react';
import { FixturesMatches, RecentMatches } from '../components';
import home from '../components/FixturesMatches/img/img1.png';
import away from '../components/FixturesMatches/img/img2.png';
import logo from '../components/FixturesMatches/img/logo.png';
import stadium from '../components/FixturesMatches/img/stadium.png';

const fixtures = [
	{ id: 1 },
	{ id: 2 },
	{ id: 3 },
	{ id: 4 },
	{ id: 5 },
	{ id: 6 },
	{ id: 7 },
	{ id: 8 },
	{ id: 9 },
	{ id: 10 },
	{ id: 11 },
	{ id: 12 },
];

const FixturesContainer = () => {
	const data = {
		isScheduled: true,
	};
	useEffect(() => {
		axios
			.post('/match/matches', data)
			.then((response) => {
				console.log(response.data.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);
	return (
		<>
			<FixturesMatches>
				<FixturesMatches.GridContainer>
					{fixtures.map((fixture) => {
						return (
							<RecentMatches.Grid key={fixture.id}>
								<RecentMatches.HomeTeam>
									<RecentMatches.HomeTeamLogoContainer>
										<RecentMatches.HomeTeamLogo src={home} alt='home' />
									</RecentMatches.HomeTeamLogoContainer>
									<RecentMatches.HomeTeamName>
										Norwich city
									</RecentMatches.HomeTeamName>
								</RecentMatches.HomeTeam>

								{/* Data and Time Container */}

								<RecentMatches.ScoresAndDateContainer>
									<RecentMatches.LogoContainer>
										<RecentMatches.Logo src={logo} alt='logo' />
									</RecentMatches.LogoContainer>

									<RecentMatches.Date>
										{' '}
										5:00pm, Sat 23 Oct 2021
									</RecentMatches.Date>

									<RecentMatches.StadiumName>
										<RecentMatches.Logo
											left={true}
											src={stadium}
											alt='stadium'
										/>
										London Stadium, London
									</RecentMatches.StadiumName>
									<RecentMatches.ScoresContainer blue='true'>
										<FixturesMatches.Time>12:30</FixturesMatches.Time>
									</RecentMatches.ScoresContainer>
								</RecentMatches.ScoresAndDateContainer>

								{/* End of Date and TimeContainer */}

								<RecentMatches.AwayTeam>
									<RecentMatches.AwayTeamLogoContainer>
										<RecentMatches.AwayTeamLogo src={away} alt='away' />
									</RecentMatches.AwayTeamLogoContainer>
									<RecentMatches.AwayTeamName>
										Westham{' '}
									</RecentMatches.AwayTeamName>
								</RecentMatches.AwayTeam>
							</RecentMatches.Grid>
						);
					})}
				</FixturesMatches.GridContainer>
			</FixturesMatches>
		</>
	);
};

export default FixturesContainer;
