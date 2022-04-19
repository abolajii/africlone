import { useIndexedDB } from 'react-indexed-db';
export default class DataBaseApi {
	useIndexedDBInstance = useIndexedDB();
	playerMatchEvents = this.useIndexedDBInstance;

	event = this.useIndexedDBInstance;

	constructor() {
		this.playerMatchEvents = useIndexedDB('playerMatchEvents');
		this.event = useIndexedDB('event');
	}

	addNewPlayerMatchEvent(allPlayer = [], matchId) {
		this.clearDb().then(() => {
			allPlayer.forEach((playerObject) => {
				const newPlayerMatchEvent = {
					matchId: matchId,
					team: playerObject.team,
					playerId: playerObject.player_id,
					first_name: playerObject.first_name,
					last_name: playerObject.last_name,
					playerPosition: undefined,
					playerDob: undefined,
					playerNumber: undefined,
					start: 0,
					minutes: 0,
					bench: 0,
				};

				this.playerMatchEvents.add(newPlayerMatchEvent);
			});
		});
	}

	clearDb() {
		return new Promise(async (resolved, rejected) => {
			try {
				await this.event.clear();
				await this.playerMatchEvents.clear();
				return resolved();
			} catch (reason) {
				return rejected();
			}
		});
	}

	clearEvent() {
		return new Promise(async (resolved, rejected) => {
			try {
				await this.event.clear();
				return resolved();
			} catch (reason) {
				return rejected();
			}
		});
	}

	addEventREVAMPED(eventObject) {
		return new Promise(async (resolved, rejected) => {
			try {
				const id = await this.event.add(eventObject);
				return resolved(id);
			} catch (reason) {
				return rejected(reason);
			}
		});
	}

	removeEventREVAMPED(eventObject) {
		return new Promise(async (resolved, rejected) => {
			try {
				await this.event
					.deleteRecord(eventObject.id)
					.then((item) => {
						return resolved(eventObject);
					})
					.catch((reason) => {
						return rejected(reason);
					});
			} catch (reason) {
				return rejected(reason);
			}
		});
	}

	updateEventREVAMPED(updatedEventObject) {
		return new Promise(async (resolved, rejected) => {
			try {
				this.event
					.deleteRecord(updatedEventObject.id)
					.then(async (event) => {
						const id = await this.event.add(updatedEventObject);
						if (!id) return rejected();

						return resolved(updatedEventObject);
					})
					.catch((reason) => {
						return rejected();
					});
			} catch (reason) {
				return rejected(reason);
			}
		});
	}

	getEventsREVAMPED() {
		return new Promise(async (resolved, rejected) => {
			try {
				const allEvents = await this.event.getAll();
				return resolved(allEvents);
			} catch (reason) {
				return rejected(reason);
			}
		});
	}

	getGetAllEvents = (
		competitionId = 'not_passed_by_front_end',
		seasonName,
		home,
		away,
		teamA = {},
		teamB = {},
		matchId = 'not_passed_by_front_end',
		matchVideo,
		playersList = [],
		seasonId
	) => {
		return new Promise(async (resolved, rejected) => {
			try {
				const events = [
					{
						type: 'Pass',
						events: ['Long', 'Line break', 'Short'],
						outcomes: ['Successful', 'Unsuccessful'],
					},
					{
						type: 'Dribbles',
						events: ['Skill Moves', 'Nut Megs'],
						outcomes: ['Successful', 'Unsuccessful'],
					},
					{
						type: 'Shots',
						events: ['Outsidebox', 'Insidebox'],
						outcomes: ['Successful', 'Unsuccessful'],
					},
					{
						type: 'Corner',
						events: [],
						outcomes: [],
					},
					{
						type: 'Goals',
						events: ['Header', 'OneVone', 'Outside box', 'Inside box'],
						outcomes: ['Successful', 'Unsuccessful'],
					},
					{
						type: 'Assists',
						events: [],
						outcomes: [],
					},
					{
						type: 'Chance Created',
						events: [],
						outcomes: [],
					},
					{
						type: 'Free Kick',
						events: ['On Target', 'Off Target'],
						outcomes: ['On Target', 'Off Target'],
					},
					{
						type: 'Penalty',
						events: ['Missed', 'Scored'],
						outcomes: [],
					},
					{
						type: 'Fouls',
						events: ['Opp Half', 'Own Half'],
						outcomes: ['Successful', 'Unsuccessful'],
					},
					{
						type: 'Interceptions',
						events: ['Opponents Half', 'Own  Half'],
						outcomes: [],
					},
					{
						type: 'Tackles',
						events: ['Successful', 'Unsuccessful'],
						outcomes: [],
					},
					{
						type: 'Ball Progression',
						events: ['Opponents Half', 'Own  Half'],
						outcomes: [],
					},
					{
						type: 'Blocks',
						events: [],
						outcomes: [],
					},
					{
						type: 'Clearance',
						events: ['Goal Line', 'Under Pressure'],
						outcomes: [],
					},
					{
						type: 'Duels',
						events: ['Won Aerial', 'Won Ground'],
						outcomes: [],
					},
					{
						type: 'Saves',
						events: ['OneVone', 'InsideBox', 'OutsideBox'],
						outcomes: [],
					},
					{
						type: 'Card',
						events: ['Dissent', 'Foul'],
						outcomes: ['Red', 'Yellow'],
					},
					{
						type: 'Catches',
						events: ['Simple', 'Complex'],
						outcomes: [],
					},
				];

				const allEvents = await this.event.getAll();

				const allData = {
					events: [],
					match: {
						match_id: matchId,
						match_video: matchVideo,
						competition_id: competitionId,
						home_team: {
							team_season_id: seasonId,
							team_name: home.name,
							logo: home.logo,
						},
						away_team: {
							team_season_id: seasonId,
							team_name: away.name,
							logo: away.logo,
						},
						home_team_goals: {
							total: 0,
							goal_event: [],
						},
						away_team_goals: {
							total: 0,
							goal_event: [],
						},
						total_corners: 0,
						total_freekicks: 0,
						total_passes: 0,
						total_shots: 0,
						total_shots_on_target: 0,
						total_tackles: 0,
						total_duels: 0,
						total_chances_created: 0,
						total_interceptions: 0,
						total_ball_progressions: 0,
						total_saves: 0,
						total_red_cards: 0,
						total_yellow_cards: 0,
						total_catches: 0,
						total_blocks: 0,
						total_clearances: 0,
						total_dribbles: 0,
						total_goals: 0,
						total_assists: 0,
						total_penalty: 0,
						total_fouls: 0,
						total_cards: 0,

						total_home_team_corners: 0,
						total_home_team_freekicks: 0,
						total_home_team_passes: 0,
						total_home_team_shots: 0,
						total_home_team_shots_on_target: 0,
						total_home_team_tackles: 0,
						total_home_team_duels: 0,
						total_home_team_chances_created: 0,
						total_home_team_interceptions: 0,
						total_home_team_ball_progressions: 0,
						total_home_team_saves: 0,
						total_home_team_red_cards: 0,
						total_home_team_yellow_cards: 0,
						total_home_team_catches: 0,
						total_home_team_blocks: 0,
						total_home_team_clearances: 0,
						total_home_team_dribbles: 0,
						total_home_team_goals: 0,
						total_home_team_assists: 0,
						total_home_team_penalty: 0,
						total_home_team_fouls: 0,
						total_home_team_cards: 0,

						total_away_team_corners: 0,
						total_away_team_freekicks: 0,
						total_away_team_passes: 0,
						total_away_team_shots: 0,
						total_away_team_shots_on_target: 0,
						total_away_team_tackles: 0,
						total_away_team_duels: 0,
						total_away_team_chances_created: 0,
						total_away_team_interceptions: 0,
						total_away_team_ball_progressions: 0,
						total_away_team_saves: 0,
						total_away_team_red_cards: 0,
						total_away_team_yellow_cards: 0,
						total_away_team_catches: 0,
						total_away_team_blocks: 0,
						total_away_team_clearances: 0,
						total_away_team_dribbles: 0,
						total_away_team_goals: 0,
						total_away_team_assists: 0,
						total_away_team_penalty: 0,
						total_away_team_fouls: 0,
						total_away_team_cards: 0,
					},
				};

				console.log(playersList);

				for (const player of playersList) {
					const allEventsFilteredByPlayer = (await allEvents).filter(
						(item) => item.player.player_id === player.player_id
					);
					const singlePlayerEvent = {
						...allEventsFilteredByPlayer,
						match: matchId,
						season_name: seasonName,
						player_id: player.player_id,
						start: 0,
						minutes: 0,
						bench: 0,
						successful_shortpass: {
							timeline: [],
							total: 0,
							event_clip: '',
						},
						successful_longpass: {
							timeline: [],
							total: 0,
							event_clip: '',
						},
						line_break_pass: {
							timeline: [],
							total: 0,
							event_clip: '',
						},
						dribbles: {
							timeline: [],
							total: 0,
							event_clip: '',
							completed: 0,
							skill_moves: 0,
							nut_megs: 0,
							failed: 0,
						},
						shots: {
							timeline: [],
							total: 0,
							event_clip: '',
							outsidebox_ontarget: 0,
							outsidebox_offtarget: 0,
							insidebox_offtarget: 0,
							insidebox_ontarget: 0,
						},
						crosses: {
							timeline: [],
							total: 0,
							event_clip: '',
						},
						goals: {
							timeline: [],
							total: 0,
							event_clip: '',
							header: 0,
							oneVone: 0,
							inside_box_shot_goal: 0,
							outside_box_shot_goal: 0,
						},
						assists: {
							timeline: [],
							total: 0,
							event_clip: '',
						},
						chance_created: {
							timeline: [],
							total: 0,
							event_clip: '',
						},
						freeKick: {
							timeline: [],
							total: 0,
							event_clip: '',
							off_target: 0,
							on_target: 0,
						},
						penalty: {
							timeline: [],
							total: 0,
							event_clip: '',
							missed: 0,
							scored: 0,
						},
						fouls: {
							timeline: [],
							total: 0,
							event_clip: '',
							won_in_opp_half: 0,
							won_in_own_half: 0,
							conceded_in_own_half: 0,
							conceded_in_opp_half: 0,
						},
						interceptions: {
							timeline: [],
							total: 0,
							event_clip: '',
							opponents_half: 0,
							own_half: 0,
						},
						tackles: {
							timeline: [],
							total: 0,
							event_clip: '',
							successful: 0,
							unsuccessful: 0,
						},
						ball_progression: {
							timeline: [],
							total: 0,
							event_clip: '',
							own_half: 0,
							opp_half: 0,
						},
						blocks: {
							timeline: [],
							total: 0,
							event_clip: '',
						},
						clearance: {
							timeline: [],
							total: 0,
							event_clip: '',
							goal_line: 0,
							under_pressure: 0,
						},
						duels: {
							timeline: [],
							total: 0,
							event_clip: '',
							won_aerial: 0,
							won_ground: 0,
						},
						saves: {
							timeline: [],
							total: 0,
							event_clip: '',
							oneVone: 0,
							inside_box: 0,
							outside_box: 0,
						},
						card: {
							timeline: [],
							total: 0,
							event_clip: '',
							yellow_dissent: 0,
							yellow_foul: 0,
							red_dissent: 0,
							red_foul: 0,
						},
						catches: {
							timeline: [],
							total: 0,
							event_clip: '',
							simple: 0,
							complex: 0,
						},
					};

					console.log(allEventsFilteredByPlayer);
					for (const singleEvent of allEventsFilteredByPlayer) {
						const eventEvent = singleEvent.event;
						const eventOutcome = singleEvent.outcome;
						const eventType = singleEvent.type;
						const timeline = {
							start_time: singleEvent.start_time,
							stop_time: singleEvent.stop_time,
						};
						const assist = singleEvent.assist;

						if (eventType === events[0].type) {
							allData.match.total_passes++;

							if (player.team === 'A') allData.match.total_home_team_passes++;
							if (player.team === 'B') allData.match.total_away_team_passes++;

							if (
								eventEvent === events[0].events[0] &&
								eventOutcome === events[0].outcomes[0]
							) {
								singlePlayerEvent.successful_longpass.total++;
								singlePlayerEvent.successful_longpass.timeline.push(timeline);

								continue;
							}

							if (
								eventEvent === events[0].events[1] &&
								eventOutcome === events[0].outcomes[0]
							) {
								singlePlayerEvent.line_break_pass.total++;
								singlePlayerEvent.line_break_pass.timeline.push(timeline);

								continue;
							}

							if (
								eventEvent === events[0].events[2] &&
								eventOutcome === events[0].outcomes[0]
							) {
								singlePlayerEvent.successful_shortpass.total++;
								singlePlayerEvent.successful_shortpass.timeline.push(timeline);

								continue;
							}

							continue;
						}

						if (eventType === events[1].type) {
							singlePlayerEvent.dribbles.total++;
							singlePlayerEvent.dribbles.timeline.push(timeline);
							allData.match.total_dribbles++;

							if (player.team === 'A') allData.match.total_home_team_dribbles++;
							if (player.team === 'B') allData.match.total_away_team_dribbles++;

							if (
								eventEvent === events[1].events[0] &&
								eventOutcome === events[1].outcomes[0]
							) {
								singlePlayerEvent.dribbles.skill_moves++;
								singlePlayerEvent.dribbles.completed++;
								continue;
							}

							if (
								eventEvent === events[1].events[1] &&
								eventOutcome === events[1].outcomes[0]
							) {
								singlePlayerEvent.dribbles.nut_megs++;
								singlePlayerEvent.dribbles.completed++;
								continue;
							}

							singlePlayerEvent.dribbles.failed++;
							continue;
						}

						if (eventType === events[2].type) {
							singlePlayerEvent.shots.total++;
							singlePlayerEvent.shots.timeline.push(timeline);
							allData.match.total_shots++;

							if (
								eventEvent === events[2].events[0] &&
								eventOutcome === events[2].outcomes[0]
							) {
								singlePlayerEvent.shots.outsidebox_ontarget++;
								allData.match.total_shots_on_target++;

								if (player.team === 'A')
									allData.match.total_home_team_shots_on_target++;

								if (player.team === 'B')
									allData.match.total_away_team_shots_on_target++;

								continue;
							}

							if (
								eventEvent === events[2].events[0] &&
								eventOutcome === events[2].outcomes[1]
							) {
								singlePlayerEvent.shots.outsidebox_offtarget++;
								continue;
							}

							if (
								eventEvent === events[2].events[1] &&
								eventOutcome === events[2].outcomes[0]
							) {
								singlePlayerEvent.shots.insidebox_ontarget++;

								if (player.team === 'A')
									allData.match.total_home_team_shots_on_target++;

								if (player.team === 'B')
									allData.match.total_away_team_shots_on_target++;

								continue;
							}

							if (
								eventEvent === events[2].events[1] &&
								eventOutcome === events[2].outcomes[1]
							) {
								singlePlayerEvent.shots.insidebox_offtarget++;
								continue;
							}

							if (player.team === 'A') allData.match.total_home_team_shots++;

							if (player.team === 'B') allData.match.total_away_team_shots++;

							continue;
						}

						if (eventType === events[3].type) {
							singlePlayerEvent.crosses.total++;
							singlePlayerEvent.crosses.timeline.push(timeline);
							allData.match.total_corners++;

							if (player.team === 'A') allData.match.total_home_team_corners++;

							if (player.team === 'B') allData.match.total_away_team_corners++;

							continue;
						}

						if (eventType === events[4].type) {
							singlePlayerEvent.goals.total++;
							singlePlayerEvent.goals.timeline.push(timeline);
							allData.match.total_goals++;

							if (player.team === 'A') allData.match.total_home_team_goals++;
							if (player.team === 'B') allData.match.total_away_team_goals++;

							if (player.team === 'A') allData.match.home_team_goals.total++;
							if (player.team === 'B') allData.match.away_team_goals.total++;

							const goal_event = {
								minute: '',
								goal_scored_by: {
									id: `${player.player_id}`,
									first_name: `${player.first_name}`,
									last_name: `${player.last_name}`,
									own_goal: '',
								},
								goal_assisted_by: {
									id: `${assist === undefined ? '' : assist.player_id}`,
									first_name: `${
										assist === undefined ? '' : player.first_name
									}`,
									last_name: `${assist === undefined ? '' : player.last_name}`,
								},
							};

							if (player.team === 'A')
								allData.match.home_team_goals.goal_event.push(goal_event);
							if (player.team === 'B')
								allData.match.away_team_goals.goal_event.push(goal_event);

							if (
								eventEvent === events[4].events[0] &&
								eventOutcome === events[4].outcomes[0]
							) {
								singlePlayerEvent.goals.header++;
								continue;
							}

							if (
								eventEvent === events[4].events[1] &&
								eventOutcome === events[4].outcomes[0]
							) {
								singlePlayerEvent.goals.oneVone++;
								continue;
							}

							if (
								eventEvent === events[4].events[2] &&
								eventOutcome === events[4].outcomes[0]
							) {
								singlePlayerEvent.goals.outside_box_shot_goal++;
								continue;
							}

							if (
								eventEvent === events[4].events[3] &&
								eventOutcome === events[4].outcomes[0]
							) {
								singlePlayerEvent.goals.inside_box_shot_goal++;

								if (player.team === 'A') allData.match.team_A_Scoreline++;

								if (player.team === 'B') allData.match.team_B_Scoreline++;

								continue;
							}

							continue;
						}

						if (eventType === events[5].type) {
							singlePlayerEvent.assists.total++;
							singlePlayerEvent.assists.timeline.push(timeline);
							allData.match.total_assists++;

							if (player.team === 'A') allData.match.total_home_team_assists++;
							if (player.team === 'B') allData.match.total_away_team_assists++;

							continue;
						}

						if (eventType === events[6].type) {
							singlePlayerEvent.chance_created.total++;
							singlePlayerEvent.chance_created.timeline.push(timeline);
							allData.match.total_chances_created++;

							if (player.team === 'A')
								allData.match.total_home_team_chances_created++;
							if (player.team === 'B')
								allData.match.total_away_team_chances_created++;

							continue;
						}

						if (eventType === events[7].type) {
							singlePlayerEvent.freeKick.total++;
							singlePlayerEvent.freeKick.timeline.push(timeline);
							allData.match.total_freekicks++;

							if (player.team === 'A')
								allData.match.total_home_team_freekicks++;
							if (player.team === 'B')
								allData.match.total_away_team_freekicks++;

							if (eventOutcome === events[7].events[0]) {
								singlePlayerEvent.freeKick.on_target++;
								continue;
							}

							if (eventOutcome === events[7].events[1]) {
								singlePlayerEvent.freeKick.off_target++;
								continue;
							}

							continue;
						}

						if (eventType === events[8].type) {
							singlePlayerEvent.penalty.total++;
							singlePlayerEvent.penalty.timeline.push(timeline);
							allData.match.total_penalty++;

							if (player.team === 'A') allData.match.total_home_team_penalty++;
							if (player.team === 'B') allData.match.total_away_team_penalty++;

							if (eventEvent === events[8].events[0]) {
								singlePlayerEvent.penalty.missed++;
								continue;
							}

							if (eventEvent === events[8].events[1]) {
								singlePlayerEvent.penalty.scored++;
								continue;
							}

							continue;
						}

						if (eventType === events[9].type) {
							singlePlayerEvent.fouls.total++;
							singlePlayerEvent.fouls.timeline.push(timeline);
							allData.match.total_fouls++;

							if (player.team === 'A') allData.match.total_home_team_fouls++;
							if (player.team === 'B') allData.match.total_away_team_fouls++;

							if (
								eventEvent === events[9].events[0] &&
								eventOutcome === events[9].outcomes[0]
							) {
								singlePlayerEvent.fouls.won_in_opp_half++;
								continue;
							}

							if (
								eventEvent === events[9].events[0] &&
								eventOutcome === events[9].outcomes[1]
							) {
								singlePlayerEvent.fouls.conceded_in_opp_half++;
								continue;
							}

							if (
								eventEvent === events[9].events[1] &&
								eventOutcome === events[9].outcomes[0]
							) {
								singlePlayerEvent.fouls.won_in_own_half++;
								continue;
							}

							if (
								eventEvent === events[9].events[1] &&
								eventOutcome === events[9].outcomes[1]
							) {
								singlePlayerEvent.fouls.conceded_in_own_half++;
								continue;
							}

							continue;
						}

						if (eventType === events[10].type) {
							singlePlayerEvent.interceptions.total++;
							singlePlayerEvent.interceptions.timeline.push(timeline);
							allData.match.total_interceptions++;

							if (player.team === 'A')
								allData.match.total_home_team_interceptions++;
							if (player.team === 'B')
								allData.match.total_away_team_interceptions++;

							if (eventEvent === events[10].events[0]) {
								singlePlayerEvent.interceptions.opponents_half++;
								continue;
							}

							if (eventEvent === events[10].events[1]) {
								singlePlayerEvent.interceptions.own_half++;
								continue;
							}

							continue;
						}

						if (eventType === events[11].type) {
							singlePlayerEvent.tackles.total++;
							singlePlayerEvent.tackles.timeline.push(timeline);
							allData.match.total_tackles++;

							if (player.team === 'A') allData.match.total_home_team_tackles++;
							if (player.team === 'B') allData.match.total_away_team_tackles++;

							if (eventEvent === events[11].events[0]) {
								singlePlayerEvent.tackles.successful++;
								continue;
							}

							if (eventEvent === events[11].events[1]) {
								singlePlayerEvent.tackles.unsuccessful++;
								continue;
							}

							continue;
						}

						if (eventType === events[12].type) {
							singlePlayerEvent.ball_progression.total++;
							singlePlayerEvent.ball_progression.timeline.push(timeline);
							allData.match.total_ball_progressions++;

							if (player.team === 'A')
								allData.match.total_home_team_ball_progressions++;
							if (player.team === 'B')
								allData.match.total_away_team_ball_progressions++;

							if (eventEvent === events[12].events[0]) {
								singlePlayerEvent.ball_progression.opp_half++;
								continue;
							}

							if (eventEvent === events[12].events[1]) {
								singlePlayerEvent.ball_progression.own_half++;
								continue;
							}

							continue;
						}

						if (eventType === events[13].type) {
							singlePlayerEvent.blocks.total++;
							singlePlayerEvent.blocks.timeline.push(timeline);
							allData.match.total_blocks++;

							if (player.team === 'A') allData.match.total_home_team_blocks++;
							if (player.team === 'B') allData.match.total_away_team_blocks++;

							continue;
						}

						if (eventType === events[14].type) {
							singlePlayerEvent.clearance.total++;
							singlePlayerEvent.clearance.timeline.push(timeline);
							allData.match.total_clearances++;

							if (player.team === 'A')
								allData.match.total_home_team_clearances++;
							if (player.team === 'B')
								allData.match.total_away_team_clearances++;

							if (eventEvent === events[14].events[0]) {
								singlePlayerEvent.clearance.goal_line++;
								continue;
							}

							if (eventEvent === events[14].events[1]) {
								singlePlayerEvent.clearance.under_pressure++;
								continue;
							}

							continue;
						}

						if (eventType === events[15].type) {
							singlePlayerEvent.duels.total++;
							singlePlayerEvent.duels.timeline.push(timeline);
							allData.match.total_duels++;

							if (player.team === 'A') allData.match.total_home_team_duels++;
							if (player.team === 'B') allData.match.total_away_team_duels++;

							if (eventEvent === events[15].events[0]) {
								singlePlayerEvent.duels.won_aerial++;
								continue;
							}

							if (eventEvent === events[15].events[1]) {
								singlePlayerEvent.duels.won_ground++;
								continue;
							}

							continue;
						}

						if (eventType === events[16].type) {
							singlePlayerEvent.saves.total++;
							singlePlayerEvent.saves.timeline.push(timeline);
							allData.match.total_saves++;

							if (player.team === 'A') allData.match.total_home_team_saves++;
							if (player.team === 'B') allData.match.total_away_team_saves++;

							if (eventEvent === events[16].events[0]) {
								singlePlayerEvent.saves.oneVone++;
								continue;
							}

							if (eventEvent === events[16].events[1]) {
								singlePlayerEvent.saves.inside_box++;
								continue;
							}

							if (eventEvent === events[16].events[2]) {
								singlePlayerEvent.saves.outside_box++;
								continue;
							}

							continue;
						}

						if (eventType === events[17].type) {
							singlePlayerEvent.card.total++;
							singlePlayerEvent.card.timeline.push(timeline);
							allData.match.total_cards++;

							if (player.team === 'A') allData.match.total_home_team_cards++;
							if (player.team === 'B') allData.match.total_away_team_cards++;

							if (
								eventEvent === events[17].events[0] &&
								eventOutcome === events[17].outcomes[0]
							) {
								singlePlayerEvent.card.red_dissent++;

								if (player.team === 'A')
									allData.match.total_home_team_red_cards++;
								if (player.team === 'B')
									allData.match.total_away_team_red_cards++;

								allData.match.total_red_cards++;

								continue;
							}

							if (
								eventEvent === events[17].events[0] &&
								eventOutcome === events[17].outcomes[1]
							) {
								singlePlayerEvent.card.yellow_dissent++;

								if (player.team === 'A')
									allData.match.total_home_team_yellow_cards++;
								if (player.team === 'B')
									allData.match.total_away_team_yellow_cards++;
								allData.match.total_yellow_cards++;

								continue;
							}

							if (
								eventEvent === events[17].events[1] &&
								eventOutcome === events[17].outcomes[0]
							) {
								singlePlayerEvent.card.red_foul++;

								if (player.team === 'A')
									allData.match.total_home_team_red_cards++;
								if (player.team === 'B')
									allData.match.total_away_team_red_cards++;

								allData.match.total_red_cards++;

								continue;
							}

							if (
								eventEvent === events[17].events[1] &&
								eventOutcome === events[17].outcomes[1]
							) {
								singlePlayerEvent.card.yellow_foul++;

								if (player.team === 'A')
									allData.match.total_home_team_yellow_cards++;
								if (player.team === 'B')
									allData.match.total_away_team_yellow_cards++;

								allData.match.total_yellow_cards++;

								continue;
							}

							continue;
						}

						if (eventType === events[18].type) {
							singlePlayerEvent.catches.total++;
							singlePlayerEvent.catches.timeline.push(timeline);
							allData.match.total_catches++;

							if (player.team === 'A') allData.match.total_home_team_catches++;
							if (player.team === 'B') allData.match.total_away_team_catches++;

							if (eventEvent === events[18].events[0]) {
								singlePlayerEvent.catches.simple++;
								continue;
							}

							if (eventEvent === events[18].events[1]) {
								singlePlayerEvent.catches.complex++;
								continue;
							}

							continue;
						}
					}

					allData.events.push(singlePlayerEvent);
				}

				return resolved(allData);
			} catch (reason) {
				return rejected(reason);
			}
		});
	};
}
