import React from 'react';

import {
	Inner,
	Name,
	ImgContainer,
	Label,
	AwayCheckOut,
	Container,
	Img,
} from './styles';

const AwayTeamLineup = ({ each, setAwayPlayers, awayPlayers }) => {
	const { id, label, image, checked, first_name, last_name } = each;

	const handleChange = (id) => {
		const awayCopy = [...awayPlayers];
		const setChecked = awayCopy.map((each) => {
			if (id === each._id) {
				each.checked = !each.checked;
			}
			return each;
		});
		setAwayPlayers(setChecked);
	};

	return (
		<Container>
			<Inner>
				<Name>
					{first_name} {last_name}
				</Name>
				<ImgContainer>
					<Img src={image} alt={first_name} />
				</ImgContainer>
				<Label>{each.role[0].split(' ')[0].slice(0, 1)} </Label>
				<AwayCheckOut
					onChange={() => handleChange(each._id)}
					checked={checked}
					type='checkbox'
				/>
			</Inner>
		</Container>
	);
};

export default AwayTeamLineup;
