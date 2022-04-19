import { Modal } from 'react-bootstrap';
import styled from 'styled-components';
import Select from 'react-select';
import InputMask from 'react-input-mask';

import { MdClose } from 'react-icons/md';

export const Background = styled(Modal)`
	background: rgba(3, 9, 73, 0.4);
`;

export const Top = styled.div`
	display: flex;

	margin-bottom: 30px;
`;

export const Body = styled.div`
	padding-top: 30px;
	min-height: 400px;
	width: 350px;
	margin: auto;
`;

export const SelectContainer = styled.div`
	width: 100%;
	max-width: 400px;
	margin: auto;
	/* background: blue; */
	margin-bottom: 10px;
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

export const Input = styled.input`
	position: absolute;
	width: 100%;
	height: 37px;
	padding: 0 10px;
	border-radius: 3px;
	outline: none;
	border: 0.5px solid #cccccc;

	&:focus {
		outline: 0.5px solid #2b52ba;
	}
`;

export const MySelect = styled(Select)`
	position: absolute;
	outline: none;
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

export const ButtonContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;

	margin-bottom: 20px;
`;

export const SaveButton = styled.button`
	height: 38px;
	width: 145px;
	border-radius: 2px;
	outline: none;
	color: white;
	border: none;

	background: #2b52ba;
	&:disabled {
		background: #b7b7b7;
		cursor: default;
	}
	&.not-allowed {
		cursor: not-allowed;
		opacity: 0.5;
	}
`;

export const Dropdown = styled.div`
	max-height: 115px;
	background-color: #f2f2f2;
	margin-top: 45px;
	overflow: hidden;
	overflow-y: auto;
	margin-bottom: 8px;
`;

export const DropDownItem = styled.div`
	padding: 5px;
	cursor: pointer;
	&:hover {
		background-color: #e5e5e5;
	}
`;

export const ModalForm = styled.form``;

export const Item = styled.p``;
