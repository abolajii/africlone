import React from 'react';

import * as ROUTES from '../constants/routes';

import { Button, Hero } from '../components';
import { FixturesContainer, RecentMatchesContainer } from '.';

const HeroContainer = () => {
	return (
		<Hero>
			<Hero.Inner>
				<Button>
					<Button.Inner>
						<Hero.Text>{''}</Hero.Text>
						<Button.ButtonLink to={ROUTES.ADD}>ADD MATCH</Button.ButtonLink>
					</Button.Inner>
				</Button>
				<Hero.TextContainer>
					<Hero.Text>Upcoming Fixtures</Hero.Text>
					<Button.ViewAll>View All</Button.ViewAll>
				</Hero.TextContainer>

				<FixturesContainer />
			</Hero.Inner>
			<RecentMatchesContainer />
		</Hero>
	);
};

export default HeroContainer;
