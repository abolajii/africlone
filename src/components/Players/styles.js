import styled, { css } from 'styled-components';
import { MdSearch } from 'react-icons/md';
import { Link } from 'react-router-dom';

export const SearchContainer = styled.div`
	display: flex;
	align-items: center;
`;

export const ImageContainer = styled.div`
	height: 24px;
	width: 24px;
	border-radius: 50%;
	margin-right: 10px;
	overflow: hidden;
`;

export const Image = styled.img`
	border-radius: 50%;
	width: 100%;
	height: 100%;
	object-fit: contain;
`;

export const SearchText = styled.p`
	margin: 0 7px 0 20px;
	font-family: Baloo 2;
	font-size: 13px;
	font-style: normal;
	font-weight: 500;
	line-height: 19px;
	letter-spacing: 0em;
	text-align: left;
	color: #030949;
`;

export const InputContainer = styled.div`
	height: 30px;
	width: 315px;
	position: relative;
	padding: 0 10px;
	display: flex;
	align-items: center;
	background: #d8d8d8;
`;

export const SearchIcon = styled(MdSearch)`
	font-size: 19px;
	margin-right: 3px;
	height: 100%;
	color: #8d9093;
`;

export const SearchInput = styled.input`
	font-size: 15px;
	background: transparent;
	width: 100%;
	outline: none;
	border: none;
`;

export const Table = styled.table`
	width: 100%;
	/* margin-left: 20px; */
	background: #e5e5e5;
	padding: 15px;
`;

export const TableContainer = styled.div`
	background-color: #e5e5e5;
	margin-top: 10px;
	/* min-height: 500px; */
	margin-left: 20px;
	padding: 10px;
`;

export const TableHeading = styled.thead`
	/* background-color: red; */
`;

export const TableHeader = styled.th`
	padding: 10px 0;

	${({ max }) =>
		max &&
		css`
			width: 150px;
		`}
`;

export const TableRow = styled.tr``;

export const TableBody = styled.tbody``;

export const TableColumn = styled.td`
	padding: 8px 0;
	border-bottom: 1px solid #d8d8d8;

	${({ display }) =>
		display &&
		css`
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 11px 0px;
			/* gap: 4px; */
			/* margin-right: 4px; */
		`};

	${({ img }) =>
		img &&
		css`
			display: flex;
			align-items: center;
		`};
`;

export const IconLink = styled(Link)`
	text-decoration: none;
`;

export const Icon = styled.div`
	display: flex;
	align-items: center;
	margin-right: 5px;
	cursor: pointer;
`;

export const View = styled(Link)`
	color: #2b52ba;
	text-decoration: none;

	&:hover {
		color: #2b52ba;
	}
`;
