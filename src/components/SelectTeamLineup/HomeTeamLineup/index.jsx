import React from 'react';

import {
	Container,
	HomeCheckOut,
	Img,
	ImgContainer,
	Inner,
	Label,
	Name,
} from './styles';

const HomeTeamLineup = ({ each, setHomePlayers, homePlayers }) => {
	const { id, label, image, checked, first_name, last_name } = each;

	console.log(each.role[0]);
	const handleChange = (id) => {
		const homeCopy = [...homePlayers];
		const setChecked = homeCopy.map((each) => {
			if (id === each._id) {
				each.checked = !each.checked;
			}
			return each;
		});
		setHomePlayers(setChecked);
	};

	return (
		<Container>
			<Inner>
				<HomeCheckOut
					onChange={() => handleChange(each._id)}
					checked={checked}
					type='checkbox'
				/>
				<Label>
					{each.role[0].split(' ')[0].slice(0, 1)}{' '}
					{/* {each.role[0].split(' ')[1].slice(0, 1)} */}
				</Label>
				<ImgContainer>
					<Img src={image} alt={first_name} />
				</ImgContainer>
				<Name>
					{first_name} {last_name}
				</Name>
			</Inner>
		</Container>
	);
};

export default HomeTeamLineup;
