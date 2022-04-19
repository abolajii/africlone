import React from 'react';

import {
	AwayTeam,
	AwayTeamLogo,
	AwayTeamLogoContainer,
	AwayTeamName,
	Container,
	Date,
	DateContainer,
	Grid,
	GridContainer,
	HomeTeam,
	HomeTeamLogo,
	HomeTeamLogoContainer,
	HomeTeamName,
	Logo,
	LogoContainer,
	StadiumName,
	Scores,
	ScoresAndDateContainer,
	ScoresContainer,
} from './styles';

const RecentMatches = ({ children, ...restProps }) => {
	return <Container {...restProps}>{children}</Container>;
};

RecentMatches.GridContainer = function RecentMatchesGridContainer({
	children,
	...restProps
}) {
	return <GridContainer {...restProps}>{children}</GridContainer>;
};

RecentMatches.Grid = function RecentMatchesGrid({ children, ...restProps }) {
	return <Grid {...restProps}>{children}</Grid>;
};

RecentMatches.HomeTeam = function RecentMatchesHomeTeam({
	children,
	...restProps
}) {
	return <HomeTeam {...restProps}>{children}</HomeTeam>;
};

RecentMatches.HomeTeamLogoContainer =
	function RecentMatchesHomeTeamLogoContainer({ children, ...restProps }) {
		return (
			<HomeTeamLogoContainer {...restProps}>{children}</HomeTeamLogoContainer>
		);
	};

RecentMatches.HomeTeamLogo = function RecentMatchesHomeTeamLogo({
	...restProps
}) {
	return <HomeTeamLogo {...restProps} />;
};

RecentMatches.HomeTeamName = function RecentMatchesHomeTeamName({
	children,
	...restProps
}) {
	return <HomeTeamName {...restProps}>{children}</HomeTeamName>;
};

RecentMatches.ScoresAndDateContainer =
	function RecentMatchesScoresAndDateContainer({ children, ...restProps }) {
		return (
			<ScoresAndDateContainer {...restProps}>{children}</ScoresAndDateContainer>
		);
	};

RecentMatches.LogoContainer = function RecentMatchesLogoContainer({
	children,
	...restProps
}) {
	return <LogoContainer {...restProps}>{children}</LogoContainer>;
};

RecentMatches.Logo = function RecentMatchesLogo({ left, ...restProps }) {
	return <Logo left={left} {...restProps} />;
};

RecentMatches.ScoresContainer = function RecentMatchesScoresContainer({
	children,
	recent,
	blue,
	...restProps
}) {
	return (
		<ScoresContainer blue={blue} recent={recent} {...restProps}>
			{children}
		</ScoresContainer>
	);
};

RecentMatches.Scores = function RecentMatchesScores({
	children,
	...restProps
}) {
	return <Scores {...restProps}>{children}</Scores>;
};

RecentMatches.DateContainer = function RecentMatchesDateContainer({
	children,
	...restProps
}) {
	return <DateContainer {...restProps}>{children}</DateContainer>;
};

RecentMatches.Date = function RecentMatchesDate({ children, ...restProps }) {
	return <Date {...restProps}>{children}</Date>;
};

RecentMatches.StadiumName = function RecentMatchesStadiumName({
	children,
	...restProps
}) {
	return <StadiumName {...restProps}>{children}</StadiumName>;
};

RecentMatches.AwayTeam = function RecentMatchesAwayTeam({
	children,
	...restProps
}) {
	return <AwayTeam {...restProps}>{children}</AwayTeam>;
};

RecentMatches.AwayTeamLogoContainer =
	function RecentMatchesAwayTeamLogoContainer({ children, ...restProps }) {
		return (
			<AwayTeamLogoContainer {...restProps}>{children}</AwayTeamLogoContainer>
		);
	};

RecentMatches.AwayTeamLogo = function RecentMatchesAwayTeamLogo({
	...restProps
}) {
	return <AwayTeamLogo {...restProps} />;
};

RecentMatches.AwayTeamName = function RecentMatchesAwayTeamName({
	children,
	...restProps
}) {
	return <AwayTeamName {...restProps}>{children}</AwayTeamName>;
};

RecentMatches.Grid = function RecentMatchesGrid({ children, ...restProps }) {
	return <Grid {...restProps}>{children}</Grid>;
};

export default RecentMatches;
