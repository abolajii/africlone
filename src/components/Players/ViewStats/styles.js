import styled from 'styled-components';
import Select from 'react-select';
import { Link } from 'react-router-dom';

export const Container = styled.div`
	background: #e5e5e5;
	margin-left: 20px;
	margin-top: 30px;

	min-height: 700px;
`;

export const Inner = styled.div`
	/* max-width: 1000px; */
	/* margin: auto; */
	/* background: red; */
`;

export const ImageAndFileContainer = styled.div`
	display: flex;
	padding: 0 30px;
	align-items: center;
	height: 120px;
	justify-content: space-between;
	border: 1px solid #d8d8d8;
`;

export const ImageContainer = styled.div`
	height: 55px;
	width: 55px;
	border-radius: 50%;
	background: grey;
	overflow: hidden;
	margin-right: 10px;
`;

export const Image = styled.img`
	height: 100%;
	width: 100%;
	object-fit: cover;
`;

export const ImageAndLabelContainer = styled.div`
	display: flex;
	align-items: center;
`;

export const LabelContainer = styled.div``;

export const PlayerName = styled.p`
	font-family: Baloo 2;
	font-size: 15px;
	font-style: normal;
	font-weight: 600;
	line-height: 14px;
	letter-spacing: 0.02em;
	text-align: left;
	color: #1e3354;
`;
export const PlayerPosition = styled.p`
	font-family: Baloo 2;
	font-size: 13px;
	font-style: normal;
	font-weight: 400;
	line-height: 20px;
	letter-spacing: -0.02em;
	text-align: left;
	color: #030949;
`;

export const SelectAndButtonContainer = styled.div`
	display: flex;
	align-items: center;
`;

export const SelectText = styled.p`
	font-family: Baloo 2;
	font-size: 12px;
	font-style: normal;
	font-weight: 600;
	line-height: 19px;
	letter-spacing: 0em;
	text-align: left;
	color: #030949;
	margin-right: 20px;
`;

export const MySelect = styled(Select)`
	width: 110px;
	cursor: pointer;
`;

export const EditStats = styled(Link)`
	margin-left: 12px;
	height: 38px;
	width: 196px;
	background: #008d03;
	outline: none;
	border: none;
	color: white;
	font-family: Baloo 2;
	font-size: 13px;
	font-style: normal;
	font-weight: 500;
	line-height: 8px;
	letter-spacing: 0em;
	text-align: center;
	display: flex;
	align-items: center;
	justify-content: center;
	text-transform: uppercase;
`;

export const CardContainer = styled.div`
	padding: 30px;
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 30px;
`;

export const Card = styled.div`
	height: 530px;
	width: 360px;
	border-radius: 6px;
	background: #ffffff;
	padding: 0 30px;
`;

export const Top = styled.div`
	display: flex;
	justify-content: space-between;
	padding: 10px 0;
	border-bottom: 0.5px solid #d8d8d8;
`;

export const TopHeaderText = styled.p`
	font-family: Baloo 2;
	font-size: 15px;
	font-style: normal;
	font-weight: 600;
	line-height: 20px;
	text-align: left;
	color: #030949;
`;

export const Box = styled.div`
	padding: 5px 0;
`;

export const BoxHeader = styled.p`
	font-family: Baloo 2;
	font-size: 15px;
	font-style: normal;
	font-weight: 500;
	line-height: 20px;
	letter-spacing: 0.10000000149011612px;
	text-align: left;
	color: #030949;
	margin-bottom: 9px;
`;

export const BoxBody = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 5px;
`;

export const BodyText = styled.p`
	font-family: Baloo 2;
	font-size: 13px;
	font-style: normal;
	font-weight: 400;
	line-height: 20px;
	text-align: left;
	color: #030949;
`;

export const BodyBox = styled.div`
	height: 20px;
	width: 67px;
	background: #f2f2f2;
	border-radius: 2px;
	display: flex;
	align-items: center;
	justify-content: center;
`;

export const BodyBoxText = styled.p`
	font-family: Baloo 2;
	font-size: 13px;
	font-style: normal;
	font-weight: 400;
	line-height: 20px;
	text-align: center;
	color: #030949;
`;

export const ButtonOutline = styled.button`
	height: 38px;
	width: 145px;
	border-radius: 2px;
	outline: none;
	border: 1px solid #2b52ba;
	background: white;
	color: #2b52ba;
	margin-left: 9px;
`;
