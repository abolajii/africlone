import { Link } from 'react-router-dom';
import styled from 'styled-components/macro';

import { FiChevronLeft } from 'react-icons/fi';

export const Container = styled.div`
	margin-bottom: 8px;
`;

export const Inner = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

export const ButtonLink = styled(Link)`
	width: 128px;
	height: 38px;
	background-color: #2b52ba;
	color: #ffffff;
	display: flex;
	align-items: center;
	justify-content: center;
	text-decoration: none;

	font-size: ${({ fs }) => `${fs}px`};
	${({ fw }) => fw && 'padding: 0 20px'};
	${({ fw }) => fw && 'width: 165px'};

	&:hover {
		color: #ffffff;
	}
`;

export const ViewAll = styled.button`
	background: none;
	color: #2b52ba;
	border: none;
	cursor: pointer;
`;

export const BackArrow = styled(FiChevronLeft)`
	color: white;
	display: flex;
	align-items: center;
	justify-content: center;

	margin-right: 7px;
`;

export const TxtContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	padding-left: 19px;
`;
