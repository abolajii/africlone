import styled, { css } from 'styled-components';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import { MdSearch } from 'react-icons/md';

import { IoIosRemoveCircle } from 'react-icons/io';

export const Container = styled.div`
	width: 100%;
`;

export const Inner = styled.div`
	/* width: 95%; */
	/* margin: auto; */
	padding: 20px;
	background: #f2f2f2;
	margin-left: 20px;
`;

export const Header = styled.div`
	display: flex;
	/* background: green; */
`;

export const Middle = styled.div`
	/* background: blue; */
`;

export const HeaderLeft = styled.div`
	width: 50%;
	display: flex;

	/* background: blue; */
`;

export const HeaderRight = styled.div`
	width: 50%;

	/* margin-left: 10px; */
	/* background: red; */
	display: flex;
	align-items: center;
	padding-top: 15px;
	justify-content: end;
`;

export const Title = styled.p`
	font-family: Baloo 2;
	font-style: normal;
	font-weight: normal;
	font-size: 18px;
`;

export const CountryAndLinkContainer = styled.div`
	display: flex;
`;

export const SmallText = styled.p`
	font-family: Baloo 2;
	font-size: 13px;
	font-style: normal;
	font-weight: 400;
	line-height: 20px;
	letter-spacing: -0.02em;
	text-align: left;
	margin-right: 5px;
`;

export const TextContainer = styled.div``;

export const ButtonOutline = styled.button`
	height: 38px;
	width: 145px;
	border-radius: 2px;
	outline: none;
	border: 1px solid #2b52ba;
	background: white;
	color: #2b52ba;
	margin: 0 5px;
`;

export const ImageContainer = styled.div`
	height: 45px;
	width: 45px;
	border-radius: 50%;
	background: white;
	margin-right: 10px;
	overflow: hidden;
`;

export const Img = styled.img`
	width: 100%;
	height: 100%;
	object-fit: cover;
`;

export const SmallImageContainer = styled.div`
	height: 24px;
	width: 24px;
	border-radius: 50%;
	margin-right: 10px;
	display: flex;
	align-items: center;
	justify-content: center;
	overflow: hidden;
	background-color: lightgrey;
`;

export const SmallImage = styled.img`
	border-radius: 50%;
	width: 100%;
	height: 100%;

	object-fit: cover;
`;

export const TeamImgContainer = styled.div``;

export const TeamName = styled.p``;

export const Label = styled.label``;

export const SearchContainer = styled.div`
	/* background: red; */
	display: flex;
	align-items: center;
	margin: 10px 0;
	justify-content: space-between;
`;

export const SearchText = styled.p`
	font-family: Baloo 2;
	font-size: 12px;
	font-style: normal;
	font-weight: 500;
	line-height: 19px;
	/* letter-spacing: 0em; */
	text-align: left;
	margin-right: 10px;
`;

export const SearchBox = styled.div`
	display: flex;
	align-items: center;
	/* background: red; */
`;

export const SearchIconContainer = styled.div`
	display: flex;
	align-items: center;
	background: #d8d8d8;
	padding: 0 5px;
`;

export const SearchIcon = styled(MdSearch)`
	font-size: 18px;
	display: flex;
	align-items: center;
	justify-content: center;
	height: 30px;
	color: #8d9093;
`;

export const SearchInput = styled.input`
	width: 315px;
	height: 30px;
	background: transparent;
	padding: 5px;
	outline: none;
	font-size: 15px;
	border: 0;
`;

export const SeasonContainer = styled.div`
	width: 188px;
	display: flex;
	align-items: center;
`;

export const SeasonText = styled.p`
	font-family: Baloo 2;
	font-size: 12px;
	font-style: normal;
	font-weight: 500;
	line-height: 19px;
	letter-spacing: 0em;
	text-align: left;
	margin-right: 5px;
`;

// export const TableContainer = styled.div`
// 	display: flex;
// 	padding-bottom: 20px;
// 	/* width: 100%; */
// 	margin: auto;
// 	max-width: 1200px;
// 	/* background: red; */
// 	gap: 10px;
// `;

// export const Bottom = styled.table`
// 	display: flex;
// 	flex: 1;
// 	width: 100%;
// 	/*

// 		margin: 10px 0;
// 		border-radius: 6px;
// 		padding: 10px;

// 		*/
// 	background: red;
// `;

// export const TableHeader = styled.thead``;

// export const TableHeading = styled.th`
// 	background: pink;
// `;

// export const TableRow = styled.tr``;

// export const TableBody = styled.tbody`
// 	/* background: blue; */
// 	/* width: 50%; */
// 	/* margin-right: 10px; */
// `;

// export const TableColumn = styled.td`
// 	/* padding: 10px 0;
// 	border-bottom: 0.5px solid #d8d8d8;
// 	cursor: pointer;
// 	background: red; */
// 	/* display: flex; */

// 	/* margin-right: 4px; */
// 	/* align-items: center; */
// 	${({ img }) =>
// 		img &&
// 		css`
// 			display: flex;
// 		`}
// `;

export const TableInner = styled.div`
	margin: auto;
	max-width: 1200px;
	/* background: red; */

	margin-top: 50px;
	/* height: 550px; */
	display: flex;
	gap: 10px;
`;

export const TableOne = styled.table`
	/* flex: 1; */
	/* background: green; */
	margin: 10px 0;
	border-radius: 6px;
	padding: 10px;
	width: 50%;
`;

export const TableBody = styled.tbody``;

export const TableRow = styled.tr``;

export const TableHeader = styled.thead`
	text-align: left;
`;

export const TableHeading = styled.th`
	padding: 10px;
`;

export const TableColumn = styled.td`
	border-bottom: 0.5px solid #d8d8d8;
	padding: 10px;
	cursor: pointer;
	/* margin-bottom: 10px; */
	${({ img }) =>
		img &&
		css`
			display: flex;
		`}
`;

export const TableTwo = styled.table`
	/* flex: 1; */
	/* background: green; */
	border-radius: 6px;
	margin: 10px 0;
	padding: 10px;

	width: 50%;
`;

export const MySelect = styled(Select)`
	width: 100%;
`;

export const ViewLink = styled(Link)`
	&:hover {
		color: #4183c7;
	}
`;

export const Remove = styled(IoIosRemoveCircle)`
	color: #ff7d50;
	background-color: transparent;
	margin-right: 2px;
`;
