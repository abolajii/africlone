import styled, { css } from 'styled-components/macro';

export const Container = styled.div`
	padding-top: 30px;
`;

export const GridContainer = styled.div`
	display: grid;
	max-width: 1230px;
	margin: auto;
	justify-items: center;
	gap: 10px;
	grid-template-columns: repeat(4, 1fr);
`;

export const Grid = styled.div`
	height: 157px;
	width: 300px;
	margin-top: 10px;
	display: flex;
	justify-content: center;
	background: #f2f2f2;
	box-shadow: 0px 4px 30px rgba(0, 0, 0, 0.1);
	border-radius: 2px;
	border: 1px solid #e5e5e5;
`;

export const HomeTeam = styled.div`
	display: flex;
	align-items: center;
	flex-direction: column;

	width: 100%;
	justify-content: center;
`;

export const HomeTeamLogoContainer = styled.div`
	height: 30px;
	width: 30px;
	margin-bottom: 6px;
`;

export const HomeTeamLogo = styled.img`
	height: 100%;
	width: 100%;
	object-fit: cover;
`;

export const HomeTeamName = styled.p`
	font-family: Baloo 2;
	font-size: 9px;
	font-style: normal;
	font-weight: 600;
	line-height: 8px;
	text-align: center;
	padding-top: 10px;
`;

export const ScoresAndDateContainer = styled.div`
	padding: 10px;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

export const LogoContainer = styled.div`
	display: flex;
	justify-content: center;
`;

export const Logo = styled.img`
	${(left) =>
		left &&
		css`
			margin-right: 2px;
		`}
`;

export const ScoresContainer = styled.div`
	height: 48px;
	width: 100px;
	display: flex;
	margin-top: 10px;
	justify-content: space-evenly;
	align-items: center;
	background: #979797;

	${({ blue }) => blue && 'background: #2b52ba'}
`;

export const Scores = styled.p`
	font-family: Baloo 2;
	font-size: 25px;
	font-style: normal;
	font-weight: 600;
	letter-spacing: 0em;
	text-align: center;
	color: #ffffff;
	margin-bottom: 0;
`;

export const Date = styled.p`
	font-family: Baloo 2;
	font-size: 9px;
	font-style: normal;
	font-weight: 500;
	text-align: center;
`;

export const DateContainer = styled.div`
	background: #d8d8d8;
	margin: auto;
	width: 100px;
`;

export const StadiumName = styled.p`
	font-family: Baloo 2;
	font-size: 8px;
	font-style: normal;
	font-weight: 500;
	letter-spacing: 0em;
	text-align: center;
`;

export const AwayTeam = styled.div`
	display: flex;
	align-items: center;
	width: 100%;
	flex-direction: column;
	justify-content: center;
`;

export const AwayTeamLogoContainer = styled.div`
	height: 30px;
	width: 30px;
	margin-bottom: 6px;
`;

export const AwayTeamLogo = styled.img`
	height: 100%;
	width: 100%;
	object-fit: contain;
`;

export const AwayTeamName = styled.p`
	font-family: Baloo 2;
	font-size: 9px;
	font-style: normal;
	font-weight: 600;
	line-height: 8px;
	letter-spacing: 0em;
	text-align: center;

	padding-top: 10px;
`;

export const Stroke = styled.div`
	height: 33px;
	width: 2px;
	background: #ffffff;
`;
