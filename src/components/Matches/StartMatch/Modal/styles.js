import styled from 'styled-components';
import Spinner from 'react-spinkit';

export const Container = styled.div`
	height: 100vh;
	width: 100vw;
	z-index: 1000;
	position: fixed;
	top: 0;
	left: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: rgba(0, 0, 0, 0.7);
`;

export const LargeSpinner = styled(Spinner)`
	& > div {
		width: 50px !important;
		height: 50px !important;
	}
`;
