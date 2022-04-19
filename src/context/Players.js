import React from 'react';
import { createContext, useState } from 'react';
export const PlayersContext = createContext();

export const PlayersContextProvider = ({ children }) => {
	const [homePlayers, setHomePlayers] = useState([]);
	const [awayPlayers, setAwayPlayers] = useState([]);

	const [homeTeamLineup, setHomeTeamLineup] = useState([]);
	const [awayTeamLineup, setAwayTeamLineup] = useState([]);

	const [homeLineUpSquad, setHomeLineUpSquad] = useState([]);
	const [awayLineUpSquad, setAwayLineUpSquad] = useState([]);

	const [reversed, setReversed] = useState(false);

	const [homeTeamSubs, setHomeTeamSubs] = useState([]);
	const [awayTeamSubs, setAwayTeamSubs] = useState([]);

	const [homeSubsSquad, setHomeSubsSquad] = useState([]);
	const [awaySubsSquad, setAwaySubsSquad] = useState([]);

	const [homeScore, setHomeScore] = useState(0);
	const [awayScore, setAwayScore] = useState(0);

	const [selected, setSelected] = useState(null);
	const [videoFile, setVideoFile] = useState(null);

	const [homePlayersList, setHomePlayersList] = useState([]);
	const [awayPlayersList, setAwayPlayersList] = useState([]);

	const [playerSwapSquad, setPlayerSwapSquad] = useState([]);

	return (
		<PlayersContext.Provider
			value={{
				homePlayers,
				homeScore,
				setHomeScore,
				setAwayScore,
				awayScore,
				setHomePlayers,
				awayPlayers,
				setAwayPlayers,
				videoFile,
				setVideoFile,
				selected,
				homeTeamLineup,
				setHomeTeamLineup,
				awayTeamLineup,
				setAwayTeamLineup,
				homeTeamSubs,
				setHomeTeamSubs,
				awayTeamSubs,
				setAwayTeamSubs,
				setSelected,
				homeLineUpSquad,
				setHomeLineUpSquad,
				awayLineUpSquad,
				setAwayLineUpSquad,
				homeSubsSquad,
				setHomeSubsSquad,
				awaySubsSquad,
				setAwaySubsSquad,
				homePlayersList,
				setHomePlayersList,
				awayPlayersList,
				setAwayPlayersList,
				playerSwapSquad,
				setPlayerSwapSquad,
			}}>
			{children}
		</PlayersContext.Provider>
	);
};
