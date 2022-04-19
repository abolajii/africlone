import React, { useContext, useState } from 'react';
import {
	Container,
	Event,
	EventContainer,
	Events,
	ImageContainer,
	Inner,
	ModalEvent,
	Name,
	NameAndPosition,
	OutcomeContainer,
	OutcomeEvent,
	Position,
	RightArrow,
	SubEvent,
	SubEventContainer,
	SubEventsContainer,
	Upper,
} from './styles';

import { addEvent } from '../../../store/actions/player/event';
import { useDispatch } from 'react-redux';

import { eventList } from '../Modal/dataevents';
import { EVENTS_TYPES } from '../../../constants/events';
import { PlayersContext } from '../../../context/Players';

const AwayModal = ({
	timeStart,
	timeEllapsed,
	playerObject,
	playerTwo,
	indexTwo,
	awayPlayersList,
	double,
	top,
}) => {
	const {
		setAwayScore,
		awaySubsSquad,
		awayLineUpSquad,
		awayTeamSubs,
		setAwayLineUpSquad,
		setAwayTeamSubs,
	} = useContext(PlayersContext);
	const dispatch = useDispatch();
	const [id, setId] = useState(0);
	const [subId, setSubId] = useState(0);

	const eventDetail = {
		outcome: '',
		event: '',
		type: '',
		player: { ...playerObject },
		start_time: `${timeStart}`,
		stop_time: `${timeEllapsed}`,
	};

	const onHandleAddEvent = (eventType, subEv, subOutcome) => {
		let usableEventType = `${eventType}`;
		if (!EVENTS_TYPES.includes(eventType)) usableEventType = subEv;

		const _eventDetail = {
			...eventDetail,
			type: usableEventType,
			event: subEv,
			outcome: subOutcome,
			location: eventType,
		};

		dispatch(addEvent({ data: _eventDetail }));

		if (
			_eventDetail.location === 'Goals' &&
			_eventDetail.player.player === 'BLUE'
		) {
			setAwayScore((num) => num + 1);
		}
	};
	const swap = (indexA, indexB) => {
		let one = awayPlayersList[indexA];
		let two = awayPlayersList[indexB];

		const { first_name, last_name, player_id, _id, id, position, ...others } =
			two;

		const newOne = {
			first_name: one.first_name,
			last_name: one.last_name,
			player_id: one.player_id,
			_id: one._id,
			id: one.id,
			position: one.position,
			...others,
		};

		const newTwo = {
			first_name: two.first_name,
			last_name: two.last_name,
			player_id: two.player_id,
			_id: two._id,
			id: two.id,
			position: one.position,
			// ...one,
			top: one?.top,
			bottom: one?.bottom,
			right: one?.right,
		};
		awayPlayersList[indexA] = newTwo;
		awayPlayersList[indexB] = newOne;
	};

	const handleClick = (each, ev) => {
		const second = awayPlayersList.indexOf(each);
		swap(indexTwo, second);
		// setIsIndex(true);
		onHandleAddEvent(
			ev.split(' ')[0],
			ev.split(' ')[0],
			`${each.first_name.slice(0, 1)}. ${each.last_name}`
		);
	};

	const playersToSwap = awayPlayersList.filter(
		(each) => each._id !== playerTwo._id
	);

	const handleSecondClick = (subs, secondIndex, ev) => {
		const _player = awayPlayersList.find((each) => each.id === playerObject.id);
		const { right, top, player, bottom } = _player;
		const newPlayer = { top, right, player, bottom, ...subs };

		awayPlayersList.splice(indexTwo, 1, newPlayer);
		awaySubsSquad.splice(secondIndex, 1);

		handleSubIcon(playerObject, newPlayer);
		onHandleAddEvent(
			ev.slice(0, 4),
			ev.slice(0, 4),
			`${subs.first_name.slice(0, 1)}. ${subs.last_name}`
		);
	};

	const handleSubIcon = (playerOut, playerIn) => {
		const addSubIcon = awayLineUpSquad.map((player) => {
			if (player.first_name === playerOut.first_name) {
				player.subs = true;
			}
			return player;
		});

		const addSub = awayTeamSubs.map((player) => {
			if (player.first_name === playerIn.first_name) {
				player.subs = true;
			}
			return player;
		});

		setAwayLineUpSquad(addSubIcon);
		setAwayTeamSubs(addSub);
	};

	return (
		<Container top={top} double={double && subId}>
			<Inner>
				<Upper>
					<ImageContainer>10</ImageContainer>
					<NameAndPosition>
						<Name>
							{playerObject.first_name.slice(0, 1)}. {playerObject.last_name}{' '}
						</Name>
						<Position>{playerObject.label}</Position>
					</NameAndPosition>
				</Upper>

				<ModalEvent>
					{eventList.map((each, index) => {
						if (each.type === 'Shot') {
							return (
								<EventContainer
									onMouseEnter={() => setId(each.id)}
									key={each.id}>
									<Event>{each.type}</Event>
									<RightArrow />

									{each.id === id && (
										<SubEventsContainer>
											{each.outcomes.map((e, index) => {
												return (
													<SubEvent
														onClick={() => {
															onHandleAddEvent(each.type, each.type, e);
														}}
														key={index}>
														<Event>{e}</Event>
													</SubEvent>
												);
											})}
										</SubEventsContainer>
									)}
								</EventContainer>
							);
						}
						if (each.type === 'Swap Position') {
							return (
								<EventContainer
									key={each.id}
									onMouseEnter={() => setId(each.id)}>
									<Event>{each.type}</Event>
									<RightArrow />
									{each.id === id && (
										<SubEventContainer>
											{playersToSwap?.map((subEv) => {
												return (
													<SubEvent
														onClick={() => handleClick(subEv, each.type)}>
														<Event>
															{subEv.last_name.slice(0, 1)}. {subEv.first_name}
														</Event>
													</SubEvent>
												);
											})}
										</SubEventContainer>
									)}
								</EventContainer>
							);
						}
						if (each.type === 'Substitution') {
							return (
								<EventContainer
									key={each.id}
									onMouseEnter={() => setId(each.id)}>
									<Event>{each.type}</Event>
									{awaySubsSquad.length > 0 && <RightArrow />}
									{each.id === id && (
										<SubEventContainer>
											{awaySubsSquad?.map((subEv, index) => {
												return (
													<SubEvent
														onClick={() =>
															handleSecondClick(subEv, index, each.type)
														}>
														<Event>
															{subEv.last_name.slice(0, 1)}. {subEv.first_name}
														</Event>
													</SubEvent>
												);
											})}
										</SubEventContainer>
									)}
								</EventContainer>
							);
						}

						if (each.superType) {
							return (
								<EventContainer key={index} onMouseEnter={() => setId(each.id)}>
									<Event> {each.superType.title}</Event>
									<RightArrow />
									{each.id === id && (
										<SubEventContainer>
											{each.superType.type.map((secEv, index) => {
												return (
													<SubEvent
														key={index}
														onMouseEnter={() => setSubId(secEv.id)}>
														<Event
															onClick={() =>
																secEv.events.length === 0 &&
																onHandleAddEvent(
																	each.superType.title,
																	secEv.type,
																	secEv.type
																)
															}>
															{secEv.type}
														</Event>

														{secEv.events.length !== 0 && <RightArrow />}

														{secEv.id === subId && (
															<SubEventsContainer>
																{secEv.events.map((lastEv) => {
																	return (
																		<Events
																			onClick={() =>
																				onHandleAddEvent(
																					each.superType.title,
																					secEv.type,
																					lastEv.type
																				)
																			}>
																			<Event>{lastEv.type}</Event>
																		</Events>
																	);
																})}
															</SubEventsContainer>
														)}
													</SubEvent>
												);
											})}
										</SubEventContainer>
									)}
								</EventContainer>
							);
						} else {
							return (
								<EventContainer
									key={each.id}
									onMouseEnter={() => setId(each.id)}>
									<Event>{each.type}</Event>
									<RightArrow />

									{id === each.id && (
										<SubEventContainer>
											{each.events.map((ev) => {
												return (
													<SubEvent onMouseEnter={() => setSubId(ev.id)}>
														<Event
															onClick={() =>
																onHandleAddEvent(each.type, ev.type, ev.type)
															}>
															{ev.type}
														</Event>
														{ev.outcomes.length !== 0 && <RightArrow />}

														{ev.id === subId && (
															<OutcomeContainer>
																{ev.outcomes.map((lastEv, index) => {
																	return (
																		<OutcomeEvent key={index}>
																			<Event
																				onClick={() => {
																					onHandleAddEvent(
																						ev.type,
																						each.type,
																						lastEv
																					);
																				}}>
																				{lastEv}
																			</Event>
																		</OutcomeEvent>
																	);
																})}
															</OutcomeContainer>
														)}
													</SubEvent>
												);
											})}
										</SubEventContainer>
									)}
								</EventContainer>
							);
						}
					})}
				</ModalEvent>
			</Inner>
		</Container>
	);
};

export default AwayModal;
