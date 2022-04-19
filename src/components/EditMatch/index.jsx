import React, { useState } from 'react';
import { Hero, Button, AddMatch } from '../../components';
import { BackArrow } from '../../components/Button/styles';
import * as ROUTES from '../../constants/routes';
import { MySelect } from '../../components/AddMatch/styles';
import DatePicker from 'react-datepicker';
import TimeKeeper from 'react-timekeeper';
import styled from 'styled-components';

export const MyTimeKeeper = styled(TimeKeeper)``;

const EditMatch = () => {
	const [competition, setCompetition] = useState('');
	const [stadium, setStadium] = useState('');
	const [season, setSeason] = useState(null);

	const [startDate, setStartDate] = useState(new Date());
	const [homeTeam, setHomeTeam] = useState('');
	const [showTime, setShowTime] = useState(false);

	const [time, setTime] = useState('22:50');
	const [awayTeam, setAwayTeam] = useState('');

	const disabled =
		!competition ||
		!stadium ||
		!season ||
		!startDate ||
		!homeTeam ||
		!time ||
		!awayTeam;

	return (
		<>
			<Hero>
				<Button>
					<Button.Inner>
						<Button.TxtContainer>
							<Hero.Text>Edit Match</Hero.Text>
						</Button.TxtContainer>

						<Button.ButtonLink to={ROUTES.MATCHFIXTURES}>
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
												onChange={setCompetition}
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
												onChange={setSeason}
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
												onChange={setHomeTeam}
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
												value={awayTeam}
												onChange={setAwayTeam}
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
									SAVE
								</AddMatch.ScheduleMatchButton>
								{disabled ? (
									<AddMatch.Button disabled={disabled}>PROCEED</AddMatch.Button>
								) : (
									<AddMatch.ProceedButton to={ROUTES.MATCHFIXTURES}>
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

export default EditMatch;
