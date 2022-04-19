import { Link } from 'react-router-dom';
import Select from 'react-select';
import styled from 'styled-components';
import PhoneInput from 'react-phone-number-input';

export const Text = styled.p`
	font-family: Baloo 2;
	font-size: 14px;
	font-style: normal;
	font-weight: 500;
	line-height: 14px;
	letter-spacing: 0.02em;
	text-align: left;
	margin-bottom: 10px;
`;

export const Container = styled.div`
	background: #e5e5e5;
	margin-left: 20px;
	margin-top: 30px;

	min-height: 700px;
`;

export const Inner = styled.form`
	max-width: 1000px;
	margin: auto;
	padding: 20px;
`;

export const ImageAndFileContainer = styled.div`
	display: flex;
	align-items: center;
`;

export const Nofile = styled.p`
	font-family: Baloo 2;
	font-size: 13px;
	font-style: normal;
	font-weight: 400;
	line-height: 20px;
	letter-spacing: -0.02em;
	text-align: left;
	color: #7f8e9d;
	margin-left: 10px;
`;

export const ImageContainer = styled.div`
	height: 85px;
	width: 85px;
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

export const ImageLabel = styled.label`
	font-family: Baloo 2;
	font-size: 12px;
	font-style: normal;
	font-weight: 600;
	line-height: 19px;
	letter-spacing: 0em;
	text-align: left;
	color: #fe4302;
`;

export const ImageInput = styled.input`
	/* display: none; */
	position: absolute;
	top: 0;
	left: 0;
	height: 100%;
	width: 100%;
	opacity: 0;
`;

export const ImageInputContainer = styled.div`
	/* background: red; */
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

export const BoxOne = styled.div`
	width: 50%;
	width: calc(50% - 6px);
	margin-right: 6px;
`;
export const FormContainer = styled.div`
	width: 100%;
	display: flex;
	margin-top: 30px;
`;

export const BoxTwo = styled.div`
	width: calc(50% - 6px);
	margin-left: 6px;
`;

export const TeamLabel = styled.label`
	font-family: Baloo 2;
	font-size: 14px;
	font-style: normal;
	font-weight: 500;
	line-height: 14px;
	letter-spacing: 0.02em;
	text-align: left;
`;

export const FormControl = styled.div`
	display: flex;
	flex-direction: column;
	margin-bottom: 20px;
`;

export const Input = styled.input`
	outline: none;
	border: 1px solid #7f8e97;
	padding: 15px 15px;
	background: transparent;
	border-radius: 4px;
`;

export const NumberInput = styled(PhoneInput)`
	outline: none;
	border: 1px solid #7f8e97;
	padding: 0 15px;
	background: transparent;
	border-radius: 4px;
`;

export const ButtonContainer = styled.div`
	margin: 40px;
	margin-left: 0;
	display: flex;
	align-items: center;
`;

export const CreateButton = styled.button`
	height: 38px;
	width: 196px;
	outline: none;
	border: none;
	color: white;
	border-radius: 2px;
	background: #2b52ba;
	&:disabled {
		background: #b7b7b7;
		cursor: default;
	}
`;

export const MySelect = styled(Select)`
	border: 1px solid #7f8e97;
	border-radius: 4px;
	background: transparent;
	padding: 6.6px;
`;

export const ViewStats = styled(Link)`
	margin-left: 50px;
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
