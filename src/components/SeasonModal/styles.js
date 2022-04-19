import { Modal } from 'react-bootstrap';
import styled from 'styled-components';
import InputMask from 'react-input-mask';

import { MdClose } from 'react-icons/md';

export const Background = styled(Modal)`
	background: rgba(3, 9, 73, 0.4);

	.modal-content {
		height: 250px;
	}
`;

export const ModalForm = styled.form``;

export const Top = styled.div`
	display: flex;
	margin-bottom: 30px;
`;

export const SelectContainer = styled.div`
	width: 100%;
	max-width: 400px;
	/* background: blue; */
	margin: 10px;
	margin: auto;
`;

export const Label = styled.label`
	margin-bottom: 5px;
	font-family: Baloo 2;
	font-size: 14px;
	font-style: normal;
	font-weight: 500;
	line-height: 14px;
	letter-spacing: 0.02em;
	text-align: left;
`;

export const MySelectContainer = styled.div`
	position: relative;
`;

export const MyInput = styled(InputMask)`
	height: 37px;
	width: 100%;
	padding: 0 10px;

	border-radius: 3px;
	border: 0.5px solid #cccccc;

	&:focus {
		outline: 0.5px solid #2b52ba;
	}
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
`;

export const CloseIcon = styled(MdClose)`
	height: 20px;
	width: 20px;
	display: flex;
	text-align: center;
	align-items: center;
	justify-content: center;
	cursor: pointer;
`;

export const Body = styled(Background.Body)`
	height: 100px !important;
	/* background: red; */
`;

export const ButtonContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;

	margin: 20px;
`;

export const SaveButton = styled.button`
	height: 38px;
	width: 145px;
	border-radius: 2px;
	outline: none;
	color: white;
	border: none;
	background: #2b52ba;

	&.not-allowed {
		cursor: not-allowed;
		opacity: 0.5;
	}
	&:disabled {
		background: #b7b7b7;
		cursor: default;
	}
`;
