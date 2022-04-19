import styled, { css } from 'styled-components';

import Select from 'react-select';
import InputMask from 'react-input-mask';

import TimeKeeper from 'react-timekeeper';

export const Container = styled.div`
	height: 700px;
	padding-left: 20px;
`;

export const Box = styled.form`
	height: 550px;
	background-color: #e5e5e5;
	margin-bottom: 80px;
`;

export const Inner = styled.div`
	margin: auto;
	height: inherit;
	display: flex;
	border-radius: 2px;
	gap: 20px;
	justify-items: end;
	width: 100%;
	box-shadow: 0px 4px 30px rgba(0, 0, 0, 0.1);
`;
export const Grid = styled.div`
	flex: 0.5;
	display: flex;
	flex-direction: column;
`;

export const MyTimeKeeper = styled(TimeKeeper)``;

export const InputBox = styled.div`
	display: flex;
	height: 100%;
	flex-direction: column;
	margin-top: 60px;
	/* justify-content: center; */
`;

export const LabelAndInputContainer = styled.div`
	display: flex;
	flex-direction: column;
	padding: 10px 0;
	width: 90%;
	${({ right }) =>
		right &&
		css`
			margin-right: auto;
		`}

	${({ left }) =>
		left &&
		css`
			margin-left: auto;
		`}
`;

export const Label = styled.label`
	font-family: Baloo 2;
	font-size: 14px;
	font-style: normal;
	font-weight: 500;
	line-height: 14px;
	letter-spacing: 0.02em;
	text-align: left;
	margin-bottom: 6px;
`;

export const InputContainer = styled.div`
	top: 0;
	left: 0;
	/* width: 457px; */
	height: 48px;
	position: relative;
	box-shadow: 0px 4px 30px rgba(0, 0, 0, 0.1);

	.css-nakgy8-TimeKeeper {
		position: absolute;
		top: 40px;
		left: 5px;
		background: red !important;
	}

	.css-upwegn-TopBar {
		padding: 14px 16px;
		/* padding:0; */
		border-radius: 3px 3px 0 0;
		position: relative;
		display: flex;
		align-items: center;
	}

	.css-1r6tdpo-Meridiems {
		text-align: left;
		padding: 0 10px;
		margin-top: 10px;
		position: relative;
	}
`;

export const MySelect = styled(Select)`
	position: absolute;
	top: 0;
	left: 0;
	height: 100%;
	width: 100%;
	outline: none;
	border: none;
	border: 0.7px solid #7f8e9d;
	background: transparent;
`;

export const Input = styled.input`
	position: absolute;
	height: 48px;
	padding: 10px;
	width: 100%;
	outline: none;
	border: 0.7px solid #7f8e9d;
	background: transparent;
`;

export const MyInput = styled(InputMask)`
	position: absolute;
	height: 48px;
	padding: 10px;
	width: 100%;
	outline: none;
	border: 0.7px solid #7f8e9d;
	background: transparent;
`;

export const ButtonContainer = styled.div`
	background-color: #e5e5e5;
	height: 130px;
	width: 100%;
	/* padding: 30px; */
`;

export const ButtonInner = styled.div`
	display: flex;
	max-width: 1200px;
	margin: auto;
	justify-content: space-evenly;
`;

export const Button = styled.button`
	height: 38px;
	width: 128px;
	cursor: pointer;
	color: white;
	outline: none;
	border: none;

	&:disabled {
		background-color: #b7b7b7;
	}
`;

export const ScheduleMatchButton = styled(Button)`
	background: #00a15d;
`;

export const ProceedButton = styled(Button)`
	width: 128px;
	cursor: pointer;
	color: white;
	outline: none;
	background: #2b52ba;
	text-decoration: none;
	height: 38px;
	border: none;
	display: flex;
	align-items: center;
	justify-content: center;

	&:disabled {
		background-color: #b7b7b7;
	}
`;
