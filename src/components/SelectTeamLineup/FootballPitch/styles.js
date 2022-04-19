import styled, { css } from 'styled-components/macro';

export const FieldContainer = styled.div`
	flex: 1;
	display: flex;
	align-items: center;
	margin-top: 60px;
	height: 500px;
	background: green;
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
	left: 50%;
	transform: rotateY(180deg);
`;

export const HalfWayLineRight = styled.div`
	width: 70em;
	height: 80em;
`;

export const CornerArc = styled.div`
	&::before {
		top: calc(-5em / 2 - 0.3em);
	}
	&::after {
		bottom: calc(-4em / 2 - 0.3em);
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
