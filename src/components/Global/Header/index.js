import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import * as ROUTES from '../../../constants/routes';
import { linkdatas } from './data';

import {
	Container,
	Inner,
	LinkContainer,
	Logo,
	ReactLink,
	Logout,
	Underline,
	LogoutContainer,
} from './styles';
import { GlobalContext } from '../../../context/Global';
import { DeleteContext } from '../../../context/Delete';

export default function Header() {
	const { id, setId } = useContext(GlobalContext);
	const { setLogOut } = useContext(DeleteContext);

	const location = useLocation();

	return (
		<Container>
			<Inner>
				<Logo to={ROUTES.HOME}>Afriskaut</Logo>

				{location.pathname === '/login' ? null : (
					<>
						<LinkContainer>
							{linkdatas.map((link) => {
								return (
									<ReactLink
										onClick={() => setId(link.id)}
										key={link.id}
										exact
										to={link.link}>
										{link.title}
										{id === link.id ? (
											<Underline />
										) : (
											link.link === location.pathname && setId(link.id)
										)}
									</ReactLink>
								);
							})}
						</LinkContainer>

						<LogoutContainer>
							<Logout onClick={() => setLogOut(true)}>Logout</Logout>
						</LogoutContainer>
					</>
				)}
			</Inner>
		</Container>
	);
}
