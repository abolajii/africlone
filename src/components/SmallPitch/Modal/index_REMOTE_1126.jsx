import React, { useState } from 'react';
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
	SubEvent,
	OutcomeEvent,
	OutcomeContainer,
} from './styles';
import { addEvent } from '../../../store/actions/player/event';
import { useDispatch } from 'react-redux';

import { eventList } from './dataevents';

const Modal = ({timeStart, timeEllapsed, playerObject, bottom }) => {
	const dispath = useDispatch();

	const [id, setId] = useState(null);
	const [subEvId, setSubEvId] = useState(null);
	const eventDetail = {
		outcome: '',
		event: '',
		type: '',
		player: {...playerObject},
		start_time: `${timeStart}`,
		stop_time: `${timeEllapsed}`,
	};

	const onHandleAddEvent = (eventType, subEv, subOutcome) => {
		const _eventDetail = {...eventDetail, type:eventType, event:subEv, outcome: subOutcome}
		dispath(addEvent({ data: _eventDetail }));
	};

	return (
		<Container bottom={bottom}>
			<Inner>
				<Upper>
					<ImageContainer>10</ImageContainer>
					<NameAndPosition>
						<Name>S. Mane</Name>
						<Position>FW</Position>
					</NameAndPosition>
				</Upper>

				<ModalEvent>
					{eventList.map((ev) => {							
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
														onClick={()=>{subEv.outcomes.length===0?onHandleAddEvent(ev.type, subEv.type, subEv.type):console.log("")}}
														onMouseEnter={() => setSubEvId(subEv.id)}
														key={subEv.id}>
														<Event>{subEv.type}</Event>
														<RightArrow />

														{subEv.id === subEvId && subEv.outcomes && (
															<OutcomeContainer>
																{subEv.outcomes.map((subOutcome, index) => (
																	<OutcomeEvent key={index}>
																		<Event onClick={()=>{onHandleAddEvent(ev.type, subEv.type, subOutcome)}}>{subOutcome}</Event>
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
													<SubEvent key={subEv.id}>
														<Event>{subEv.type}</Event>
														<RightArrow />
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
