import React from 'react';

import { Hero, Button, RecentMatches } from '../components/index';

import away from '../components/RecentMatches/img/away.png';
import prev from '../components/RecentMatches/img/prev.png';
import logo from '../components/RecentMatches/img/logo.png';
import epl from '../components/RecentMatches/img/epl.png';
import stadium from '../components/RecentMatches/img/stadium.png';
import liverpool from '../components/RecentMatches/img/liverpool.png';
import manu from '../components/RecentMatches/img/manu.png';

import { Stroke } from '../components/RecentMatches/styles';

const RecentMatchesContainer = () => {
	const recentMatches = [
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
	return (
		<RecentMatches>
			<Hero.TextContainer>
				<Hero.Text>Recent Matches</Hero.Text>
				<Button.ViewAll>View All</Button.ViewAll>
			</Hero.TextContainer>

			<RecentMatches.GridContainer>
				{/* Grid begins */}

				{recentMatches.map((recent) => {
					if (recent.id % 2 === 0) {
						return (
							<RecentMatches.Grid key={recent.id}>
								<RecentMatches.HomeTeam>
									<RecentMatches.HomeTeamLogoContainer>
										<RecentMatches.HomeTeamLogo src={prev} alt='home' />
									</RecentMatches.HomeTeamLogoContainer>
									<RecentMatches.HomeTeamName>
										Levante
									</RecentMatches.HomeTeamName>
								</RecentMatches.HomeTeam>

								{/* Data and Time Container */}

								<RecentMatches.ScoresAndDateContainer>
									<RecentMatches.LogoContainer>
										<RecentMatches.Logo src={logo} alt='logo' />
									</RecentMatches.LogoContainer>

									<RecentMatches.Date>
										{' '}
										9:00pm, Mon 23 Aug 2021
									</RecentMatches.Date>

									<RecentMatches.StadiumName>
										<RecentMatches.Logo
											left={true}
											src={stadium}
											alt='stadium'
										/>
										London Stadium, London
									</RecentMatches.StadiumName>
									<RecentMatches.ScoresContainer>
										<RecentMatches.Scores>1</RecentMatches.Scores>
										<Stroke />
										<RecentMatches.Scores>3</RecentMatches.Scores>
									</RecentMatches.ScoresContainer>
								</RecentMatches.ScoresAndDateContainer>

								{/* End of Date and TimeContainer */}

								<RecentMatches.AwayTeam>
									<RecentMatches.AwayTeamLogoContainer>
										<RecentMatches.AwayTeamLogo src={away} alt='away' />
									</RecentMatches.AwayTeamLogoContainer>
									<RecentMatches.AwayTeamName>
										Real Sociedad
									</RecentMatches.AwayTeamName>
								</RecentMatches.AwayTeam>
							</RecentMatches.Grid>
						);
					} else {
						return (
							<RecentMatches.Grid key={recent.id}>
								<RecentMatches.HomeTeam>
									<RecentMatches.HomeTeamLogoContainer>
										<RecentMatches.HomeTeamLogo src={manu} alt='home' />
									</RecentMatches.HomeTeamLogoContainer>
									<RecentMatches.HomeTeamName>
										Manchester United
									</RecentMatches.HomeTeamName>
								</RecentMatches.HomeTeam>

								{/* Data and Time Container */}

								<RecentMatches.ScoresAndDateContainer>
									<RecentMatches.LogoContainer>
										<RecentMatches.Logo src={epl} alt='logo' />
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
									<RecentMatches.ScoresContainer>
										<RecentMatches.Scores>0</RecentMatches.Scores>
										<Stroke />
										<RecentMatches.Scores>5</RecentMatches.Scores>
									</RecentMatches.ScoresContainer>
								</RecentMatches.ScoresAndDateContainer>

								{/* End of Date and TimeContainer */}

								<RecentMatches.AwayTeam>
									<RecentMatches.AwayTeamLogoContainer>
										<RecentMatches.AwayTeamLogo src={liverpool} alt='away' />
									</RecentMatches.AwayTeamLogoContainer>
									<RecentMatches.AwayTeamName>
										Liverpool{' '}
									</RecentMatches.AwayTeamName>
								</RecentMatches.AwayTeam>
							</RecentMatches.Grid>
						);
					}
				})}
			</RecentMatches.GridContainer>
		</RecentMatches>
	);
};

export default RecentMatchesContainer;
