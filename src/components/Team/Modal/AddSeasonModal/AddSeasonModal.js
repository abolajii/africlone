import React, { useState, useContext } from 'react';
import { GlobalContext } from '../../../../context/Global';
import { CreateModalContext } from '../../../../context/Modal';
import {
	Background,
	Body,
	Top,
	ModalText,
	CloseIcon,
	SelectContainer,
	Label,
	MySelectContainer,
	MySelect,
	ButtonContainer,
	SaveButton,
	MyInput,
	ModalForm,
} from './styles';

import axios from '../../../../helpers/axios';
import { ToastContainer, toast } from 'react-toastify';

const AddSeasonModal = () => {
	const { showTeamSeasonModal, setShowTeamSeasonModal } =
		useContext(CreateModalContext);
	const { singleTeam } = useContext(GlobalContext);
	const [season, setSeason] = useState(null);
	const [error, setError] = useState(false);
	const [clicked, setClicked] = useState(false);

	const disabled = season === null || season === '    /    ';
	const styles = {
		control: (base) => ({
			...base,
			// This line disable the blue border
			boxShadow: 'none',
		}),
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		const data = { team_id: singleTeam._id, season_name: season };

		axios
			.post('/team/season', data)
			.then((response) => {
				setShowTeamSeasonModal(false);
				setSeason('');
			})
			.catch((err) => {
				setError(true);
				toast.error('Something went wrong, please try again');
			});
	};

	return (
		<Background
			show={showTeamSeasonModal}
			backdrop='static'
			keyboard={false}
			contentClassName='m'
			centered
			aria-labelledby=''>
			{error && <ToastContainer />}
			<Body>
				<Top>
					<ModalText>Add Season</ModalText>
					<CloseIcon
						onClick={() => {
							setSeason(null);
							setShowTeamSeasonModal(false);
						}}
					/>
				</Top>
				<ModalForm onSubmit={handleSubmit}>
					<SelectContainer>
						<Label>Select Season</Label>
						<MySelectContainer>
							<MyInput
								value={season}
								onChange={({ target }) => setSeason(target.value)}
								placeholder='Enter Season'
								mask='9999/9999'
								maskChar=' '
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

export default AddSeasonModal;
