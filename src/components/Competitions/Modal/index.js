import React, { useContext } from 'react';
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

import { CreateModalContext } from '../../../context/Modal';
import { DeleteContext } from '../../../context/Delete';

import { GlobalContext } from '../../../context/Global';

import axios from '../../../helpers/axios';
import { useState } from 'react';

const DeleteCompetitionTeam = ({ name, type }) => {
	const { deleteCompetitionTeamModal, setDeleteCompetitionTeamModal } =
		useContext(CreateModalContext);

	const { teamCompId, playerId } = useContext(DeleteContext);

	const [clicked, setClicked] = useState(false);
	const {
		selectTeamsInCompetitionSeason,
		singleCompetition,
		singleTeam,
		seasonPlayerId,
		setTableCompetition,
		setPlayersInASeason,
	} = useContext(GlobalContext);

	const handleTeamDelete = () => {
		const data = {
			team_id: teamCompId,
			season_id: selectTeamsInCompetitionSeason?.id,
			competition_id: singleCompetition?._id,
		};

		axios
			.put('/competition/season/team/remove', data)
			.then((response) => {
				axios
					.get(
						`/competition/season/season/${selectTeamsInCompetitionSeason?.id}`
					)
					.then((response) => {
						setClicked(false);
						setTableCompetition(response.data.data?.teams);
					})
					.catch((err) => console.log(err));
				setDeleteCompetitionTeamModal(false);
			})
			.catch((err) => console.log(err));
	};

	const handlePlayerDelete = () => {
		// console.log(playerId);

		const data = {
			player_id: playerId,
			season_id: seasonPlayerId,
			team_id: singleTeam?._id,
		};

		axios
			.put('/team/season/squad/remove', data)
			.then((response) => {
				// navigate('/view-team');
				axios
					.get(`/team/season/season/${seasonPlayerId}`)
					.then((result) => {
						setClicked(false);
						setPlayersInASeason(result.data.data[0].squad);
						setDeleteCompetitionTeamModal(false);
					})
					.catch((err) => {
						console.log(err);
					});
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const handleDelete = (type) => {
		if (type === 'team') {
			handleTeamDelete();
		} else if (type === 'player') {
			handlePlayerDelete();
		} else {
			return null;
		}
	};

	return (
		<Background
			show={deleteCompetitionTeamModal}
			backdrop='static'
			keyboard={false}
			contentClassName='m'
			centered
			aria-labelledby=''>
			<Body>
				<Top>
					<ModalText>Confirm Delete</ModalText>
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
						onClick={() => setDeleteCompetitionTeamModal(false)}>
						no
					</DeclineButton>
				</ButtonContainer>
			</Body>
		</Background>
	);
};

export default DeleteCompetitionTeam;
