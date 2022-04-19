import styled from 'styled-components';

export const Container = styled.div`
	margin: 30px;
`;

export const Inner = styled.div`
	height: 60px;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
`;

export const PrevButton = styled.button`
	padding: 5px 7px;
	outline: none;
	border: none;
	cursor: pointer;
	margin-right: 6px;
	border: 1px solid #333;

	&:disabled {
		opacity: 0.5;
		cursor: default;
	}
`;

export const PageNumberBox = styled.div`
	height: 40px;
	width: 40px;
	display: flex;
	align-items: center;
	justify-content: center;
`;

export const PageNumber = styled.p`
	font-size: 15px;
`;

export const NextButton = styled(PrevButton)`
	margin-left: 6px;
`;
