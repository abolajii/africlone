import styled from 'styled-components';

export const Container = styled.div`
	padding: 5px 0;
`;

export const Inner = styled.div`
	display: flex;
	align-items: center;
	justify-content: end;
`;

export const Name = styled.div`
	margin-right: 9px;
	text-align: left;
`;

export const Label = styled.div`
	height: 13px;
	width: 17px;
	background: #7f8e9d;

	font-family: Baloo 2;
	font-size: 8px;
	font-style: normal;
	font-weight: 500;
	line-height: 8px;
	display: flex;
	align-items: center;
	justify-content: center;
	/* letter-spacing: 0em; */
	text-align: center;
	margin-left: 8px;
	color: #ffffff;
`;

export const ImgContainer = styled.div`
	height: 20px;
	width: 20px;
	border-radius: 50%;

	overflow: hidden;
`;

export const Img = styled.img`
	height: 100%;
	width: 100%;
`;

export const AwayCheckOut = styled.input`
	margin-left: 8px;
`;
