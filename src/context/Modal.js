import React, { createContext, useState } from 'react';

export const CreateModalContext = createContext();

const CreateModalProvider = ({ children }) => {
	const [showCompetitionSeasonModal, setShowCompetitionSeasonModal] =
		useState(false); //competition season modal
	const [showCompetitionTeamModal, setShowCompetitionTeamModal] =
		useState(false); //competition team modal
	const [showTeamSeasonModal, setShowTeamSeasonModal] = useState(false); // team season modal
	const [showTeamModal, setShowTeamModal] = useState(false); // team modal

	const [deleteModalName, setDeleteModalName] = useState(''); // delete modal name
	const [deleteType, setDeleteType] = useState('');
	const [deleteTeamName, setDeleteTeamName] = useState('');

	const [playerModal, setPlayerModal] = useState(false); // playermodal

	const [deleteCompetitionTeamModal, setDeleteCompetitionTeamModal] =
		useState(false);

	const [deleteCompTeam, setDeleteCompTeam] = useState('');
	const [deleteCompType, setDeleteCompType] = useState('');

	const [spin, setSpinner] = useState(false); // set spin
	const [startMatchSpin, setStartMatchSpin] = useState(false); // set match spin

	return (
		<CreateModalContext.Provider
			value={{
				spin,
				setSpinner,
				deleteCompType,
				setDeleteCompType,
				deleteCompTeam,
				setDeleteCompTeam,
				deleteCompetitionTeamModal,
				setDeleteCompetitionTeamModal,
				deleteTeamName,
				setDeleteTeamName,
				setDeleteModalName,
				showCompetitionSeasonModal,
				setShowCompetitionSeasonModal,
				showCompetitionTeamModal,
				setShowCompetitionTeamModal,
				showTeamSeasonModal,
				setShowTeamSeasonModal,
				showTeamModal,
				setShowTeamModal,
				deleteModalName,
				setDeleteModalName,
				deleteType,
				setDeleteType,
				playerModal,
				setPlayerModal,
				startMatchSpin,
				setStartMatchSpin,
			}}>
			{children}
		</CreateModalContext.Provider>
	);
};

export default CreateModalProvider;
