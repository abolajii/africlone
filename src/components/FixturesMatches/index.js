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
	Time,
	TimeAndDateContainer,
	TimeContainer,
} from './styles';

const FixturesMatches = ({ children, ...restProps }) => {
	return <Container {...restProps}>{children}</Container>;
};

FixturesMatches.GridContainer = function FixturesMatchesGridContainer({
	children,
	...restProps
}) {
	return <GridContainer {...restProps}>{children}</GridContainer>;
};

FixturesMatches.Grid = function FixturesMatchesGrid({
	children,
	...restProps
}) {
	return <Grid {...restProps}>{children}</Grid>;
};

FixturesMatches.HomeTeam = function FixturesMatchesHomeTeam({
	children,
	...restProps
}) {
	return <HomeTeam {...restProps}>{children}</HomeTeam>;
};

FixturesMatches.HomeTeamLogoContainer =
	function FixturesMatchesHomeTeamLogoContainer({ children, ...restProps }) {
		return (
			<HomeTeamLogoContainer {...restProps}>{children}</HomeTeamLogoContainer>
		);
	};

FixturesMatches.HomeTeamLogo = function FixturesMatchesHomeTeamLogo({
	...restProps
}) {
	return <HomeTeamLogo {...restProps} />;
};

FixturesMatches.HomeTeamName = function FixturesMatchesHomeTeamName({
	children,
	...restProps
}) {
	return <HomeTeamName {...restProps}>{children}</HomeTeamName>;
};

FixturesMatches.TimeAndDateContainer =
	function FixturesMatchesTimeAndDateContainer({ children, ...restProps }) {
		return (
			<TimeAndDateContainer {...restProps}>{children}</TimeAndDateContainer>
		);
	};

FixturesMatches.LogoContainer = function FixturesMatchesLogoContainer({
	children,
	...restProps
}) {
	return <LogoContainer {...restProps}>{children}</LogoContainer>;
};

FixturesMatches.Logo = function FixturesMatchesLogo({ ...restProps }) {
	return <Logo {...restProps} />;
};

FixturesMatches.TimeContainer = function FixturesMatchesTimeContainer({
	children,
	recent,
	...restProps
}) {
	return (
		<TimeContainer recent={recent} {...restProps}>
			{children}
		</TimeContainer>
	);
};

FixturesMatches.Time = function FixturesMatchesTime({
	children,

	...restProps
}) {
	return <Time {...restProps}>{children}</Time>;
};

FixturesMatches.DateContainer = function FixturesMatchesDateContainer({
	children,
	...restProps
}) {
	return <DateContainer {...restProps}>{children}</DateContainer>;
};

FixturesMatches.Date = function FixturesMatchesDate({
	children,
	...restProps
}) {
	return <Date {...restProps}>{children}</Date>;
};

FixturesMatches.StadiumName = function FixturesMatchesStadiumName({
	children,
	...restProps
}) {
	return <StadiumName {...restProps}>{children}</StadiumName>;
};

FixturesMatches.AwayTeam = function FixturesMatchesAwayTeam({
	children,
	...restProps
}) {
	return <AwayTeam {...restProps}>{children}</AwayTeam>;
};

FixturesMatches.AwayTeamLogoContainer =
	function FixturesMatchesAwayTeamLogoContainer({ children, ...restProps }) {
		return (
			<AwayTeamLogoContainer {...restProps}>{children}</AwayTeamLogoContainer>
		);
	};

FixturesMatches.AwayTeamLogo = function FixturesMatchesAwayTeamLogo({
	...restProps
}) {
	return <AwayTeamLogo {...restProps} />;
};

FixturesMatches.AwayTeamName = function FixturesMatchesAwayTeamName({
	children,
	...restProps
}) {
	return <AwayTeamName {...restProps}>{children}</AwayTeamName>;
};

FixturesMatches.Grid = function FixturesMatchesGrid({
	children,
	...restProps
}) {
	return <Grid {...restProps}>{children}</Grid>;
};

export default FixturesMatches;
