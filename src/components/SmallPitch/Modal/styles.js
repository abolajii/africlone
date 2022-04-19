import styled, { css } from 'styled-components/macro';

import { IoIosArrowForward } from 'react-icons/io';

export const Container = styled.div`
	/* height: 150px; */
	width: 116px;
	position: absolute;
	top: -20px;
	left: 13px;
	z-index: 999;
	/* overflow: hidden; */
	background: white;
	${({ bottom }) =>
		bottom &&
		css`
			top: ${bottom};
		`}
`;

export const Inner = styled.div`
	/* /* position: absolute;  */
	height: 100%;
	width: 100%;
`;

export const Upper = styled.div`
	display: flex;
	align-items: center;
	padding: 8px;
`;

export const ImageContainer = styled.div`
	height: 25px;
	width: 25px;
	border-radius: 50%;
	background: #fe4302;
	display: flex;
	color: white;
	align-items: center;
	justify-content: center;
`;

export const NameAndPosition = styled.div`
	margin-left: 0 !important;
	display: flex;
	flex-direction: column;
	margin-left: 5px !important;
	height: inherit;
`;

export const Name = styled.p`
	font-family: Baloo 2;
	font-size: 10px;
	font-style: normal;
	font-weight: 500;
	line-height: 8px;
	letter-spacing: 0em;
	text-align: left;
`;

export const Position = styled.p`
	margin-left: 0 !important;
	font-family: Baloo 2;
	font-size: 7px;
	font-style: normal;
	font-weight: 400;
	line-height: 8px;
	letter-spacing: 0em;
	text-align: left;
	color: #979797;
	margin-top: 5px;
`;

export const ModalEvent = styled.div`
	margin-left: 0 !important;
`;

export const EventContainer = styled.div`
	position: relative;
	padding: 4px 8px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-left: 0 !important;

	&:hover {
		background: #fe4302;
		color: white;
	}
`;

export const Event = styled.p``;

export const RightArrow = styled(IoIosArrowForward)``;

export const SubEventContainer = styled.div`
	width: 116px;
	background: white;
	position: absolute;
	left: 116px;
	color: black;
	top: ${({ top }) => (top ? top : 0)};
`;

export const SubEvent = styled.div`
	/* padding: 8px; */
	padding: 4px 8px;
	margin-left: 0 !important;
	display: flex;
	align-items: center;
	position: relative;
	justify-content: space-between;
	&:hover {
		background: #fe4302;
		color: white;
	}
`;

export const SubEventsContainer = styled.div`
	width: 116px;
	/* height: 150px; */
	background: white;
	position: absolute;
	top: 0;
	left: 116px;
	color: black;
`;

export const Events = styled.div`
	padding: 4px 8px;
	margin-left: 0 !important;
	display: flex;
	align-items: center;
	position: relative;
	justify-content: space-between;
	&:hover {
		background: #fe4302;
		color: white;
	}
`;

export const OutcomeContainer = styled.div`
	/* width: 130px; */
	/* height: 150px; */
	background: white;
	position: absolute;
	top: 0;
	left: 116px;
	color: black;
`;

export const OutcomeEvent = styled.div`
	padding: 6.2px 8px;
	margin-left: 0 !important;
	display: flex;
	align-items: center;
	position: relative;
	justify-content: space-between;
	&:hover {
		background: #fe4302;
		color: white;
	}
`;
