import React from 'react';
import { Container, Inner, Label, Name, Image, ImageContainer } from './styles';
import pic from '../../HomeTeamLineup/HomeStarting/img/Frame.svg';

const HomeSubstitute = ({ homeSubstitute }) => {
	return (
		<Container>
			{homeSubstitute &&
				homeSubstitute.map((each) => {
					const { first_name, last_name, label } = each;

					const newFirst = `${first_name.slice(0, 1)} .`;

					return (
						<div
							style={{
								display: 'flex',
							}}>
							<Inner key={each._id}>
								<Label>{label}</Label>
								<Name>
									{newFirst} {last_name}
								</Name>
							</Inner>
							<ImageContainer>
								{each.subs && <Image src={pic} />}
							</ImageContainer>
						</div>
					);
				})}
		</Container>
	);
};

export default HomeSubstitute;
