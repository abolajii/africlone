import styled, { css } from 'styled-components';
import Select from 'react-select';
import { Link } from 'react-router-dom';

export const SelectionContainer = styled.div`
	/* padding-left: 30px;
	padding-right: 15px; */
	margin-top: 10px;
`;

export const SelectionInner = styled.div`
	min-height: 900px;
	background: #e5e5e5;
`;

export const FormationAndTeamContainer = styled.div`
	display: flex;
	/* height: 100px; */
	padding: 0 20px;
	justify-content: space-between;
`;

export const HomeContainer = styled.div`
	/* background: red; */
	display: flex;
`;

export const HomeTeamLogoContainer = styled.div`
	height: 90px;
	width: 90px;
`;

export const HomeTeamLogo = styled.img`
	height: 100%;
	width: 100%;
	object-fit: contain;
`;

export const HomeTeamName = styled.p`
	font-family: Baloo 2;
	font-size: 15px;
	font-style: normal;
	font-weight: 600;
	line-height: 8px;
	text-align: center;
	padding-top: 10px;
`;

export const AwayContainer = styled.div`
	/* background-color: blue; */
	display: flex;
	flex-direction: row-reverse;
`;

export const AwayTeamLogoContainer = styled.div`
	height: 90px;
	width: 90px;
`;

export const AwayTeamLogo = styled.img`
	height: 100%;
	width: 100%;
	object-fit: contain;
`;

export const AwayTeamName = styled.p`
	font-family: Baloo 2;
	font-size: 14px;
	font-style: normal;
	font-weight: 600;
	line-height: 8px;
	letter-spacing: 0em;
	text-align: center;
	padding-top: 10px;
`;

export const FormationContainer = styled.div`
	padding-top: 20px;
	margin-left: 35px;

	${({ right }) => right && `margin-right: 35px`}
`;

export const FormationLabel = styled.div`
	font-family: Baloo 2;
	font-style: normal;
	font-weight: 500;
	font-size: 14px;
	line-height: 14px;
	letter-spacing: 0.02em;

	color: #1e3354;

	${({ opp }) => opp && 'text-align : right '}
`;

export const FormationSelectContainer = styled.div`
	position: relative;
	width: 181px;
	height: 40px;
	margin: 10px 0;
`;

export const Box = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

export const MySelect = styled(Select)`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: ${({ first }) => (first ? '999' : '998')};
`;

export const StartingLineUp = styled.div`
	padding: 30px 25px 0px;
	display: flex;
	height: 650px;
`;

export const HomeStartingLineUp = styled.div`
	flex: 0.3;
`;

export const AwayStartingLineUp = styled.div`
	flex: 0.3;
	/* background-color: red; */
	text-align: right;
`;

export const FieldContainer = styled.div`
	flex: 0.4;
	background: green;
	display: flex;
	align-items: center;
	margin-top: 100px;
	height: 500px;
`;
export const FieldInner = styled.div`
	width: 150em;
	height: 80em;
	display: flex;
	background: green;
	align-items: center;
	font-size: 5px;
	padding: 5em;
`;

export const Field = styled.div`
	/* margin-top: 10px; */

	border: 2px solid white;
	position: relative;
	overflow: hidden;
	width: inherit;
	height: inherit;
	z-index: 3;
`;

export const Left = styled.div`
	background: green;
	position: relative;
`;

export const HalfWayLineLeft = styled.div`
	width: 70em;
	height: 80em;
	border-right: 2px solid white;
`;

export const CenterCircle = styled.div`
	width: 30em;
	height: 30em;
	position: absolute;
	top: 25em;
	left: calc((150em - 40em - 0.3em) / 2);
	border-radius: 50%;
	border: 2px solid white;
`;

export const PenaltyArea = styled.div`
	width: 18em;
	height: 44em;
	border: 2px solid white;
	position: absolute;
	top: calc((80em - 44em) / 2);
	left: -0.5em;
	z-index: 2;
	background: green;
`;

export const PenaltyArc = styled.div`
	left: calc(12em - 15em / 2);
	z-index: 0;
	width: 20em;
	height: 20em;
	border-radius: 50%;
	position: absolute;
	top: 30em;
	/* background: greenyellow; */
	border: 2px solid white;
`;

export const GoalArea = styled.div`
	width: 6em;
	height: 20em;
	border: 2px solid white;
	position: absolute;
	top: calc((80em - 20em) / 2);
	left: -0.4em;
	z-index: 2;
`;

export const Right = styled.div`
	position: absolute;
	top: 0%;
	/* background: red; */
	/* border: 1px solid red; */
	left: 50%;
	transform: rotateY(180deg);
`;

export const HalfWayLineRight = styled.div`
	width: 70em;
	height: 80em;
	/* border-left: 2px solid white; */
`;

export const CornerArc = styled.div`
	&::before {
		top: calc(-5em / 2 - 0.3em);
	}
	&::after {
		bottom: calc(-5em / 2 - 0.3em);
	}

	&::before,
	&::after {
		content: '';
		position: absolute;
		width: 5em;
		height: 5em;
		border: 2px solid white;
		border-radius: 50%;
		left: calc(-5em / 2 - 0.3em);
	}
`;

export const PlayerField = styled.div`
	position: absolute;
	top: 0;
	left: 12%;
	height: 100em;
	width: 53em;
	z-index: 1000;
`;

export const Players = styled.div`
	height: 25px;
	position: absolute;
	width: 25px;
	border-radius: 50%;
	background: red;
	border: 2px solid white;
	display: flex;
	top: ${({ top }) => top};
	left: ${({ left }) => (left ? left : '-4%')};
	align-items: center;
	justify-content: center;
	color: white;
	font-size: 12px;
	${({ right }) =>
		right &&
		css`
			transform: rotateY(-180deg);
			background: blue;
		`}
`;

export const ButtonContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
`;

export const DisabledButton = styled.button`
	height: 38px;
	width: 172px;
	border-radius: 2px;
	background: #2b52ba;
	font-family: Baloo 2;
	font-size: 13px;
	font-style: normal;
	font-weight: 500;
	/* line-height: 8px; */
	text-transform: uppercase;
	color: white;
	display: flex;
	align-items: center;
	outline: none;
	border: none;
	justify-content: center;

	&:disabled {
		opacity: 0.5;
	}
`;

export const TagButton = styled.button`
	height: 38px;
	width: 172px;
	border-radius: 2px;
	background: #2b52ba;
	font-family: Baloo 2;
	font-size: 13px;
	font-style: normal;
	font-weight: 500;
	/* line-height: 8px; */
	text-transform: uppercase;
	color: white;
	display: flex;
	align-items: center;
	outline: none;
	border: none;
	justify-content: center;

	&.not-allowed {
		cursor: not-allowed;
		opacity: 0.5;
	}
`;
