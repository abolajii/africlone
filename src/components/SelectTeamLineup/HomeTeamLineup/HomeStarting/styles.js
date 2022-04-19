import styled from 'styled-components';

export const Container = styled.div`
	margin-bottom: 10px;
	width: 100%;
`;

export const Inner = styled.div`
	display: flex;
	align-items: center;
	padding: 4px 0;
	min-width: 85%;
	/* flex: 2; */
`;

export const Label = styled.div`
	/* padding: 1px 6px; */
	background: #fe4302;
	color: #fff;
	height: 13px;
	width: 17px;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-right: 8px;
`;

export const Name = styled.div`
	font-family: Baloo 2;
	font-style: normal;
	font-weight: 500;
	font-size: 13px;
	width: 100%;
`;

export const ImageContainer = styled.div`
	min-width: 15%;
	display: flex;
	align-items: center;
	justify-content: center;
`;

export const Image = styled.img`
	/* margin-left: 10px; */
	height: 10px;
`;
