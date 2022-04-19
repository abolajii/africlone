import styled from 'styled-components';

export const Container = styled.div`
	padding: 5px 0;
`;

export const Inner = styled.div`
	display: flex;
	align-items: center;
`;

export const Name = styled.div`
	margin-left: 9px;
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
	margin-right: 8px;
	color: #ffffff;
`;

export const ImgContainer = styled.div`
	height: 20px;
	width: 20px;
	overflow: hidden;
	border-radius: 50%;
`;

export const Img = styled.img`
	width: 100%;
	height: 100%;
	object-fit: cover;
`;

export const HomeCheckOut = styled.input`
	margin-right: 8px;
`;
