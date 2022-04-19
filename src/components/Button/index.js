import React from 'react';

import { ButtonLink, Container, Inner, TxtContainer, ViewAll } from './styles';

const Button = ({ children, ...restProps }) => {
	return <Container {...restProps}>{children}</Container>;
};

Button.Inner = function ButtonInner({ children, ...restProps }) {
	return <Inner {...restProps}>{children}</Inner>;
};

Button.TxtContainer = function ButtonTxtContainer({ children, ...restProps }) {
	return <TxtContainer {...restProps}>{children}</TxtContainer>;
};

Button.ButtonLink = function ButtonButtonLink({ children, ...restProps }) {
	return <ButtonLink {...restProps}>{children}</ButtonLink>;
};

Button.ViewAll = function ButtonViewAll({ children, ...restProps }) {
	return <ViewAll {...restProps}>{children}</ViewAll>;
};

export default Button;
