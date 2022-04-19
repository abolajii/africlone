import React, { useEffect, useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { Overlay } from 'react-portal-overlay';
import ClipLoader from 'react-spinners/ClipLoader';
import { css } from '@emotion/core';
import { useDispatch, useSelector } from 'react-redux';
import axios from '../../../helpers/axios';

import { clearEvent } from '../../../store/actions/player/event';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import MatchTimer from '../MatchTimer';
import MatchBoard from '../MatchBoard';
import MatchField from '../MatchField';
import MatchLineup from '../MatchLineup';
import Timeline from '../Timeline';
// import { notify } from 'react-toastify';
import 'react-tiny-fab/dist/styles.css';
import DataBaseApi from '../../../database/DataBaseApi';
import './style.scss';
import {
	EVENT_ADDED,
	EVENT_CLEARED,
	EVENT_MODIFIED,
	EVENT_REMOVED,
} from '../../../store/actions/types';
import { CreateModalContext } from '../../../context/Modal';
import { PlayersContext } from '../../../context/Players';

const override = css`
	display: block;
	margin: 0 auto;
	border-color: 'red';
`;

const StartMatch = () => {
	const dispath = useDispatch();
	const location = useLocation();

	const {
		selected,
		awayTeamSubs,
		setAwayTeamSubs,
		homeTeamSubs,
		setHomeTeamSubs,
		homeTeamLineup,
		setHomeTeamLineup,
		awayTeamLineup,
		setAwayTeamLineup,
		homeLineUpSquad,
		awayLineUpSquad,
		setHomeLineUpSquad,
		setAwayLineUpSquad,
		homeSubsSquad,
		setHomeSubsSquad,
		setAwaySubsSquad,
		awaySubsSquad,
		setHomeScore,
		setAwayScore,
		homePlayersList,
		awayPlayersList,
	} = useContext(PlayersContext);

	const { setStartMatchSpin } = useContext(CreateModalContext);

	const [matchId, setMatchId] = useState(null);
	const query = new URLSearchParams(useLocation().search);

	const search = location.search;

	const homeId = query.get('home');
	const awayId = query.get('away');
	const m_id = query.get('m_id');
	const d = query.get('d');
	const c = query.get('c');
	const sn = query.get('sn');
	const sId = query.get('s_id');

	const [homeTeam, setHomeTeam] = useState([]);
	const [awayTeam, setAwayTeam] = useState([]);

	const [reset, setReset] = useState(false);

	const [matchDetails, setMatchDetails] = useState({});

	const [competition, setCompetition] = useState({});

	const event = useSelector((state) => state.event);
	const eventPayload = event.payload;

	const [timelines, setTimelines] = useState([]);

	const [matchState, setMatchState] = useState('stopped');
	const [loadingSpinner, setLoadingSpinner] = useState(false);

	const [allPlayerz, setAllPlayerz] = useState([]);

	const [timeLineData, setTimeLineData] = useState([]);

	let timeElapsed = null;

	const [timeEllapsed, setTimeEllapsed] = useState('0:0');

	useEffect(() => {
		const data = { match: m_id };
		axios
			.post('/match/view-match/', data)
			.then((response) => {
				const result = response.data.data;

				setHomeLineUpSquad(
					result.home_team_line_up.map((each) => {
						return { subs: false, ...each };
					})
				);

				setHomeTeamSubs(
					result.home_team_subs.map((each) => {
						return { subs: false, ...each };
					})
				);
				setAwayLineUpSquad(
					result.away_team_line_up.map((each) => {
						return { subs: false, ...each };
					})
				);
				setAwayTeamSubs(
					result.away_team_subs.map((each) => {
						return { subs: false, ...each };
					})
				);

				setHomeTeamLineup(result.home_team_line_up);
				setAwayTeamLineup(result.away_team_line_up);

				setHomeSubsSquad(result.home_team_subs);
				setAwaySubsSquad(result.away_team_subs);
				setMatchId(result._id);

				setReset(false);
			})
			.catch((err) => console.log(err));
	}, [reset]);

	useEffect(() => {
		if (awayPlayersList.length > 0 && homePlayersList.length > 0 && matchId) {
			prefillDataBase(homePlayersList, awayPlayersList, matchId);
		}
	}, [homePlayersList, awayPlayersList, matchId]);

	useEffect(() => {
		const data = { match: m_id };

		axios
			.get(`/team/team/${homeId}`)
			.then((response) => {
				setHomeTeam(response.data.data);
			})
			.catch((err) => {
				console.log(err);
			});

		axios
			.get(`/team/team/${awayId}`)
			.then((response) => {
				setAwayTeam(response.data.data);
			})
			.catch((err) => {
				console.log(err);
			});

		axios
			.post(`/match/view-match`, data)
			.then((response) => {
				setMatchDetails(response.data.data);
			})
			.catch((err) => {
				console.log(err);
			});

		axios
			.get(`competition/competition/${c}`)
			.then((response) => {
				setCompetition(response.data.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [homeId, awayId, c]);

	const DBApi = new DataBaseApi();
	const time = new Date();
	time.setSeconds(time.getSeconds() + 300);

	const CustomSpinner = () => {
		return (
			<Overlay
				className='modal'
				closeOnClick={false}
				open={loadingSpinner}
				onClose={() => {
					setLoadingSpinner(false);
				}}>
				<ClipLoader css={override} size={50} color={'#123abc'} loading={true} />
			</Overlay>
		);
	};

	useEffect(() => {
		if (event.action === EVENT_ADDED && event.payload) {
			const newTimelines = [...timelines];
			newTimelines.unshift(event.payload);
			setTimelines(newTimelines);
		}
	}, [eventPayload]);

	useEffect(() => {
		if (event.action === EVENT_CLEARED) {
			setTimelines([]);
		}

		if (event.action === EVENT_MODIFIED) {
			const modifiedResultList = findAndReplace(eventPayload, timelines);

			setTimelines(modifiedResultList);
		}

		if (event.action === EVENT_REMOVED) {
			const modifiedResultList = findAndRemove(eventPayload, timelines);

			setTimelines(modifiedResultList);
		}
	}, [event.action]);

	const findAndReplace = (_eventPayload, _eventList) => {
		const mEventList = [..._eventList];

		for (let i = 0; i < _eventList.length; i++) {
			const eventItem = _eventList[i];

			if (eventItem.id === _eventPayload.id) {
				mEventList[i] = _eventPayload;
				return mEventList;
			}
		}

		return mEventList;
	};

	const findAndRemove = (_eventPayload, _eventList) => {
		const mEventList = [];

		for (const eventItem of _eventList) {
			if (eventItem.id !== _eventPayload.id) {
				mEventList.push(eventItem);
			}
		}

		return mEventList;
	};

	const prefillDataBase = (teamA, teamB, _matchId) => {
		const persableAllPlayerz = [];
		teamA.forEach((playerA) => {
			persableAllPlayerz.push({
				...playerA,
				team: 'A',
				cl: 'Red',
				subs: false,
			});
		});

		teamB.forEach((playerB) => {
			persableAllPlayerz.push({
				...playerB,
				team: 'B',
				cl: 'Blue',
				subs: false,
			});
		});

		setAllPlayerz(persableAllPlayerz);
		setMatchId(_matchId);

		DBApi.addNewPlayerMatchEvent(persableAllPlayerz, _matchId);
	};

	const eventList = [
		{
			type: 'Goals',
			events: ['Header', 'Inside box', '1 V 1', 'Outside box'],
			outcomes: [],
		},
		{ type: 'Pass', events: ['Long', 'Line break', 'Short'], outcomes: [] },
		{
			type: 'Saves',
			events: ['Inside box', 'Outside box', '1 V 1'],
			outcomes: [],
		},
		{
			type: 'Shot',
			events: ['Long range', 'Short range'],
			outcomes: ['Successful', 'Unsuccessful'],
		},
		{ type: 'Duel', events: ['Aerial', 'Ground'], outcomes: [] },
		{
			type: 'Dribble',
			events: ['Nutmeg', 'Skill move'],
			outcomes: ['Successful', 'Unsuccessful'],
		},
		{ type: 'Cards', events: ['Dissent', 'Foul'], outcomes: ['Red', 'Yellow'] },
		{
			type: 'Ball Progression',
			events: ['Ownhalf', 'Opponents half'],
			outcomes: [],
		},
		{
			type: 'Foul',
			events: ['Ownhalf', 'Opponents half'],
			outcomes: ['Successful', 'Unsuccessful'],
		},
		{
			type: 'Clearance',
			events: ['Goal line', 'Under pressure'],
			outcomes: [],
		},
		{ type: 'Assist', events: ['Assist'], outcomes: [] },
		{ type: 'Penalty', events: ['Missed', 'Score'], outcomes: [] },
		{ type: 'Freekick', events: ['On Target', 'Off Target'], outcomes: [] },
		{ type: 'Catch', events: ['Simple', 'Complex'], outcomes: [] },
		{ type: 'Block', events: ['Block'], outcomes: [] },
		{ type: 'Tackle', events: ['Tackle'], outcomes: [] },
		{ type: 'Cross', events: ['Cross'], outcomes: [] },
		{ type: 'Chances created', events: ['Chances created'], outcomes: [] },
	];

	const handleTimeElapsed = (_timeElapsed) => {
		timeElapsed = _timeElapsed;
		setTimeEllapsed(_timeElapsed);
	};

	/**
	 * Add to timeline helper function
	 */
	const addToTimeLine = (timelinesData) => {
		const timeLines = timelinesData;
		setTimeLineData(timeLines);
	};

	const handleDone = async () => {
		if (matchState !== 'stopped') return alert('Stop match first.');
		setStartMatchSpin(true);

		const matchReports = await DBApi.getGetAllEvents(
			c,
			sn,
			homeTeam,
			awayTeam,
			homeTeamLineup,
			awayTeamLineup,
			matchId,
			selected,
			allPlayerz,
			sId
		);

		axios
			.post('/match/event', matchReports)
			.then((res) => {
				setStartMatchSpin(false);
				toast.success('Match has been sent successfully');
				onHandleClearEvents();
			})
			.catch((err) => {
				setStartMatchSpin(false);
				toast.error('Something went wrong, Please try again!');
			});
	};

	const onHandleClearEvents = () => {
		setHomeScore(0);
		setAwayScore(0);
		setHomeLineUpSquad(
			homeLineUpSquad.map((each) => {
				if (each.subs) {
					each.subs = false;
				}
				return each;
			})
		);
		setAwayLineUpSquad(
			homeLineUpSquad.map((each) => {
				if (each.subs) {
					each.subs = false;
				}
				return each;
			})
		);
		setHomeSubsSquad(
			homeSubsSquad.map((each) => {
				if (each.subs) {
					each.subs = false;
				}
				return each;
			})
		);
		setAwaySubsSquad(
			awaySubsSquad.map((each) => {
				if (each.subs) {
					each.subs = false;
				}
				return each;
			})
		);
		setReset(true);
		dispath(clearEvent({ data: {} }));
	};

	return (
		<>
			<div
				className='container-fluid start-match'
				style={{ background: 'blue' }}>
				<ToastContainer />
				<div className='row pt-2' style={{ background: '#fff' }}>
					<div className='col-12 mt-5 row px-0' style={{ background: 'green' }}>
						<div
							className='col-lg-3'
							style={{
								background: '#f2f2f2',
								paddingTop: '4rem',
							}}>
							<MatchBoard
								home={homeTeam}
								matchDetails={competition}
								time={d}
								away={awayTeam}
							/>
							<MatchLineup
								homeLineUp={homeTeamLineup}
								awayLineUp={awayTeamLineup}
								homeSubs={homeTeamSubs}
								awaySubs={awayTeamSubs}
							/>
						</div>

						<div className='col-lg-9' style={{ background: '#fff' }}>
							<div className='col-12 field'>
								<div
									className='row'
									style={{
										background: '#f2f2f2',
										width: '920px',
										paddingBottom: '10px',
										marginBottom: '20px',
									}}>
									<MatchField
										homeSubs={homeTeamSubs}
										awaySubs={awayTeamSubs}
										timeEllapsed={timeEllapsed}
										homeLineUp={homeTeamLineup}
										awayLineUp={awayTeamLineup}
									/>

									<div className='col-5'>
										<div className='text-center'>
											<MatchTimer
												expiryTimestamp={time}
												onStart={() => {
													setMatchState('started');
												}}
												onPause={() => {
													setMatchState('paused');
												}}
												onResume={() => {
													setMatchState('resumed');
												}}
												onStop={() => {
													setMatchState('stopped');
												}}
												onRestart={() => {}}
												onAlreadyStarted={() => {}}
												timeElapsed={(timeObj) => {
													handleTimeElapsed(timeObj);
												}}
												onDelete={() => {
													onHandleClearEvents();
												}}
												onFinish={() => {
													handleDone();
												}}
											/>
										</div>
									</div>
								</div>

								<Timeline
									homeName={homeTeam.name}
									awayName={awayTeam.name}
									timelines={timelines}
									allPlayers={allPlayerz}
									eventList={eventList}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>

			<CustomSpinner />
		</>
	);
};

export default StartMatch;
