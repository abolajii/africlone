import React, { useContext, useState, useRef } from 'react';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import { useDispatch } from 'react-redux';

import {
	ADD_EVENT,
	EVENT_ADDED,
	EVENT_MODIFIED,
} from '../../../store/actions/types';
import { modifyEvent, removeEvent } from '../../../store/actions/player/event';

import { PlayersContext } from '../../../context/Players';

import { Overlay } from 'react-portal-overlay';
import { Button } from '@material-ui/core';
import styled from 'styled-components';
import 'react-tiny-fab/dist/styles.css';
import './style.scss';

const chevDown = require('../../../assets/chevDown.svg');
const x = require('../../../assets/x.svg');

const SmallBox = styled.div`
	height: 10px;
	width: 10px;
	border-radius: 50%;
	background-color: ${({ cl }) => cl};
	margin-right: 5px;
`;

const Timeline = ({ timelines, homeName, awayName, allPlayers, eventList }) => {
	const {
		setHomeScore,
		setAwayScore,
		setHomeLineUpSquad,
		setAwayLineUpSquad,
		homeLineUpSquad,
		homePlayersList,
		awayLineUpSquad,
		awayPlayersList,
		homeTeamSubs,
		homeSubsSquad,
		setHomeTeamSubs,
		awayTeamSubs,
		awaySubsSquad,
		setAwayTeamSubs,
		setPlayerSwapSquad,
	} = useContext(PlayersContext);

	const dispath = useDispatch();

	const [editSubPlayer, setSubPlayer] = useState(null);

	const inputStartTime = useRef(null);
	const inputStopTime = useRef(null);

	const [showDropDownPlayer, setShowDropDownPlayer] = useState(false);
	const [showDropDownEvent, setShowDropDownEvent] = useState(false);
	const [showDropDownOutcome, setShowDropDownOutcome] = useState(false);
	const [showDropDownType, setShowDropDownType] = useState(false);

	const [editingEventDetails, setEditingEventDetails] = useState(null);

	const [
		selectableEventsListBaseOnTypeSelection,
		setSelectableEventsListBaseOnTypeSelection,
	] = useState([]);

	const [
		selectableOutComeListBaseOnEventSelection,
		setSelectableOutComeListBaseOnEventSelection,
	] = useState([]);

	const [stopTime, setStopTime] = useState();
	const [statTime, setStatTime] = useState();

	const [enableEdit, setEnableEdit] = useState({ value: false, event: {} });

	const handleSubIcon = () => {
		if (editingEventDetails.event !== 'Subs') return;

		if (editingEventDetails.player.player === 'RED') {
			const firstBottom = editSubPlayer.player.bottom;
			const firstTop = editSubPlayer.player.top;
			const firstLeft = editSubPlayer.player?.left;

			const playerSubbedIn = editingEventDetails.outcome.split(' ')[1];

			//find player
			const findPlayerSubbedInFromLineUp = homePlayersList.find(
				(player) => player.last_name === playerSubbedIn
			);

			//firstSubbedPlayer
			const firstSubbedPlayer = homeLineUpSquad.find(
				(player) => player.first_name === editSubPlayer.player.first_name
			);

			const fullFirstPlayerSub = {
				...firstSubbedPlayer,
				top: firstTop,
				bottom: firstBottom,
				left: firstLeft,
			};

			const findIndexOfFirstSubbedPlayer =
				homeLineUpSquad.indexOf(firstSubbedPlayer);

			// console.log('firstSubIndex', findIndexOfFirstSubbedPlayer);

			//findPlayerReplacingTheFirstPlayerSub
			const findPlayerReplacingTheFirstPlayerSub = homePlayersList.find(
				(player) => player.first_name === editingEventDetails.player.first_name
			);

			const { left, top, bottom, player } =
				findPlayerReplacingTheFirstPlayerSub;

			//findIndexPlayerReplacingTheFirstPlayerSub
			const findIndexPlayerReplacingTheFirstPlayerSub = homePlayersList.indexOf(
				findPlayerReplacingTheFirstPlayerSub
			);
			const { first_name, last_name, player_id, position, _id } =
				findPlayerSubbedInFromLineUp;

			// console.log(findPlayerSubbedInFromLineUp);

			const reverseSub = {
				player,
				first_name,
				last_name,
				player_id,
				position,
				_id,
				left,
				top,
				bottom,
			};

			homePlayersList.splice(
				findIndexPlayerReplacingTheFirstPlayerSub,
				1,
				reverseSub
			);

			homePlayersList.splice(
				findIndexOfFirstSubbedPlayer,
				1,
				fullFirstPlayerSub
			);

			setPlayerSwapSquad(homePlayersList);

			const addSubIcon = homeLineUpSquad.map((player) => {
				if (player.first_name === editingEventDetails.player.first_name) {
					player.subs = true;
				} else {
					player.subs = false;
				}
				return player;
			});

			setHomeLineUpSquad(addSubIcon);
		} else {
			const firstBottom = editSubPlayer.player.bottom;
			const firstTop = editSubPlayer.player.top;
			const firstRight = editSubPlayer.player?.right;

			const playerSubbedIn = editingEventDetails.outcome.split(' ')[1];

			//find player
			const findPlayerSubbedInFromLineUp = awayPlayersList.find(
				(player) => player.last_name === playerSubbedIn
			);

			//firstSubbedPlayer
			const firstSubbedPlayer = awayLineUpSquad.find(
				(player) => player.first_name === editSubPlayer.player.first_name
			);

			const fullFirstPlayerSub = {
				...firstSubbedPlayer,
				top: firstTop,
				bottom: firstBottom,
				right: firstRight,
			};

			const findIndexOfFirstSubbedPlayer =
				awayLineUpSquad.indexOf(firstSubbedPlayer);

			//findPlayerReplacingTheFirstPlayerSub
			const findPlayerReplacingTheFirstPlayerSub = awayPlayersList.find(
				(player) => player.first_name === editingEventDetails.player.first_name
			);

			const { right, top, bottom, player } =
				findPlayerReplacingTheFirstPlayerSub;

			//findIndexPlayerReplacingTheFirstPlayerSub
			const findIndexPlayerReplacingTheFirstPlayerSub = awayPlayersList.indexOf(
				findPlayerReplacingTheFirstPlayerSub
			);
			const { first_name, last_name, player_id, position, _id } =
				findPlayerSubbedInFromLineUp;

			const reverseSub = {
				player,
				first_name,
				last_name,
				player_id,
				position,
				_id,
				right,
				top,
				bottom,
			};

			awayPlayersList.splice(
				findIndexPlayerReplacingTheFirstPlayerSub,
				1,
				reverseSub
			);

			awayPlayersList.splice(
				findIndexOfFirstSubbedPlayer,
				1,
				fullFirstPlayerSub
			);

			setPlayerSwapSquad(awayPlayersList);

			const addSubIcon = awayLineUpSquad.map((player) => {
				if (player.first_name === editingEventDetails.player.first_name) {
					player.subs = true;
				} else {
					player.subs = false;
				}
				return player;
			});

			setAwayLineUpSquad(addSubIcon);
		}
	};

	const handleSwap = () => {
		if (editingEventDetails.event !== 'Swap') return;

		if (editingEventDetails.player.player === 'RED') {
			// console.log(editSubPlayer.player);

			const previousSwapPlayer = editingEventDetails.outcome.split(' ')[1];

			const previousSwappedPlayerFromLineUp = homePlayersList.find(
				(player) => player.last_name === previousSwapPlayer
			);

			//find Index from Lineup
			const indexOfPreviousSwappedPlayer = homePlayersList.indexOf(
				previousSwappedPlayerFromLineUp
			);

			const newSwappedPlayer = editingEventDetails.player;

			//find newswap player
			const newSwappedPlayerFromLineUp = homePlayersList.find(
				(player) => player.first_name === newSwappedPlayer.first_name
			);

			//find index of new Swap
			const indexOfNewSwappedPlayer = homePlayersList.indexOf(
				newSwappedPlayerFromLineUp
			);

			//find reversedSub

			const reversedSubPlayerFromLineUp = homePlayersList.find(
				(player) => player.first_name === editSubPlayer.player.first_name
			);

			const reverseSubPlayer = homePlayersList.indexOf(
				reversedSubPlayerFromLineUp
			);

			const reverseSwapFullDetails = {
				player: reversedSubPlayerFromLineUp.player,
				first_name: reversedSubPlayerFromLineUp.first_name,
				last_name: reversedSubPlayerFromLineUp.last_name,
				player_id: reversedSubPlayerFromLineUp.player_id,
				position: reversedSubPlayerFromLineUp.position,
				_id: reversedSubPlayerFromLineUp._id,
				left: previousSwappedPlayerFromLineUp.left,
				top: previousSwappedPlayerFromLineUp.top,
				bottom: previousSwappedPlayerFromLineUp.bottom,
			};

			const newSwapFullDetails = {
				player: newSwappedPlayerFromLineUp.player,
				first_name: newSwappedPlayerFromLineUp.first_name,
				last_name: newSwappedPlayerFromLineUp.last_name,
				player_id: newSwappedPlayerFromLineUp.player_id,
				position: newSwappedPlayerFromLineUp.position,
				_id: newSwappedPlayerFromLineUp._id,
				left: reversedSubPlayerFromLineUp.left,
				top: reversedSubPlayerFromLineUp.top,
				bottom: reversedSubPlayerFromLineUp.bottom,
			};

			const swapFullDetails = {
				player: previousSwappedPlayerFromLineUp.player,
				first_name: previousSwappedPlayerFromLineUp.first_name,
				last_name: previousSwappedPlayerFromLineUp.last_name,
				player_id: previousSwappedPlayerFromLineUp.player_id,
				position: previousSwappedPlayerFromLineUp.position,
				_id: previousSwappedPlayerFromLineUp._id,
				left: newSwappedPlayerFromLineUp.left,
				top: newSwappedPlayerFromLineUp.top,
				bottom: newSwappedPlayerFromLineUp.bottom,
			};

			homePlayersList.splice(reverseSubPlayer, 1, newSwapFullDetails);
			homePlayersList.splice(
				indexOfPreviousSwappedPlayer,
				1,
				reverseSwapFullDetails
			);
			homePlayersList.splice(indexOfNewSwappedPlayer, 1, swapFullDetails);
		}

		if (editingEventDetails.player.player === 'BLUE') {
			// console.log(editSubPlayer.player);

			const previousSwapPlayer = editingEventDetails.outcome.split(' ')[1];

			const previousSwappedPlayerFromLineUp = awayPlayersList.find(
				(player) => player.last_name === previousSwapPlayer
			);

			//find Index from Lineup
			const indexOfPreviousSwappedPlayer = awayPlayersList.indexOf(
				previousSwappedPlayerFromLineUp
			);

			const newSwappedPlayer = editingEventDetails.player;

			//find newswap player
			const newSwappedPlayerFromLineUp = awayPlayersList.find(
				(player) => player.first_name === newSwappedPlayer.first_name
			);

			//find index of new Swap
			const indexOfNewSwappedPlayer = awayPlayersList.indexOf(
				newSwappedPlayerFromLineUp
			);

			//find reversedSub

			const reversedSubPlayerFromLineUp = awayPlayersList.find(
				(player) => player.first_name === editSubPlayer.player.first_name
			);

			const reverseSubPlayer = awayPlayersList.indexOf(
				reversedSubPlayerFromLineUp
			);

			const reverseSwapFullDetails = {
				player: reversedSubPlayerFromLineUp.player,
				first_name: reversedSubPlayerFromLineUp.first_name,
				last_name: reversedSubPlayerFromLineUp.last_name,
				player_id: reversedSubPlayerFromLineUp.player_id,
				position: reversedSubPlayerFromLineUp.position,
				_id: reversedSubPlayerFromLineUp._id,
				right: previousSwappedPlayerFromLineUp.right,
				top: previousSwappedPlayerFromLineUp.top,
				bottom: previousSwappedPlayerFromLineUp.bottom,
			};

			const newSwapFullDetails = {
				player: newSwappedPlayerFromLineUp.player,
				first_name: newSwappedPlayerFromLineUp.first_name,
				last_name: newSwappedPlayerFromLineUp.last_name,
				player_id: newSwappedPlayerFromLineUp.player_id,
				position: newSwappedPlayerFromLineUp.position,
				_id: newSwappedPlayerFromLineUp._id,
				right: reversedSubPlayerFromLineUp.right,
				top: reversedSubPlayerFromLineUp.top,
				bottom: reversedSubPlayerFromLineUp.bottom,
			};

			const swapFullDetails = {
				player: previousSwappedPlayerFromLineUp.player,
				first_name: previousSwappedPlayerFromLineUp.first_name,
				last_name: previousSwappedPlayerFromLineUp.last_name,
				player_id: previousSwappedPlayerFromLineUp.player_id,
				position: previousSwappedPlayerFromLineUp.position,
				_id: previousSwappedPlayerFromLineUp._id,
				right: newSwappedPlayerFromLineUp.right,
				top: newSwappedPlayerFromLineUp.top,
				bottom: newSwappedPlayerFromLineUp.bottom,
			};

			awayPlayersList.splice(reverseSubPlayer, 1, newSwapFullDetails);
			awayPlayersList.splice(
				indexOfPreviousSwappedPlayer,
				1,
				reverseSwapFullDetails
			);
			awayPlayersList.splice(indexOfNewSwappedPlayer, 1, swapFullDetails);
		}
	};

	const Name = ({ cl, key, Fname, Lname }) => {
		return (
			<div key={key} style={{ display: 'flex', alignItems: 'center' }}>
				<SmallBox cl={cl} />
				<p>
					{Lname.slice(0, 1)}. {Fname}
				</p>
			</div>
		);
	};

	const mapTimeLineEventsAndOutComes = (mTimeline) =>
		mTimeline.map((mData, index) => ({
			id: index + 1,
			name: [
				<Name
					key={index + 1}
					cl={mData.player.player ? mData.player.player : mData.player.cl}
					Fname={mData.player.first_name}
					Lname={mData.player.last_name}
				/>,
			],
			event: mData.event,
			type: mData.location,
			team:
				mData.player.player === 'RED' || mData.player.team === 'A'
					? homeName
					: awayName,
			outcome: mData.outcome,
			start: mData.start_time,
			stop: mData.stop_time,
			action: [
				<i
					key={index + 'timeLine'}
					className='mdi mdi-pen text-primary'
					onClick={() => {
						editTimeline(mData);
						setSubPlayer(mData);
					}}
				/>,
				<i
					key={index + 1 + 'timeLine'}
					className='mdi mdi-trash-can text-danger'
					onClick={() => {
						onHandleDelete(mData);
					}}
				/>,
			],
		}));

	const initialLastThreeTimelineData = {
		columns: [
			{
				label: '#',
				field: 'sn',
				sort: 'desc',
			},
			{
				label: 'Player Name',
				field: 'name',
				sort: 'desc',
			},
			{
				label: 'Event',
				field: 'event',
				sort: 'desc',
			},
			{
				label: 'Type/Location',
				field: 'type',
				sort: 'desc',
			},
			{
				label: 'Team',
				field: 'name',
				sort: 'desc',
			},
			{
				label: 'Outcome',
				field: 'outcome',
				sort: 'desc',
			},
			{
				label: 'Start Time',
				field: 'start',
				sort: 'desc',
			},
			{
				label: 'Stop Time',
				field: 'stop',
				sort: 'desc',
			},
			{
				label: 'Action',
				field: 'action',
				sort: 'desc',
			},
		],
		rows: mapTimeLineEventsAndOutComes(timelines),
	};

	/**
	 * Helper function to regain input field focus
	 *
	 */
	const regainInputFocus = (ref) => {
		setTimeout(() => {
			ref.current.focus();
		}, 300);
	};

	const PlayersView = () => {
		return (
			<div className={'editWrap'}>
				<p className={'formLabel'}>Players</p>

				<div
					className={'inputGpWrap'}
					onClick={() => {
						setShowDropDownPlayer(!showDropDownPlayer);
					}}>
					<input
						className={'inputName'}
						placeholder='Select Player'
						disabled={true}
						value={
							editingEventDetails
								? `${editingEventDetails.player.last_name} ${editingEventDetails.player.first_name}`
								: ''
						}
						readOnly={true}
					/>
					<img src={chevDown} alt='' className={'chev'} />{' '}
					{showDropDownPlayer ? (
						<div className={'dropWrap'}>
							<PlayersListView />
						</div>
					) : null}
				</div>
			</div>
		);
	};

	const PlayersListView = () => {
		return allPlayers.map((item) => {
			const name = `${item.last_name} ${item.first_name}`;
			return (
				<p
					style={{
						position: 'relative',
						top: 0,
						left: 0,
						width: '100%',
						cursor: 'pointer',
					}}
					onClick={() => {
						editingEventDetails.player = item;
					}}>
					{name}
				</p>
			);
		});
	};

	const EventsTypeView = () => {
		const types = [];

		eventList.forEach((element) => {
			types.push(element.type);
		});

		return (
			<div className={'editWrap'}>
				<p className={'formLabel'}>Type</p>

				<div
					className={'inputGpWrapInActive'}
					onClick={() => {
						// setShowDropDownEvent(!showDropDownEvent); not editable for now, will be on the next version.
					}}>
					<input
						className={'inputName'}
						placeholder='Select Event'
						disabled={true}
						value={editingEventDetails ? editingEventDetails.type : ''}
						readOnly={true}
					/>

					{showDropDownEvent ? (
						<div className={'dropWrap'}>
							<EventsTypeListView mEventList={types} />
						</div>
					) : null}
				</div>
			</div>
		);
	};

	const EventsTypeListView = ({ mEventList }) => {
		return mEventList.map((item) => {
			return (
				<p
					style={{
						position: 'relative',
						top: 0,
						left: 0,
						width: '100%',
						cursor: 'pointer',
					}}
					onClick={() => {
						editingEventDetails.type = item;
					}}>
					{item}
				</p>
			);
		});
	};

	const EventsView = () => {
		return selectableEventsListBaseOnTypeSelection.length === 0 ? null : (
			<div className={'editWrap'}>
				<p className={'formLabel'}>Event</p>

				<div
					className={'inputGpWrap'}
					onClick={() => {
						setShowDropDownType(!showDropDownType);
					}}>
					<input
						className={'inputName'}
						placeholder='Select Type'
						disabled={true}
						value={editingEventDetails.event}
						readOnly={true}
					/>
					<img src={chevDown} alt='' className={'chev'} />{' '}
					{showDropDownType ? (
						<div className={'dropWrap'}>
							<EventsListView />
						</div>
					) : null}
				</div>
			</div>
		);
	};

	const EventsListView = () => {
		return selectableEventsListBaseOnTypeSelection.length === 0
			? null
			: selectableEventsListBaseOnTypeSelection.map((item) => {
					return (
						<p
							style={{
								position: 'relative',
								top: 0,
								left: 0,
								width: '100%',
								cursor: 'pointer',
							}}
							onClick={() => {
								editingEventDetails.event = item;

								eventList.forEach((element) => {
									if (element.type === editingEventDetails.type) {
										if (element.outcomes.length !== 0) {
											editingEventDetails.outcome = element.outcomes[0];
											setSelectableOutComeListBaseOnEventSelection(
												element.outcomes
											);
										} else {
											setSelectableOutComeListBaseOnEventSelection([]);
										}
									}
								});
							}}>
							{item}
						</p>
					);
			  });
	};

	const OutComesView = () => {
		return selectableOutComeListBaseOnEventSelection.length === 0 ? null : (
			<div className={'editWrap'}>
				<p className={'formLabel'}>Outcomes</p>

				<div
					className={'inputGpWrap'}
					onClick={() => {
						setShowDropDownOutcome(!showDropDownOutcome);
					}}>
					<input
						className={'inputName'}
						placeholder='Select Outcome'
						disabled={true}
						value={editingEventDetails.outcome}
						readOnly={true}
					/>
					<img src={chevDown} alt='' className={'chev'} />{' '}
					{showDropDownOutcome ? (
						<div className={'dropWrap'}>
							<OutcomeListView />
						</div>
					) : null}
				</div>
			</div>
		);
	};

	const OutcomeListView = () => {
		return selectableOutComeListBaseOnEventSelection.length === 0
			? null
			: selectableOutComeListBaseOnEventSelection.map((item) => {
					return (
						<p
							style={{
								position: 'relative',
								top: 0,
								left: 0,
								width: '100%',
								cursor: 'pointer',
							}}
							onClick={() => {
								editingEventDetails.outcome = item;
							}}>
							{item}
						</p>
					);
			  });
	};

	const handleStartTimeChange = (event) => {
		editingEventDetails.start_time = event.target.value;
		setStatTime(event.target.value);
	};

	const handleStopTimeChange = (event) => {
		editingEventDetails.stop_time = event.target.value;
		setStopTime(event.target.value);
	};

	const StartStopTimeView = () => {
		return (
			<div className={'editWrap'}>
				<p className={'formLabel'}>Start Time</p>

				<input
					onKeyDown={() => {
						regainInputFocus(inputStartTime);
					}}
					ref={inputStartTime}
					key={'start_time'}
					className={'inputName'}
					placeholder='Start Time'
					value={statTime}
					onChange={(event) => {
						handleStartTimeChange(event);
					}}
				/>

				<input
					onKeyDown={() => {
						regainInputFocus(inputStopTime);
					}}
					ref={inputStopTime}
					key={'stop_time'}
					className={'inputName'}
					placeholder='Stop Time'
					value={stopTime}
					onChange={(event) => {
						handleStopTimeChange(event);
					}}
				/>
			</div>
		);
	};

	const editTimeline = (src) => {
		setEnableEdit({ value: true, event: src });
		setEditingEventDetails({ ...src });

		setStatTime(src.start_time);
		setStopTime(src.stop_time);
	};

	const onHandleDelete = (eventObject) => {
		if (
			eventObject.player.player === 'RED' &&
			eventObject.location === 'Goals'
		) {
			setHomeScore((num) => (num < 0 ? 0 : num - 1));
		}

		if (
			eventObject.player.player === 'BLUE' &&
			eventObject.location === 'Goals'
		) {
			setAwayScore((num) => (num < 0 ? 0 : num - 1));
		}

		if (
			eventObject.player.player === 'RED' &&
			eventObject.location === 'Subs'
		) {
			const playerOut = eventObject.outcome.split(' ')[1];
			const removeSubIcon = homeLineUpSquad.map((player) => {
				if (player.first_name === eventObject.player.first_name) {
					player.subs = false;
				}
				return player;
			});

			const removeSub = homeTeamSubs.map((player) => {
				if (player.last_name === playerOut) {
					player.subs = false;
				}
				return player;
			});

			const subPlayerBack = homeTeamSubs.find(
				(player) => player.last_name === playerOut
			);

			const returnPlayerToLineUp = homeLineUpSquad.find(
				(player) => player.last_name === eventObject.player.last_name
			);

			const findPlayer = homePlayersList.find(
				(player) => player.last_name === playerOut
			);

			const { left, bottom, top, player } = findPlayer;

			const indexOfPlayerInLineUp =
				homeLineUpSquad.indexOf(returnPlayerToLineUp);

			const findIndex = homeTeamSubs.indexOf(subPlayerBack);

			// const returnPlayer = { left, bottom, top, ...returnPlayerToLineUp };
			// console.log(returnPlayer);

			homeSubsSquad.splice(findIndex, 0, subPlayerBack);
			homePlayersList.splice(indexOfPlayerInLineUp, 1, {
				left,
				bottom,
				top,
				player,
				...returnPlayerToLineUp,
			});
			setHomeLineUpSquad(removeSubIcon);
			setHomeTeamSubs(removeSub);
		}

		if (
			eventObject.player.player === 'BLUE' &&
			eventObject.location === 'Subs'
		) {
			const playerOut = eventObject.outcome.split(' ')[1];
			const removeSubIcon = awayLineUpSquad.map((player) => {
				if (player.first_name === eventObject.player.first_name) {
					player.subs = false;
				}
				return player;
			});

			const removeSub = awayTeamSubs.map((player) => {
				if (player.last_name === playerOut) {
					player.subs = false;
				}
				return player;
			});

			const subPlayerBack = awayTeamSubs.find(
				(player) => player.last_name === playerOut
			);

			const returnPlayerToLineUp = awayLineUpSquad.find(
				(player) => player.last_name === eventObject.player.last_name
			);

			const findPlayer = awayPlayersList.find(
				(player) => player.last_name === playerOut
			);

			const { right, bottom, top, player } = findPlayer;

			const indexOfPlayerInLineUp =
				awayLineUpSquad.indexOf(returnPlayerToLineUp);

			const findIndex = awayTeamSubs.indexOf(subPlayerBack);

			// const returnPlayer = { left, bottom, top, ...returnPlayerToLineUp };
			// console.log(returnPlayer);

			awaySubsSquad.splice(findIndex, 0, subPlayerBack);
			awayPlayersList.splice(indexOfPlayerInLineUp, 1, {
				right,
				bottom,
				top,
				player,
				...returnPlayerToLineUp,
			});
			setAwayLineUpSquad(removeSubIcon);
			setAwayTeamSubs(removeSub);
		}

		dispath(removeEvent({ data: { ...eventObject } }));
	};

	const EditRecordView = () => {
		return (
			<Overlay className={'modal'} closeOnClick={true} open={enableEdit.value}>
				<div className={'modal_paper'}>
					<div className={'modalTop2'}>
						<p className={'appTitle'}>{'Edit Event'}</p>
						<img
							src={x}
							alt='cancel'
							onClick={() => {
								setEnableEdit({ value: false, event: enableEdit.event });
							}}
						/>
					</div>

					<PlayersView />
					<EventsTypeView />
					<EventsView />
					<OutComesView />
					<StartStopTimeView />

					<Button
						style={{
							backgroundColor: 'green',
							marginTop: '20px',
							color: 'white',
						}}
						onClick={() => {
							handleSwap();
							handleSubIcon();
							dispath(modifyEvent({ data: { ...editingEventDetails } }));
							setEnableEdit(false);
							setEditingEventDetails(null);
						}}
						variant='success'>
						Submit
					</Button>
				</div>
			</Overlay>
		);
	};

	return (
		<>
			<div className='mt-4'>
				<h6>
					<i className='mdi mdi-timeline-outline mdi-18px mr-2' /> Timeline
				</h6>

				<div className='timeline mt-2'>
					<div className='header'>
						<MDBTable hover fixed scrollY>
							<MDBTableHead columns={initialLastThreeTimelineData.columns} />
							<MDBTableBody rows={initialLastThreeTimelineData.rows} />
						</MDBTable>
					</div>
				</div>
			</div>

			<EditRecordView />
		</>
	);
};

export default Timeline;
