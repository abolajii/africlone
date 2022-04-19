import { Modal } from 'react-bootstrap';
import styled from 'styled-components';

export const Background = styled(Modal)`
	background: rgba(0, 0, 0, 0.3);
	.modal-content {
		height: 234px;
		width: 392px;
		margin: auto;
		border-radius: 10px;
	}
`;

export const Top = styled.div`
	display: flex;
	margin: 10px auto;
`;

export const ModalText = styled.p`
	font-family: Baloo 2;
	font-size: 20px;
	font-style: normal;
	font-weight: 600;
	line-height: 8px;
	letter-spacing: 0em;
	display: flex;
	flex: 3;
	align-items: center;
	justify-content: center;
	text-align: center;

	${({ logout }) => logout && 'color: #2b52ba;'}
`;

export const Body = styled(Background.Body)`
	/* height: 100px !important; */
	/* background: red; */
`;

export const BodyText = styled.p`
	font-family: Baloo 2;
	font-size: 15px;
	font-style: normal;
	font-weight: 400;
	line-height: 50px;
	letter-spacing: 0em;
	text-align: center;
`;

export const DeleteText = styled.p`
	font-family: Baloo 2;
	font-size: 15px;
	font-style: normal;
	font-weight: 600;
	line-height: 40px;
	letter-spacing: 0em;
	text-align: center;
	color: #2b52ba;
`;

export const ButtonContainer = styled.div`
	max-width: 300px;
	margin: auto;
	margin-top: 30px;
	display: flex;
	align-items: center;
	justify-content: space-around;
`;

export const DeclineButton = styled.button`
	height: 28px;
	width: 102px;
	background: #d8d8d8;
	color: white;
	outline: none;
	border: none;
	text-transform: uppercase;

	&.not-allowed {
		cursor: not-allowed;
	}
`;

export const DeleteButton = styled(DeclineButton)`
	background: #ff6d55;
	color: white;

	&.not-allowed {
		cursor: not-allowed;
	}
`;
