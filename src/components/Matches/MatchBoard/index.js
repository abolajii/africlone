import React from 'react';
import './style.scss';
import { Col, Row, Form } from 'react-bootstrap';
import { PlayersContext } from '../../../context/Players';
import { useContext } from 'react';

const MatchBoard = ({ home, time, matchDetails, away }) => {
	const { homeScore, awayScore } = useContext(PlayersContext);

	const nameHome = home && home.name ? home.name : 'Team Home';
	const nameAway = away && away.name ? away.name : 'Team Away';

	const logoHome = home && home.logo && home.logo !== '' ? home.logo : '';

	const logoAway = away && away.logo && away.logo !== '' ? away.logo : '';

	const detailStyle = {
		display: 'flex',
		flexDirection: 'column',
	};

	const scoreStyle = {
		backgroundColor: '#2B52BA',
		width: 100.29,
		height: 48.1,
	};

	const logoStyle = {
		overflow: 'hidden',
		alignItems: 'center',
		width: '100%',
		height: '90px',
	};

	const possibleFormations = [
		'4-4-2',
		'4-3-3',
		'4-5-1',
		'4-3-4',
		'3-5-2',
		'5-4-1',
	];

	const Formations = ({ color, position }) => {
		return (
			<div
				className='col-6'
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-around',
				}}>
				<p
					style={{
						color: color,
						width: '30px',
						fontSize: '12px',
						fontWeight: '500',
					}}>
					{position}
				</p>
				<div style={{ width: '7em' }}>
					<Form.Control as='select' style={{ padding: '0' }}>
						{possibleFormations.map((e) => (
							<option value={e}>{e}</option>
						))}
					</Form.Control>
				</div>
			</div>
		);
	};

	return (
		<React.Fragment>
			<div className='d-flex flex-column'>
				<div>
					<Row>
						<Col>
							<div style={detailStyle}>
								<span>
									<img
										resizeMode={'cover'}
										style={logoStyle}
										src={logoHome}
										alt={'club-logo'}
									/>
								</span>

								<p
									className='text-center pt-4'
									style={{
										fontSize: '14px',
									}}>
									{nameHome}
								</p>
							</div>
						</Col>

						<Col>
							<div className='d-flex flex-column'>
								<div style={scoreStyle}>
									<div className='d-flex justify-content-around align-middle mt-2 '>
										<div>
											<h2 style={{ color: '#fff' }}>{homeScore}</h2>
										</div>

										<div>
											<div
												className='mt-1'
												style={{
													borderLeft: '2px solid #FFFFFF',
													height: '24.56px',
													opacity: '40%',
												}}
											/>
										</div>

										<div>
											<h2 style={{ color: '#fff' }}>{awayScore}</h2>
										</div>
									</div>
								</div>
								<div className='text-center'>
									<p
										style={{ fontSize: '14px', fontWeight: '500' }}
										className='mt-2 mb-0'>
										{time}
									</p>

									<p
										style={{ fontSize: '14px', fontWeight: '500' }}
										className=''>
										{matchDetails?.name}
									</p>
								</div>
							</div>
						</Col>

						<Col>
							<div style={detailStyle}>
								<span style={logoStyle}>
									<img src={logoAway} alt={'club-logo'} />
								</span>
								<p
									className='text-center pt-4'
									style={{
										fontSize: '14px',
									}}>
									{nameAway}
								</p>
							</div>
						</Col>
					</Row>
				</div>

				<div className='row my-3'>
					<Formations color={'#FE4302'} position={'Home Team'} />
					<Formations color={'#2B52BA'} position={'Away Team'} />
				</div>
			</div>
		</React.Fragment>
	);
};

export default MatchBoard;
