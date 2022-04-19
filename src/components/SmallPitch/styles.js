import styled, { css } from 'styled-components';

export const Container = styled.div`
	width: 100%;
	padding: 10px;
	background-color: green;
	display: flex;
	align-items: center;
	justify-content: center;
`;

export const Inner = styled.div`
	border: 2px solid white;
	background-color: green;
	height: 300px;
	position: relative;
	width: 100%;
	display: flex;
`;

export const Left = styled.div`
	background: green;
	position: relative;
	flex: 1;
`;

export const Right = styled.div`
	background: green;
	position: relative;
	flex: 1;
`;

export const HalfWayLineLeft = styled.div`
	/* width: 50%; */
	height: 100%;
	border-right: 2px solid white;
`;

export const GoalArea = styled.div`
	width: 3em;
	height: 100px;
	border: 2px solid white;
	position: absolute;
	top: calc(200px / 2);
	left: -0.1em;
	z-index: 1;
`;

export const PenaltyArea = styled.div`
	width: 5em;
	height: 140px;
	border: 2px solid white;
	border-left: 0;
	position: absolute;
	top: calc(160px / 2);
	/* top: 0; */
	left: -14px;
	background: green;
`;

export const RightPenaltyArea = styled.div`
	width: 5em;
	height: 140px;
	border: 2px solid white;
	position: absolute;
	bottom: calc(150px / 2);
	right: -2px;
`;

export const CenterCircle = styled.div`
	width: 100px;
	height: 100px;
	position: absolute;
	top: calc(200px / 2);
	right: calc((350px) / 2);
	border-radius: 50%;
	border: 2px solid white;
`;

export const RightCenterCircle = styled.div`
	width: 100px;
	height: 100px;
	position: absolute;
	top: calc(220px / 2);
	right: calc((630px - 57px) / 2);
	border-radius: 50%;
	border: 2px solid white;
`;

export const RightGoalArea = styled.div`
	width: 3em;
	height: 100px;
	border: 2px solid white;
	position: absolute;
	top: calc(200px / 2);
	right: -0.1em;
`;

export const PlayerContainer = styled.div`
	position: absolute;
	z-index: ${({ z }) => z};
	height: 100%;
	width: 100%;
	/* background-color: red; */
`;

// export const HalfWayLineLeft = styled.div`
// 	width: 50%;
// 	height: 296px;
// 	border-right: 2px solid white;
// `;

// export const CenterCircle = styled.div`
// 	width: 100px;
// 	height: 100px;
// 	position: absolute;
// 	top: calc(190px / 2);
// 	left: calc((400px - 60px) / 2);
// 	border-radius: 50%;
// 	border: 2px solid white;
// `;

// export const PenaltyArea = styled.div`
// 	width: 5em;
// 	height: 150px;
// 	border: 2px solid white;
// 	position: absolute;
// 	top: calc((150px) / 2);
// 	left: -2px;
// 	background: green;
// 	${({ right }) => right && 'left: -5px'}
// `;

// export const GoalArea = styled.div`
// 	width: 3em;
// 	height: 80px;
// 	border: 2px solid white;
// 	position: absolute;
// 	top: calc(70px + 6em / 2);
// 	left: -0.1em;
// 	${({ right }) => right && 'left: 10px'}
// `;

// export const PenaltyArc = styled.div``;

// export const Right = styled.div`
// 	position: absolute;
// 	top: 0%;
// 	right: -2.5%;
// 	background-color: green;
// 	transform: rotateY(-180deg);
// 	/* z-index: 1; */
// `;

// export const PlayerField = styled.div`
// 	position: absolute;
// 	width: 220px;
// 	top: 15px;
// 	left: 15px;
// 	display: flex;
// 	height: 270px;
// `;

export const Players = styled.div`
	height: 25px;
	width: 25px;
	margin-left: 0 !important;
	background: ${({ active }) => (active ? '#fe4302' : 'red')};
	position: absolute;
	top: ${({ top }) => top};
	border-radius: 50%;

	left: ${({ left }) => left};
	border: 1.5px solid white;
	cursor: pointer;
	span {
		display: flex;
		align-items: center;
		justify-content: center;
		color: white;
	}
`;

export const AwayPlayers = styled.div`
	height: 25px;
	width: 25px;
	margin-left: 0 !important;
	background: ${({ active }) => (active ? '#2B52BA' : 'blue')};
	position: absolute;
	top: ${({ top }) => top};
	border-radius: 50%;
	right: ${({ right }) => right};
	/* transform: rotateY(-180deg); */
	border: 1.5px solid white;
	bottom: ${({ bottom }) => bottom};
	cursor: pointer;
	span {
		display: flex;
		align-items: center;
		justify-content: center;
		/* color: white; */
		color: white;
	}
`;

export const AwayPlayerContainer = styled.div`
	position: absolute;
	z-index: ${({ z }) => z};
	height: 100%;
	width: 100%;
`;
