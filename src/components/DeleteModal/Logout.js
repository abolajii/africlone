import React, { useContext } from 'react';
import { DeleteContext } from '../../context/Delete';
import { useLocation, useHistory } from 'react-router-dom';
import DataBaseApi from '../../database/DataBaseApi';

import {
	Background,
	Body,
	BodyText,
	ButtonContainer,
	DeclineButton,
	DeleteButton,
	ModalText,
	Top,
} from './styles';

const Logout = () => {
	const history = useHistory();
	const DBApi = new DataBaseApi();

	const { logOut, setLogOut } = useContext(DeleteContext);

	const handleLogout = () => {
		localStorage.clear();
		DBApi.clearDb();
		history.push('/login');
		setLogOut(false);
	};

	return (
		<Background
			show={logOut}
			backdrop='static'
			keyboard={false}
			contentClassName='m'
			centered
			aria-labelledby=''>
			<Body>
				<Top>
					<ModalText logout={true}>Log Out</ModalText>
				</Top>

				<BodyText>Are you sure you want to logout</BodyText>
				<ButtonContainer>
					<DeleteButton onClick={handleLogout}>Yes</DeleteButton>
					<DeclineButton onClick={() => setLogOut(false)}>no</DeclineButton>
				</ButtonContainer>
			</Body>
		</Background>
	);
};

export default Logout;
