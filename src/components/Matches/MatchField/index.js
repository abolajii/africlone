import React, { useState, useEffect } from 'react';
import './style.scss';
import SmallPitch from '../../SmallPitch';

const MatchField = ({
	timeEllapsed,
	homeSubs,
	awaySubs,
	homeLineUp,
	awayLineUp,
}) => {
	const mainMenuList = ['Event', 'Swap Position', 'Substitution'];

	const getDummyPlayersData = () => {
		let samplePlayerNumber = 0;
		const samplePlayerObjectList = [];
		const samplePlayerObject = {
			bench: 0,
			id: 519,
			matchId: '6183fc2307b07e0018d83b0b',
			minutes: 0,
			playerDob: '2021-08-27',
			playerId: '6129032757d8ec0018991806',
			playerName: '0',
			playerNumber: 1,
			playerPosition: 'a',
			start: 0,
			team: 'B',
		};

		while (samplePlayerNumber < 11) {
			const modifiedSample = {
				...samplePlayerObject,
				_id: samplePlayerNumber,
				playerName: `Player${samplePlayerNumber}`,
				playerNumber: samplePlayerNumber,
				id: `${samplePlayerObject.id}${samplePlayerNumber}`,
				playerId: `${samplePlayerObject.playerId}${samplePlayerNumber}`,
			};
			samplePlayerObjectList.push(modifiedSample);

			samplePlayerNumber++;
		}

		return samplePlayerObjectList;
	};

	return (
		<div
			className='flex hidden-overflow col-7'
			style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
			}}>
			<SmallPitch
				timeEllapsed={timeEllapsed}
				homeLineUp={homeLineUp}
				awayLineUp={awayLineUp}
			/>
		</div>
	);
};

export default MatchField;
