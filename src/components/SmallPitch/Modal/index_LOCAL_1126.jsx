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
	SubEventsContainer,
	SubEvent,
	OutcomeEvent,
	OutcomeContainer,
	Events,
} from './styles';

import { eventList } from './dataevents';

const Modal = ({ bottom }) => {
	const [id, setId] = useState(null);
	const [subEvId, setSubEvId] = useState(null);
	const [subEvents, setSubEvents] = useState(null);

	console.log(subEvents);

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
														onMouseEnter={() => setSubEvId(subEv.id)}
														key={subEv.id}>
														<Event>{subEv.type}</Event>
														<RightArrow />

														{subEv.id === subEvId && subEv.outcomes && (
															<OutcomeContainer>
																{subEv.outcomes.map((subOutcome, index) => (
																	<OutcomeEvent key={index}>
																		<Event>{subOutcome}</Event>
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
														// onMouseLeave={() => setSubEvents(null)}
														onMouseEnter={() => setSubEvents(subEv.id)}>
														<Event>{subEv.type}</Event>
														<RightArrow />

														{subEv.id === subEvents && subEv.events && (
															<SubEventsContainer>
																{subEv.events.map((ev) => {
																	return (
																		<Events key={ev.id}>
																			<Event>{ev.type}</Event>
																			<RightArrow />
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
