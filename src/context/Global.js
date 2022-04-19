import React, { createContext, useState } from 'react';

export const GlobalContext = createContext();

const GlobalContextProvider = ({ children }) => {
	const [id, setId] = useState(1);

	const [singleCompetition, setSingleCompetition] = useState({});
	const [seasonOptions, setSeasonOptions] = useState([]); //seasonOption

	const [tableCompetition, setTableCompetition] = useState([]); //teams in a competition

	const [playerSeasonValue, setPlayerSeasonValue] = useState(null);

	const [singleTeam, setSingleTeam] = useState([]);
	const [singlePlayer, setSinglePlayer] = useState([]);
	const [playerQueryId, setPlayerQueryId] = useState(null);
	const [playersInASeason, setPlayersInASeason] = useState([]);
	const [seasonPlayerId, setSeasonPlayerId] = useState(null);

	//paginations

	const [number, setNumber] = useState(1);

	const [selectTeamsInCompetitionSeason, setSelectTeamsInCompetitionSeason] =
		useState(null);

	return (
		<GlobalContext.Provider
			value={{
				id,
				setId,
				number,
				setNumber,
				playerQueryId,
				singlePlayer,
				setSinglePlayer,
				setPlayerQueryId,
				seasonOptions,
				setSeasonOptions,
				playersInASeason,
				setPlayersInASeason,
				seasonPlayerId,
				setSeasonPlayerId,
				playerSeasonValue,
				setPlayerSeasonValue,
				tableCompetition,
				setTableCompetition,
				selectTeamsInCompetitionSeason,
				setSelectTeamsInCompetitionSeason,
				singleTeam,
				setSingleTeam,
				singleCompetition,
				setSingleCompetition,
			}}>
			{children}
		</GlobalContext.Provider>
	);
};

export default GlobalContextProvider;
