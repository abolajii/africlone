/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import Table from './Table';
import '../../styles/competition.scss';
import { Hero, Button } from '../index';
import * as ROUTES from '../../constants/routes';

export default function Teams() {
	return (
		<Hero>
			{/* <Hero.Inner> */}
			<Button>
				<Button.Inner>
					<Button.TxtContainer padding='15px'>
						<Hero.Text>Competition</Hero.Text>
					</Button.TxtContainer>
					<Button.ButtonLink fs='13' fw='fw' to={ROUTES.CREATECOMPETITION}>
						CREATE COMPETITION
					</Button.ButtonLink>
				</Button.Inner>
			</Button>
			{/* </Hero.Inner> */}
			<Table />
		</Hero>
	);
}
