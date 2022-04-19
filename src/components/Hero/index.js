import React from 'react';

import { Container, Inner, Text, TextContainer } from './styles';

const Hero = ({ children, ...restProps }) => {
	return <Container {...restProps}>{children}</Container>;
};

Hero.Inner = function HeroInner({ children, ...restProps }) {
	return <Inner {...restProps}>{children}</Inner>;
};

Hero.TextContainer = function HeroTextContainer({ children, ...restProps }) {
	return <TextContainer {...restProps}>{children}</TextContainer>;
};

Hero.Text = function HeroText({ children, ...restProps }) {
	return <Text {...restProps}>{children}</Text>;
};

export default Hero;
