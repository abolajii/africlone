import React from 'react';

import {
	AwayTeam,
	AwayTeamLogo,
	AwayTeamLogoContainer,
	AwayTeamName,
	Box,
	ButtonContainer,
	ButtonInner,
	Container,
	Date,
	DateContainer,
	EditMatchButton,
	HomeTeam,
	HomeTeamLogo,
	HomeTeamLogoContainer,
	HomeTeamName,
	Inner,
	Logo,
	LogoContainer,
	SelectTeamButton,
	StadiumName,
	Time,
	TimeAndDateContainer,
	TimeContainer,
} from './styles';

const MatchFixture = ({ children, ...restProps }) => {
	return <Container {...restProps}>{children}</Container>;
};

MatchFixture.Inner = function MatchFixtureInner({ children, ...restProps }) {
	return <Inner {...restProps}>{children}</Inner>;
};

MatchFixture.Box = function MatchFixtureBox({ children, ...restProps }) {
	return <Box {...restProps}>{children}</Box>;
};

MatchFixture.HomeTeam = function MatchFixture({ children, ...restProps }) {
	return <HomeTeam {...restProps}>{children}</HomeTeam>;
};

MatchFixture.HomeTeamLogoContainer =
	function MatchFixtureHomeTeamLogoContainer({ children, ...restProps }) {
		return (
			<HomeTeamLogoContainer {...restProps}>{children}</HomeTeamLogoContainer>
		);
	};

MatchFixture.HomeTeamLogo = function MatchFixtureHomeTeamLogo({
	children,
	...restProps
}) {
	return <HomeTeamLogo {...restProps}>{children}</HomeTeamLogo>;
};

MatchFixture.HomeTeamName = function MatchFixtureHomeTeamName({
	children,
	...restProps
}) {
	return <HomeTeamName {...restProps}>{children}</HomeTeamName>;
};

MatchFixture.TimeAndDateContainer = function MatchFixtureTimeAndDateContainer({
	children,
	...restProps
}) {
	return <TimeAndDateContainer {...restProps}>{children}</TimeAndDateContainer>;
};

MatchFixture.LogoContainer = function MatchFixtureLogoContainer({
	children,
	...restProps
}) {
	return <LogoContainer {...restProps}>{children}</LogoContainer>;
};

MatchFixture.Logo = function MatchFixtureLogo({ ...restProps }) {
	return <Logo {...restProps} />;
};

MatchFixture.TimeContainer = function MatchFixtureTimeContainer({
	children,
	...restProps
}) {
	return <TimeContainer {...restProps}>{children}</TimeContainer>;
};

MatchFixture.Time = function MatchFixtureTime({ children, ...restProps }) {
	return <Time {...restProps}>{children}</Time>;
};

MatchFixture.Date = function MatchFixtureDate({ children, ...restProps }) {
	return <Date {...restProps}>{children}</Date>;
};

MatchFixture.DateContainer = function MatchFixtureDateContainer({
	children,
	...restProps
}) {
	return <DateContainer {...restProps}>{children}</DateContainer>;
};

MatchFixture.StadiumName = function MatchFixtureStadiumName({
	children,
	...restProps
}) {
	return <StadiumName {...restProps}>{children}</StadiumName>;
};

MatchFixture.AwayTeam = function MatchFixtureAwayTeam({
	children,
	...restProps
}) {
	return <AwayTeam {...restProps}>{children}</AwayTeam>;
};

MatchFixture.AwayTeamLogoContainer =
	function MatchFixtureAwayTeamLogoContainer({ children, ...restProps }) {
		return (
			<AwayTeamLogoContainer {...restProps}>{children}</AwayTeamLogoContainer>
		);
	};

MatchFixture.AwayTeamLogo = function MatchFixtureAwayTeamLogo({
	children,
	...restProps
}) {
	return <AwayTeamLogo {...restProps}>{children}</AwayTeamLogo>;
};

MatchFixture.AwayTeamName = function MatchFixtureAwayTeamName({
	children,
	...restProps
}) {
	return <AwayTeamName {...restProps}>{children}</AwayTeamName>;
};

MatchFixture.ButtonContainer = function MatchFixtureButtonContainer({
	children,
	...restProps
}) {
	return <ButtonContainer {...restProps}>{children}</ButtonContainer>;
};

MatchFixture.ButtonInner = function MatchFixtureButtonInner({
	children,
	...restProps
}) {
	return <ButtonInner {...restProps}>{children}</ButtonInner>;
};

MatchFixture.SelectTeamButton = function MatchFixtureSelectTeamButton({
	children,
	...restProps
}) {
	return <SelectTeamButton {...restProps}>{children}</SelectTeamButton>;
};

MatchFixture.EditMatchButton = function MatchFixtureEditMatchButton({
	children,
	...restProps
}) {
	return <EditMatchButton {...restProps}>{children}</EditMatchButton>;
};

export default MatchFixture;
