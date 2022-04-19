import React, { useState, useContext } from 'react';
import { GlobalContext } from '../../../context/Global';
import { CreateModalContext } from '../../../context/Modal';

import {
	Background,
	Body,
	Top,
	ModalText,
	CloseIcon,
	SelectContainer,
	Label,
	MySelectContainer,
	ButtonContainer,
	SaveButton,
	MyInput,
	ModalForm,
} from './styles';

import axios from '../../../helpers/axios';

const AddPlayerSeason = () => {
	const { setPlayerModal, playerModal } = useContext(CreateModalContext);

	const { singleCompetition } = useContext(GlobalContext);

	const [season, setSeason] = useState(null);

	const handleSubmit = (e) => {
		e.preventDefault();
		const data = { season_name: season, competition_id: singleCompetition._id };

		axios
			.post('/competition/season', data)
			.then((response) => {
				setSeason(null);
				setPlayerModal(false);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<Background
			show={playerModal}
			backdrop='static'
			keyboard={false}
			contentClassName='m'
			centered
			aria-labelledby=''>
			<Body>
				<Top>
					<ModalText>Add Season</ModalText>
					<CloseIcon onClick={() => setPlayerModal(false)} />
				</Top>
				<ModalForm onSubmit={handleSubmit}>
					<SelectContainer>
						<Label>Add Season</Label>
						<MySelectContainer>
							<MyInput
								onChange={({ target }) => setSeason(target.value)}
								placeholder='Enter Season'
								mask='9999/9999'
								maskChar=' '
								value={season ? season : ''}
								onChange={({ target }) => setSeason(target.value)}
							/>
						</MySelectContainer>
					</SelectContainer>
					<ButtonContainer>
						<SaveButton>ADD SEASON</SaveButton>
					</ButtonContainer>
				</ModalForm>
			</Body>
		</Background>
	);
};

export default AddPlayerSeason;
