import React, { useState, useContext } from 'react';
import {
	Container,
	ImageContainer,
	Inner,
	Upper,
	Name,
	NameAndPosition,
	Position,
	Event,
	ModalEvent,
	RightArrow,
	EventContainer,
	SubEventContainer,
	SubEventsContainer,
	SubEvent,
	OutcomeEvent,
	OutcomeContainer,
	Events,
} from './styles';
import { addEvent } from '../../../store/actions/player/event';
import { useDispatch } from 'react-redux';

import { eventList } from './dataevents';
import { PlayersContext } from '../../../context/Players';

import { EVENTS_TYPES } from '../../../constants/events';

const Modal = ({
	timeStart,
	indexL,
	setIsIndex,
	firstIndex,
	timeEllapsed,
	homePlayersList,
	playerObject,
	player,
	bottom,
}) => {
	const {
		setHomeScore,
		homeSubsSquad,
		homeLineUpSquad,
		homeTeamSubs,
		setHomeTeamSubs,
		setHomeLineUpSquad,
	} = useContext(PlayersContext);

	const dispath = useDispatch();

	const [id, setId] = useState(null);
	const [subEvId, setSubEvId] = useState(null);
	const [subEvents, setSubEvents] = useState(null);

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

		dispath(addEvent({ data: _eventDetail }));
		if (
			_eventDetail.location === 'Goals' &&
			_eventDetail.player.player === 'RED'
		) {
			setHomeScore((num) => num + 1);
		}
	};

	const swap = (indexA, indexB) => {
		let one = homePlayersList[indexA];
		let two = homePlayersList[indexB];

		const { first_name, last_name, player_id, _id, id, position, ...others } =
			two;

		const newOne = {
			first_name: one.first_name,
			last_name: one.last_name,
			player_id: one.player_id,
			_id: one._id,
			id: one.id,
			player: one.player,
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
			player: two.player,
			top: one?.top,
			bottom: one?.bottom,
			left: one?.left,
		};
		homePlayersList[indexA] = newTwo;
		homePlayersList[indexB] = newOne;
	};

	const handleClick = (each, ev) => {
		const second = homePlayersList.indexOf(each);
		swap(indexL, second);
		// setIsIndex(true);
		onHandleAddEvent(
			ev.split(' ')[0],
			ev.split(' ')[0],
			`${each.first_name.slice(0, 1)}. ${each.last_name}`
		);
	};

	const playersToSwap = homePlayersList.filter(
		(each) => each._id !== player._id
	);

	const handleSecondClick = (subs, secondIndex, ev) => {
		const _player = homePlayersList.find((each) => each.id === playerObject.id);
		const { left, top, player, bottom } = _player;
		const newPlayer = { left, top, player, bottom, ...subs };

		homePlayersList.splice(firstIndex, 1, newPlayer);
		homeSubsSquad.splice(secondIndex, 1);

		handleSubIcon(playerObject, newPlayer);
		onHandleAddEvent(
			ev.slice(0, 4),
			ev.slice(0, 4),
			`${subs.first_name.slice(0, 1)}. ${subs.last_name}`
		);
	};

	const handleSubIcon = (playerOut, playerIn) => {
		const addSubIcon = homeLineUpSquad.map((player) => {
			if (player.first_name === playerOut.first_name) {
				player.subs = true;
			}
			return player;
		});

		const addSub = homeTeamSubs.map((player) => {
			if (player.first_name === playerIn.first_name) {
				player.subs = true;
			}
			return player;
		});

		setHomeLineUpSquad(addSubIcon);
		setHomeTeamSubs(addSub);
	};

	return (
		<Container bottom={bottom}>
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
					{eventList.map((ev) => {
						if (ev.type === 'Swap Position') {
							return (
								<EventContainer key={ev.id} onMouseEnter={() => setId(ev.id)}>
									<Event>{ev.type}</Event>
									<RightArrow />
									{ev.id === id && (
										<SubEventContainer>
											{playersToSwap?.map((subEv) => {
												return (
													<SubEvent onClick={() => handleClick(subEv, ev.type)}>
														<Event>
															{subEv.first_name.slice(0, 1)}. {subEv.last_name}
														</Event>
													</SubEvent>
												);
											})}
										</SubEventContainer>
									)}
								</EventContainer>
							);
						}

						if (ev.type === 'Substitution') {
							return (
								<EventContainer key={ev.id} onMouseEnter={() => setId(ev.id)}>
									<Event>{ev.type}</Event>
									{homeSubsSquad.length > 0 && <RightArrow />}
									{ev.id === id && (
										<SubEventContainer>
											{homeSubsSquad?.map((subEv, index) => {
												return (
													<SubEvent
														onClick={() =>
															handleSecondClick(subEv, index, ev.type)
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

						if (ev.type) {
							return (
								<EventContainer key={ev.id} onMouseEnter={() => setId(ev.id)}>
									<Event>{ev.type}</Event>
									<RightArrow />

									{ev.id === id && (
										<SubEventContainer>
											{ev.events.map((subEv) => {
												return (
													<SubEvent
														onClick={() => {
															subEv.outcomes.length === 0
																? onHandleAddEvent(
																		ev.type,
																		subEv.type,
																		subEv.type
																  )
																: console.log('');
														}}
														onMouseEnter={() => setSubEvId(subEv.id)}
														key={subEv.id}>
														<Event>{subEv.type}</Event>
														{subEv.outcomes.length !== 0 && <RightArrow />}

														{subEv.id === subEvId && subEv.outcomes && (
															<OutcomeContainer>
																{subEv.outcomes.map((subOutcome, index) => (
																	<OutcomeEvent key={index}>
																		<Event
																			onClick={() => {
																				onHandleAddEvent(
																					ev.type,
																					subEv.type,
																					subOutcome
																				);
																			}}>
																			{subOutcome}
																		</Event>
																	</OutcomeEvent>
																))}
															</OutcomeContainer>
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
								<EventContainer key={ev.id} onMouseEnter={() => setId(ev.id)}>
									<Event>{ev.superType.title}</Event>
									<RightArrow />
									{ev.id === id && (
										<SubEventContainer>
											{ev.superType.type.map((subEv) => {
												return (
													<SubEvent
														key={subEv.id}
														onMouseEnter={() => setSubEvents(subEv.id)}>
														<Event
															onClick={() =>
																subEv.events.length === 0 &&
																onHandleAddEvent(
																	ev.superType.title,
																	subEv.type,
																	subEv.type
																)
															}>
															{subEv.type}
														</Event>
														{subEv.events.length !== 0 && <RightArrow />}

														{subEv.id === subEvents && subEv.events && (
															<SubEventsContainer>
																{subEv.events.map((evs) => {
																	return (
																		<Events
																			onClick={() => {
																				onHandleAddEvent(
																					ev.superType.title,
																					subEv.type,
																					evs.type
																				);
																			}}
																			key={evs.id}>
																			<Event>{evs.type}</Event>
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
						}
					})}
				</ModalEvent>
			</Inner>
		</Container>
	);
};

export default Modal;
