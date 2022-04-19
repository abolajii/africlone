import React from 'react';

import {
	Label,
	Box,
	Container,
	Grid,
	Inner,
	InputBox,
	LabelAndInputContainer,
	Input,
	ButtonContainer,
	ButtonInner,
	Button,
	ScheduleMatchButton,
	InputContainer,
	ProceedButton,
} from './styles';

const AddMatch = ({ children, ...restProps }) => {
	return <Container {...restProps}>{children}</Container>;
};

AddMatch.Inner = function AddMatchInner({ children, ...restProps }) {
	return <Inner {...restProps}>{children}</Inner>;
};

AddMatch.Box = function AddMatchBox({ children, ...restProps }) {
	return <Box {...restProps}>{children}</Box>;
};

AddMatch.Grid = function AddMatchGrid({ children, ...restProps }) {
	return <Grid {...restProps}>{children}</Grid>;
};

AddMatch.InputBox = function AddMatchInputBox({ children, ...restProps }) {
	return <InputBox {...restProps}>{children}</InputBox>;
};

AddMatch.LabelAndInputContainer = function AddMatchLabelAndInputContainer({
	children,
	...restProps
}) {
	return (
		<LabelAndInputContainer {...restProps}>{children}</LabelAndInputContainer>
	);
};

AddMatch.Label = function AddMatchLabel({ children, ...restProps }) {
	return <Label {...restProps}>{children}</Label>;
};

AddMatch.InputContainer = function AddMatchInputContainer({
	children,
	...restProps
}) {
	return <InputContainer {...restProps}>{children}</InputContainer>;
};

AddMatch.Input = function AddMatchInput({ children, ...restProps }) {
	return <Input {...restProps}>{children}</Input>;
};

AddMatch.ButtonContainer = function AddMatchButtonContainer({
	children,
	...restProps
}) {
	return <ButtonContainer {...restProps}>{children}</ButtonContainer>;
};

AddMatch.ButtonInner = function AddMatchButtonInner({
	children,
	...restProps
}) {
	return <ButtonInner {...restProps}>{children}</ButtonInner>;
};

AddMatch.Button = function AddMatchButton({ children, ...restProps }) {
	return <Button {...restProps}>{children}</Button>;
};

AddMatch.ScheduleMatchButton = function AddMatchScheduleMatchButton({
	children,
	...restProps
}) {
	return <ScheduleMatchButton {...restProps}>{children}</ScheduleMatchButton>;
};

export default AddMatch;

AddMatch.ProceedButton = function AddMatchProceedButton({
	children,
	...restProps
}) {
	return <ProceedButton {...restProps}>{children}</ProceedButton>;
};
