import React, { createContext, useState } from 'react';
import axios from '../helpers/axios';

import { CreateModalContext } from './Modal';
export const DeleteContext = createContext();

const DeleteContextProvider = ({ children }) => {
	// const { setDeleteModal } = useContext(CreateModalContext);

	const [deleteModal, setDeleteModal] = useState(false); // delete modal
	const [competition, setCompetition] = useState([]); // competition
	const [teams, setTeams] = useState([]); // teams
	const [players, setPlayers] = useState([]); //players
	const [id, setId] = useState(0); // id
	const [logOut, setLogOut] = useState(false);
	const [playerId, setPlayerId] = useState(0);

	const [clicked, setClicked] = useState(false);

	const [teamCompId, setTeamCompId] = useState(0);

	const deleteCompetition = (id, num) => {
		axios
			.delete(`/competition/${id}`)
			.then((res) => {
				axios
					.get(`/competition/?page=${num}&perPage=10`)
					.then((response) => {
						setClicked(false);
						setDeleteModal(false);
						setCompetition(response.data.data);
					})
					.catch((error) => console.log(error));
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const deleteTeam = (id, num) => {
		axios
			.delete(`team/team/${id}`)
			.then((res) => {
				axios
					.get(`/team/?page=${num}&perPage=10`)
					.then((response) => {
						setClicked(false);
						setDeleteModal(false);
						setTeams(response.data.data);
					})
					.catch((error) => console.log(error));
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const deletePlayer = (id, num) => {
		axios
			.delete(`player/player/${id}`)
			.then((res) => {
				axios
					.get(`/player/?page=${num}&perPage=10`)
					.then((response) => {
						setClicked(false);
						setDeleteModal(false);
						setPlayers(response.data.data);
					})
					.catch((error) => console.log(error));
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<DeleteContext.Provider
			value={{
				competition,
				logOut,
				setLogOut,
				setCompetition,
				teams,
				setTeams,
				teamCompId,
				setTeamCompId,
				players,
				setPlayers,
				playerId,
				setPlayerId,
				id,
				deleteTeam,
				deletePlayer,
				deleteModal,
				setDeleteModal,
				setId,
				deleteCompetition,
				clicked,
				setClicked,
			}}>
			{children}
		</DeleteContext.Provider>
	);
};

export default DeleteContextProvider;
