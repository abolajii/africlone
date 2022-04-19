import React, { useEffect, useState, useContext } from 'react';
import {
	CenterCircle,
	Inner,
	Left,
	Container,
	Right,
	PenaltyArea,
	GoalArea,
	HalfWayLineLeft,
	PlayerField,
	Players,
	RightPenaltyArea,
	RightCenterCircle,
	RightGoalArea,
	PlayerContainer,
	AwayPlayerContainer,
	AwayPlayers,
} from './styles';

import Modal from './Modal';
import { homePlayers, awayPlayers } from './Modal/dataevents';
import AwayModal from './AwayModal';

import { PlayersContext } from '../../context/Players';

const SmallPitch = ({ timeEllapsed, homeLineUp, awayLineUp }) => {
	const [indexL, setIndexL] = useState(null);
	const [isIndex, setIsIndex] = useState(false);
	const [indexTwo, setIndexTwo] = useState(null);
	const [isIndexTwo, setIsIndexTwo] = useState(false);
	const [player, setPlayer] = useState(null);
	const [playerTwo, setPlayerTwo] = useState(null);
	const [showModal, setShowModal] = useState(false);
	const [showAwayModal, setShowAwayModal] = useState(false);
	const [id, setId] = useState(null);
	const [awayId, setAwayId] = useState(null);

	const {
		homePlayersList,
		awayPlayersList,
		setHomePlayersList,
		setAwayPlayersList,
	} = useContext(PlayersContext);

	const [timeStart, setTimeStart] = useState('0:0');

	const [firstIndex, setFirstIndex] = useState(null);

	const handleClick = (home, index) => {
		setId(home._id);
		setPlayer(home);
		setShowModal(!showModal);
		setTimeStart(timeEllapsed);
		setIndexL(index);
		setFirstIndex(index);
		if (showAwayModal) {
			setShowAwayModal(false);
		}
	};

	const handleAwayClick = (away, index) => {
		setAwayId(away._id);
		setPlayerTwo(away);
		setShowAwayModal(!showAwayModal);
		setIndexTwo(index);
		setTimeStart(timeEllapsed);
		if (showModal) {
			setShowModal(false);
		}
	};

	useEffect(() => {
		if (!homeLineUp || !homePlayers) return;
		// if (!awayLineUp || !awayPlayers) return;
		const _homePlayersList = [];

		for (let i = 0; i < homeLineUp.length; i++) {
			const itemLeft = homeLineUp[i];
			const itemRight = homePlayers[i];

			const mergedPlayerObject = { ...itemLeft, ...itemRight, player: 'RED' };
			_homePlayersList.push(mergedPlayerObject);
		}

		setHomePlayersList(_homePlayersList);
		setIsIndex(false);
	}, [homeLineUp]);

	useEffect(() => {
		setHomePlayersList(homePlayersList);
		setIsIndex(false);
	}, [isIndex]);
	// console.log(indexL);

	useEffect(() => {
		if (!awayLineUp || !awayPlayers) return;

		const _awayPlayersList = [];

		for (let i = 0; i < awayLineUp.length; i++) {
			const itemLeft = awayLineUp[i];
			const itemRight = awayPlayers[i];

			const mergedPlayerObject = { ...itemLeft, ...itemRight, player: 'BLUE' };
			_awayPlayersList.push(mergedPlayerObject);
		}

		setAwayPlayersList(_awayPlayersList);
		setIsIndexTwo(false);
	}, [awayLineUp, isIndexTwo]);

	return (
		<Container>
			<Inner>
				<Left>
					<GoalArea />
					<PenaltyArea />
					<PlayerContainer z={showAwayModal ? 1 : 2}>
						{homePlayersList.map((home, index) => (
							<Players
								key={home._id}
								active={showModal && home._id === id}
								onClick={() => handleClick(home, index)}
								top={home.top}
								left={home.left}>
								<span>
									{home.first_name.slice(0, 1)}
									{home.last_name.slice(0, 1)}
								</span>

								{home._id === id && showModal && (
									<Modal
										firstIndex={firstIndex}
										player={player}
										setIsIndex={setIsIndex}
										indexL={indexL}
										timeStart={timeStart}
										timeEllapsed={timeEllapsed}
										playerObject={home}
										homePlayersList={homePlayersList}
										bottom={home.bottom}
									/>
								)}
							</Players>
						))}
					</PlayerContainer>
				</Left>

				<HalfWayLineLeft />

				<Right>
					<CenterCircle />
					<AwayPlayerContainer z={showModal ? 1 : 2}>
						{awayPlayersList.map((away, index) => (
							<AwayPlayers
								key={away._id}
								active={showAwayModal && away._id === awayId}
								onClick={() => handleAwayClick(away, index)}
								bottom={away.bottom}
								right={away.right}>
								<span>
									{away.first_name.slice(0, 1)}
									{away.last_name.slice(0, 1)}
								</span>

								{away._id === awayId && showAwayModal && (
									<AwayModal
										indexTwo={indexTwo}
										double={away.double}
										timeStart={timeStart}
										timeEllapsed={timeEllapsed}
										playerObject={away}
										top={away.top}
										playerTwo={playerTwo}
										awayPlayersList={awayPlayersList}
									/>
								)}
							</AwayPlayers>
						))}
					</AwayPlayerContainer>
					<RightPenaltyArea />
					<RightGoalArea />
				</Right>
			</Inner>
		</Container>
	);

	// return (
	// 	<Container>
	// 		<Inner>
	// 			<Left>
	// 				<HalfWayLineLeft />
	// 				<CenterCircle />
	// 				<PenaltyArea></PenaltyArea>
	// 				<GoalArea />
	// 				<PlayerField>
	// 					{homePlayersList.map((home) => (
	// 						<Players
	// 							key={home.id}
	// 							active={showModal && home.id === id}
	// 							onClick={() => handleClick(home.id)}
	// 							top={home.top}
	// 							left={home.left}>
	// 							<span>{home.label}</span>

	// 							{home.id === id && showModal && (
	// 								<Modal
	// 									timeStart={timeStart}
	// 									timeEllapsed={timeEllapsed}
	// 									playerObject={home}
	// 									bottom={home.bottom}
	// 								/>
	// 							)}
	// 						</Players>
	// 					))}
	// 				</PlayerField>
	// 			</Left>
	// 			<Right>
	// 				<HalfWayLineLeft />

	// 				<CenterCircle />
	// 				<PenaltyArea></PenaltyArea>
	// 				<GoalArea right='right' />
	// 				<PlayerField>
	// 					{awayPlayersList.map((away) => (
	// 						<Players
	// 							key={away.id}
	// 							active={showAwayModal && away.id === awayId}
	// 							onClick={() => handleAwayClick(away.id)}
	// 							top={away.top}
	// 							bottom={away.bottom}
	// 							right='true'
	// 							left={away.left}>
	// 							<span>{away.label}</span>

	// 							{away.id === awayId && showAwayModal && (
	// 								<AwayModal
	// 									timeStart={timeStart}
	// 									timeEllapsed={timeEllapsed}
	// 									playerObject={away}
	// 									// bottom={away.bottom}
	// 								/>
	// 							)}
	// 						</Players>
	// 					))}
	// 				</PlayerField>
	// 			</Right>
	// 		</Inner>
	// 	</Container>
	// );
};

export default SmallPitch;
