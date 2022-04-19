import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
	padding-left: 19px;
`;

export const Inner = styled.form`
	max-width: 1234px;
	margin: auto;
	height: 600px;
	background-color: #e5e5e5;
`;

export const Box = styled.div`
	margin: auto;
	display: flex;
	align-items: center;
	justify-content: center;
	padding-top: 80px;
`;

export const HomeTeam = styled.div`
	display: flex;
	align-items: center;
	flex-direction: column;
	justify-content: center;
	width: 120px;
	margin-top: 30px;
`;

export const HomeTeamLogoContainer = styled.div`
	height: 95px;
	width: 95px;
	border-radius: 50%;
	overflow: hidden;
	margin-bottom: 15px;
`;

export const HomeTeamLogo = styled.img`
	height: 100%;
	width: 100%;
	object-fit: cover;
`;

export const HomeTeamName = styled.p`
	font-family: Baloo 2;
	font-size: 14px;
	font-style: normal;
	font-weight: 600;
	line-height: 14px;
	text-align: center;

	padding-top: 10px;
`;

export const TimeAndDateContainer = styled.div``;

export const LogoContainer = styled.div`
	display: flex;
	justify-content: center;
	margin: 5px;
`;

export const Logo = styled.img`
	margin-right: 2px;

	${({ stadium }) =>
		!stadium &&
		`
		border-radius: 50%;
	width: 50px;
	height: 50px;
	object-fit: contain;
	
	`}
`;

export const TimeContainer = styled.div`
	background: blue;
	margin: auto;
	height: 71px;
	width: 150px;
	display: flex;
	justify-content: center;
	align-items: center;
	background: #2b52ba;
`;

export const Time = styled.p`
	font-family: Baloo 2;
	font-size: 25px;
	font-style: normal;
	font-weight: 600;
	letter-spacing: 0em;
	text-align: center;
	color: #ffffff;
`;

export const Date = styled.p`
	font-family: Baloo 2;
	font-size: 10px;
	font-style: normal;
	font-weight: 500;
	text-align: center;
`;

export const DateContainer = styled.div`
	background: #d8d8d8;
	margin: auto;
	height: 27px;
	width: 150px;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-bottom: 4px;
`;

export const StadiumName = styled.p`
	font-family: Baloo 2;
	font-size: 11px;
	font-style: normal;
	font-weight: 500;
	letter-spacing: 0em;
	text-align: center;
`;

export const AwayTeam = styled.div`
	display: flex;
	align-items: center;
	flex-direction: column;
	justify-content: center;
	width: 120px;

	margin-top: 30px;
`;

export const AwayTeamLogoContainer = styled.div`
	height: 95px;
	width: 95px;
	border-radius: 50%;
	overflow: hidden;
	margin-bottom: 15px;
`;

export const AwayTeamLogo = styled.img`
	height: 100%;
	width: 100%;
	object-fit: cover;
`;

export const AwayTeamName = styled.p`
	font-family: Baloo 2;
	font-size: 14px;
	font-style: normal;
	font-weight: 600;
	line-height: 14px;
	text-align: center;

	padding-top: 10px;
`;

export const ButtonContainer = styled.div``;

export const ButtonInner = styled.div`
	margin-top: 100px;
	display: flex;

	flex-direction: column;
	align-items: center;
	margin-left: 10px;
`;

export const SelectTeamButton = styled.button`
	height: 38px;
	width: 172px;
	outline: none;
	border: none;
	border-radius: 2px;
	background: #2b52ba;
	text-decoration: none;
	margin-bottom: 10px;
	display: flex;
	align-items: center;
	justify-content: center;
	color: white;
`;

export const EditMatchButton = styled(SelectTeamButton)`
	background: #00a15d;
`;
