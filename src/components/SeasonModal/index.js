import React, { useState, useContext } from 'react';
import { GlobalContext } from '../../context/Global';
import { CreateModalContext } from '../../context/Modal';

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

import axios from '../../helpers/axios';
import { ToastContainer, toast } from 'react-toastify';

const SeasonModal = () => {
	const { setShowCompetitionSeasonModal, showCompetitionSeasonModal } =
		useContext(CreateModalContext);

	const [clicked, setClicked] = useState(false);

	const { singleCompetition } = useContext(GlobalContext);

	const [season, setSeason] = useState(null);

	const disabled = season === '    /    ' || season === null;

	const handleSubmit = (e) => {
		e.preventDefault();
		const data = { season_name: season, competition_id: singleCompetition._id };

		axios
			.post('/competition/season', data)
			.then((response) => {
				setClicked(false);
				setSeason(null);
				setShowCompetitionSeasonModal(false);
			})
			.catch((err) => {
				setClicked(false);
				toast.error('Something went wrong, try again later');
			});
	};

	return (
		<Background
			show={showCompetitionSeasonModal}
			backdrop='static'
			keyboard={false}
			contentClassName='m'
			centered
			aria-labelledby=''>
			<ToastContainer />
			<Body>
				<Top>
					<ModalText>Add Season</ModalText>
					<CloseIcon onClick={() => setShowCompetitionSeasonModal(false)} />
				</Top>
				<ModalForm onSubmit={handleSubmit}>
					<SelectContainer>
						<Label>Add Season</Label>
						<MySelectContainer>
							<MyInput
								onChange={({ target }) => {
									setSeason(target.value);
								}}
								placeholder='Enter Season'
								mask='9999/9999'
								maskChar=' '
								value={season ? season : ''}
							/>
						</MySelectContainer>
					</SelectContainer>
					<ButtonContainer>
						<SaveButton
							disabled={disabled}
							className={clicked && 'not-allowed'}
							onClick={() => {
								setClicked(true);
							}}>
							ADD SEASON
						</SaveButton>
					</ButtonContainer>
				</ModalForm>
			</Body>
		</Background>
	);
};

export default SeasonModal;
