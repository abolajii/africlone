import React, { useState, useEffect, useContext } from 'react';
import { Hero, Button, AddMatch } from '../components';
import { BackArrow } from '../components/Button/styles';
import * as ROUTES from '../constants/routes';
import { MySelect, MyTimeKeeper } from '../components/AddMatch/styles';
import DatePicker from 'react-datepicker';
import axios from '../helpers/axios';
import { CreateModalContext } from '../context/Modal';
import { useHistory } from 'react-router-dom';

const AddMatchContainer = () => {
	const history = useHistory();

	const [id, setID] = useState(null);
	const [teamId, setTeamId] = useState(null);
	const [seasonId, setSeasonID] = useState(null);

	const { setSpinner } = useContext(CreateModalContext);

	useEffect(() => {
		axios
			.get('/competition')
			.then((response) => {
				const competitionsOption = response.data?.data.map((each) => {
					return { value: each.name, label: each.name, id: each._id };
				});
				setCompetitions(competitionsOption);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	useEffect(() => {
		axios
			.get(`/competition/season/${id}`)
			.then((response) => {
				const season = response.data.data?.map((each) => {
					return {
						value: each.season_name,
						label: each.season_name,
						id: each._id,
					};
				});
				setSeasons(season);
			})
			.catch((err) => console.log(err));
	}, [id]);

	useEffect(() => {
		axios
			.get(`/competition/season/season/${seasonId}`)
			.then((response) => {
				const teams = response.data.data.teams?.map((each) => {
					return {
						value: each.name,
						label: each.name,
						id: each._id,
						logo: each.logo,
						team_id: each.team_id,
					};
				});
				setTeams(teams);
			})
			.catch((err) => console.log(err));
	}, [seasonId]);

	const [competitions, setCompetitions] = useState([]);
	const [competition, setCompetition] = useState(null);

	const [stadium, setStadium] = useState('');
	const [seasons, setSeasons] = useState([]);
	const [season, setSeason] = useState(null);
	const [seasonName, setSeasonName] = useState('');

	const [teams, setTeams] = useState([]);

	const [homeTeam, setHomeTeam] = useState(null);
	const [awayTeam, setAwayTeam] = useState(null);
	const [showTime, setShowTime] = useState(false);

	const [time, setTime] = useState('22:50');
	const [startDate, setStartDate] = useState(new Date());

	const [matchId, setMatchId] = useState('');

	const disabled =
		!competition ||
		!stadium ||
		!season ||
		!startDate ||
		!homeTeam ||
		!time ||
		!awayTeam;

	const handleCompetition = (e) => {
		setCompetition(e);
		setID(e.id);
	};
	const handleSeasonSelect = (e) => {
		setSeason(e);
		setSeasonID(e.id);
		setSeasonName(e.value);
	};

	const handleTeamSelect = (e) => {
		setHomeTeam(e);
		setTeamId(e.id);
	};

	const handleTeamTwoSelect = (e) => {
		setAwayTeam(e);
	};

	const handleSubmit = (e) => {
		setSpinner(true);
		e.preventDefault();
		// alert('submit');
		// const data = {
		// 	startDate,
		// 	time,
		// 	competition,
		// 	season,
		// 	homeTeam,
		// 	awayTeam,
		// 	stadium,
		// };
		// console.log(startDate.toDateString());

		const data = {
			competition_season_id: season.id,
			home_team_id: homeTeam.team_id,
			away_team_id: awayTeam.team_id,
			stadium,
			isScheduled: true,
			date: startDate.toDateString(),
			time,
		};

		axios
			.post(`/match/create-match`, data)
			.then((res) => {
				setSpinner(false);
				setMatchId(res.data.match._id);
				history.push({
					pathname: '/matchfixture',
					search: `?c=${id}&home=${homeTeam.team_id}&away=${
						awayTeam.team_id
					}&m_id=${
						res.data.match._id
					}&d=${startDate.toDateString()}&sn=${seasonName}&s_id=${seasonId}`,
				});
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const secondTeam = teams?.filter((e) => e.id !== teamId);

	return (
		<>
			<Hero>
				<Button>
					<Button.Inner>
						<Button.TxtContainer>
							<Hero.Text>Add Match</Hero.Text>
						</Button.TxtContainer>

						<Button.ButtonLink to={ROUTES.MATCH}>
							<BackArrow />
							BACK
						</Button.ButtonLink>
					</Button.Inner>
				</Button>

				<AddMatch>
					<AddMatch.Box>
						<AddMatch.Inner>
							<AddMatch.Grid>
								<AddMatch.InputBox>
									<AddMatch.LabelAndInputContainer left>
										<AddMatch.Label>Choose Competition</AddMatch.Label>

										<AddMatch.InputContainer>
											<MySelect
												options={competitions}
												onChange={handleCompetition}
												value={competition}
												placeholder='Select Competition'
												styles={{
													control: () => ({
														backgroundColor: 'transparent',
														display: 'flex',
														height: 'inherit',
													}),
												}}
											/>
										</AddMatch.InputContainer>
									</AddMatch.LabelAndInputContainer>

									<AddMatch.LabelAndInputContainer left>
										<AddMatch.Label>Select Season</AddMatch.Label>

										<AddMatch.InputContainer>
											<MySelect
												placeholder='2019/2020'
												value={season}
												options={seasons}
												onChange={handleSeasonSelect}
												styles={{
													control: () => ({
														backgroundColor: 'transparent',
														display: 'flex',
														height: 'inherit',
													}),
												}}
											/>
										</AddMatch.InputContainer>
									</AddMatch.LabelAndInputContainer>
									<AddMatch.LabelAndInputContainer left>
										<AddMatch.Label>Choose Home Team</AddMatch.Label>

										<AddMatch.InputContainer>
											<MySelect
												value={homeTeam}
												options={teams}
												onChange={handleTeamSelect}
												placeholder='Select home team'
												styles={{
													control: () => ({
														backgroundColor: 'transparent',
														display: 'flex',
														height: 'inherit',
													}),
												}}
											/>
										</AddMatch.InputContainer>
									</AddMatch.LabelAndInputContainer>
									<AddMatch.LabelAndInputContainer left>
										<AddMatch.Label>Choose Away Team</AddMatch.Label>

										<AddMatch.InputContainer>
											<MySelect
												options={secondTeam}
												onChange={handleTeamTwoSelect}
												placeholder='Select away team'
												styles={{
													control: () => ({
														backgroundColor: 'transparent',
														display: 'flex',
														height: 'inherit',
													}),
												}}
											/>
										</AddMatch.InputContainer>
									</AddMatch.LabelAndInputContainer>
								</AddMatch.InputBox>
							</AddMatch.Grid>

							<AddMatch.Grid>
								<AddMatch.InputBox>
									<AddMatch.LabelAndInputContainer right>
										<AddMatch.Label>Stadium</AddMatch.Label>

										<AddMatch.InputContainer>
											<AddMatch.Input
												value={stadium}
												onChange={({ target: { value } }) => setStadium(value)}
												placeholder='Enter stadium name'
											/>
										</AddMatch.InputContainer>
									</AddMatch.LabelAndInputContainer>

									<AddMatch.LabelAndInputContainer right>
										<AddMatch.Label>Date</AddMatch.Label>

										<AddMatch.InputContainer>
											<DatePicker
												selected={startDate}
												onChange={(date) => {
													return setStartDate(date);
												}}
												// showTimeSelect
												// dateFormat='Pp'
											/>
										</AddMatch.InputContainer>
									</AddMatch.LabelAndInputContainer>
									<AddMatch.LabelAndInputContainer right>
										<AddMatch.Label>Time</AddMatch.Label>

										<AddMatch.InputContainer>
											<AddMatch.Input
												onClick={() => setShowTime(!showTime)}
												readOnly
												value={time}
											/>
											{showTime && (
												<MyTimeKeeper
													time={time}
													onChange={(data) => {
														setTime(data.formatted24);
													}}
												/>
											)}
										</AddMatch.InputContainer>
									</AddMatch.LabelAndInputContainer>
								</AddMatch.InputBox>
							</AddMatch.Grid>
						</AddMatch.Inner>
						<AddMatch.ButtonContainer>
							<AddMatch.ButtonInner>
								<AddMatch.ScheduleMatchButton disabled={disabled}>
									SCHEDULE MATCH
								</AddMatch.ScheduleMatchButton>
								{disabled ? (
									<AddMatch.Button disabled={disabled}>PROCEED</AddMatch.Button>
								) : (
									<AddMatch.ProceedButton type='submit' onClick={handleSubmit}>
										PROCEED
									</AddMatch.ProceedButton>
								)}
							</AddMatch.ButtonInner>
						</AddMatch.ButtonContainer>
					</AddMatch.Box>
				</AddMatch>
			</Hero>
		</>
	);
};

export default AddMatchContainer;
