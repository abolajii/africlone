import { Link } from 'react-router-dom';
import styled from 'styled-components/macro';

export const Container = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 60px;
	z-index: 1000;
	background: #2b52ba;
`;

export const Inner = styled.div`
	max-width: 1200px;
	margin: auto;
	display: flex;
	align-items: center;
	height: inherit;
`;

export const LinkContainer = styled.div`
	flex: 0.5;
	display: flex;
	height: inherit;
	align-items: center;
	justify-content: end;
`;

export const Logo = styled(Link)`
	font-family: 'Baloo 2';
	font-size: 18px;
	font-style: normal;
	font-weight: 500;
	line-height: 28px;
	color: #ffffff;
	text-decoration: none;
	flex: 0.1;
	&:hover {
		color: #ffffff;
	}
`;

export const ReactLink = styled(Link)`
	text-decoration: none;
	color: #ffffff;
	font-family: 'Baloo 2';
	font-style: normal;
	font-weight: 500;
	font-size: 14px;
	line-height: 14px;
	height: inherit;
	margin: 0 10px;
	display: flex;
	align-items: center;
	justify-content: center;
	letter-spacing: 0.02em;
	position: relative;

	&:hover {
		color: white;
	}
`;

export const Logout = styled.button`
	text-decoration: none;
	color: #ffffff;
	font-family: 'Baloo 2';
	font-style: normal;
	font-weight: 500;
	font-size: 14px;
	line-height: 14px;
	letter-spacing: 0.02em;
	border: none;
	outline: none;
	background-color: transparent;
	cursor: pointer;
`;

export const LogoutContainer = styled.div`
	flex: 0.4;
	display: flex;
	align-items: center;
	height: inherit;
	justify-content: end;
`;

export const Underline = styled.div`
	position: absolute;
	bottom: 0;
	width: 100%;
	height: 3px;
	background-color: #fe4302;
`;
