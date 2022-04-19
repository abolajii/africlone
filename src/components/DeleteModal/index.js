import React, { useContext } from 'react';
import { DeleteContext } from '../../context/Delete';
import { GlobalContext } from '../../context/Global';
import { CreateModalContext } from '../../context/Modal';
import {
	Background,
	Body,
	Top,
	ModalText,
	BodyText,
	DeleteText,
	ButtonContainer,
	DeleteButton,
	DeclineButton,
} from './styles';

const DeleteModal = ({ name, type }) => {
	const {
		deleteCompetition,
		deletePlayer,
		deleteTeam,
		id,
		setId,
		deleteModal,
		clicked,
		setClicked,
		setDeleteModal,
	} = useContext(DeleteContext);
	const { number } = useContext(GlobalContext);

	const handleDelete = (type) => {
		if (type === 'competition') {
			deleteCompetition(id);
			setId(null);
		} else if (type === 'team') {
			deleteTeam(id, number);
			setId(null);
		} else if (type === 'competitionTeam') {
			// setDeleteModal(false);
		} else {
			deletePlayer(id, number);
			setId(null);
		}
	};

	return (
		<Background
			show={deleteModal}
			backdrop='static'
			keyboard={false}
			contentClassName='m'
			centered
			aria-labelledby=''>
			<Body>
				<Top>
					<ModalText>Confirm Delete</ModalText>
					{/* <CloseIcon onClick={() => setDeleteModal(false)} /> */}
				</Top>
				<BodyText>Are you sure you want to delete this {type}</BodyText>
				<DeleteText>{name}</DeleteText>
				<ButtonContainer>
					<DeleteButton
						className={clicked && 'not-allowed'}
						onClick={() => {
							setClicked(true);
							handleDelete(type);
						}}>
						Delete
					</DeleteButton>
					<DeclineButton
						className={clicked && 'not-allowed'}
						onClick={() => setDeleteModal(false)}>
						no
					</DeclineButton>
				</ButtonContainer>
			</Body>
		</Background>
	);
};

export default DeleteModal;
