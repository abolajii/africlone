import styled, { css } from 'styled-components/macro';

export const Container = styled.div``;

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
	justify-content: center;
`;

export const HomeTeamLogoContainer = styled.div`
	height: 70px;
	width: 70px;
	margin-bottom: 6px;
`;

export const HomeTeamLogo = styled.img`
	height: 100%;
	width: 100%;
`;

export const HomeTeamName = styled.p`
	font-family: Baloo 2;
	font-size: 10px;
	font-style: normal;
	font-weight: 600;
	line-height: 8px;
	text-align: center;
	padding-top: 10px;
`;

export const TimeAndDateContainer = styled.div`
	padding: 10px;
	margin-top: 10px;
`;

export const LogoContainer = styled.div`
	display: flex;
	justify-content: center;
	margin: 5px;
`;

export const Logo = styled.img`
	${(left) =>
		left &&
		css`
			margin-right: 2px;
		`}
`;

export const TimeContainer = styled.div`
	height: 48px;
	width: 100px;
	margin: auto 5px;

	display: flex;
	justify-content: center;
	align-items: center;
`;

export const Time = styled.p`
	font-family: Baloo 2;
	font-size: 25px;
	font-style: normal;
	font-weight: 600;
	letter-spacing: 0em;
	text-align: center;
	color: #ffffff;
	/* width: 100%;
	height: 100%; */
`;

export const Date = styled.p`
	font-family: Baloo 2;
	font-size: 10px;
	font-style: normal;
	font-weight: 500;
	text-align: center;

	margin-bottom: 7px;
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

	margin-top: 10px;
`;

export const AwayTeam = styled.div`
	display: flex;
	align-items: center;
	flex-direction: column;
	justify-content: center;
`;

export const AwayTeamLogoContainer = styled.div`
	height: 70px;
	width: 70px;
	margin-bottom: 6px;
`;

export const AwayTeamLogo = styled.img`
	height: 100%;
	width: 100%;
	object-fit: contain;
`;

export const AwayTeamName = styled.p`
	font-family: Baloo 2;
	font-size: 10px;
	font-style: normal;
	font-weight: 600;
	line-height: 8px;
	letter-spacing: 0em;
	text-align: center;

	padding-top: 10px;
`;
