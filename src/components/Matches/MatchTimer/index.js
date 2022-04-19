import React, { useState, useRef, useEffect, useContext } from 'react';
import { useStopwatch } from 'react-timer-hook';
import './style.scss';
import { Col, Row } from 'react-bootstrap';

import axios from '../../../helpers/axios';
import media from '../../../assets/media.mp4';
import styled from 'styled-components';
import ReactPlayer from 'react-player';
import { ToastContainer, toast } from 'react-toastify';
import { PlayersContext } from '../../../context/Players';
import { CreateModalContext } from '../../../context/Modal';

const UploadButton = styled.button`
	position: relative;
	cursor: pointer;
`;

const UploadFile = styled.input`
	opacity: 0;
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
`;

export default function MatchTimer({
	expiryTimestamp,
	onStart,
	onPause,
	onResume,
	onStop,
	onRestart,
	onAlreadyStarted,
	timeElapsed,
	onDelete,
	onFinish,
}) {
	const {
		seconds,
		minutes,
		hours,
		days,
		isRunning,
		start,
		pause,
		resume,
		reset,
	} = useStopwatch({
		autoStart: false,
		expiryTimestamp,
		onExpire: () => console.warn('onExpire called'),
	});

	const { videoFile, setVideoFile, selected, setSelected } =
		useContext(PlayersContext);

	const { setSpinner } = useContext(CreateModalContext);

	const [duration, setDuration] = useState('00:00:00');

	useEffect(() => {
		if (videoFile !== null) {
			setSpinner(true);
			const data = new FormData();
			data.append('footage', videoFile);
			axios
				.post('/match/footage', data)
				.then((response) => {
					setSpinner(false);
					setVideoFile(null);
					setSelected(response.data.data);
					toast.success('Video has been successfully uploaded');
				})
				.catch((error) => {
					setSpinner(false);
					toast.error(
						'Something went wrong while uploading video, try again later'
					);
					console.log(error);
				});
		}
	}, [videoFile]);

	const handleChange = (e) => {
		e.preventDefault();

		setVideoFile(e.target.files[0]);
		const file = new FileReader();
		file.onload = () => {
			if (file.readyState === 2) {
				setSelected(file.result);
			}
		};

		file.readAsDataURL(e.target.files[0]);
	};

	const reactPlayerRef = useRef(null);

	const [isPaused, setIsPaused] = useState(false);

	const onHandlePause = () => {
		pause();
		setIsPaused(true);
	};

	const onHandlePlay = () => {
		if (isRunning) {
			onAlreadyStarted();
		} else {
			start();
		}

		onStart();
		setIsPaused(false);
	};

	const onHandleStop = () => {
		const time = new Date();
		time.setSeconds(0);
		reset(time, false);
		onStop();
	};

	const onHandleFinish = () => {
		onFinish();
		onHandleStop();
	};

	const onHandleDelete = () => {
		onDelete();
		onHandleStop();
	};

	const secondsToTime = (duration) => {
		let h = Math.floor(duration / 3600)
			.toString()
			.padStart(2, 0);
		let m = Math.floor((duration % 3600) / 60)
			.toString()
			.padStart(2, 0);
		let s = Math.floor(duration % 60)
			.toString()
			.padStart(2, 0);

		return `${h}:${m}:${s}`;
	};

	return (
		<React.Fragment>
			<ToastContainer />
			<div>
				<Row>
					<Col lg='8' md='8'>
						<div
							style={{
								borderRadius: '2px',
								border: '1px solid #D8D8D8',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								flexDirection: 'column',
								padding: '10px 0',
							}}>
							<span className='text-muted' style={{ fontSize: '14px' }}>
								<i className='mdi mdi-timer-outline mr-2' />
								Match Timer
							</span>

							<h6
								className='text-center'
								style={{
									fontSize: '50px',
									textAlign: 'center',
									fontWeight: '500',
									margin: '0',
								}}>
								{duration}
								{timeElapsed(duration)}
							</h6>
						</div>
					</Col>

					<Col lg='4' md='4'>
						<div className='d-flex flex-column justify-content-between'>
							<button
								onClick={() => {
									onHandleFinish();
								}}
								className='mb-3 btn py-3'
								style={{
									color: '#fff',
									fontWeight: '500',
									backgroundColor: '#2B52BA',
									fontSize: '15px',
								}}>
								FINISH
							</button>

							<button
								onClick={() => {
									onHandleDelete();
								}}
								className='btn'
								style={{
									color: '#fff',
									backgroundColor: '#FF6D55',
								}}>
								Delete Tagging
							</button>
						</div>
					</Col>
				</Row>
			</div>

			<div className={'rPlayer'}>
				<ReactPlayer
					controls={true}
					ref={reactPlayerRef}
					onPlay={() => {
						start();
						if (isPaused) {
							onHandlePlay();
						}
					}}
					onPause={() => {
						pause();
						onHandlePause();
					}}
					onStop={() => {
						onHandleStop();
					}}
					onBuffer={(buffer) => {
						console.log('buffer', buffer);
					}}
					height='242px'
					width='375px'
					onProgress={(pro) => {
						setDuration(secondsToTime(pro.playedSeconds.toFixed(0)));
					}}
					url='https://www.youtube.com/watch?v=iLV2-JHIblI&list=RDiLV2-JHIblI&start_radio=1'
				/>
			</div>

			<div className='text-center align-items-center' id={'timer-div'}>
				<span
					onClick={() => {
						onHandlePlay();
					}}
					style={{ maxWidth: '77px' }}
					className='btn btn-success py-1 px-2 primary-btn-success mr-1'>
					<i className='mdi mdi-play' />
					<small className='py-1 px-2'>Play</small>
				</span>

				<span
					onClick={() => {
						onHandlePause();
					}}
					style={{ maxWidth: '77px' }}
					className='btn py-1 btn-warning px-2 primary-btn-warning mr-1'>
					<i className='mdi mdi-pause' />
					<small className='py-1 px-2'>Pause</small>
				</span>

				<span
					onClick={() => {
						onHandleStop();
					}}
					className='btn btn-danger py-1 px-2 primary-btn-danger mr-1'
					style={{ maxWidth: '77px' }}>
					<i className='mdi mdi-stop' />
					<small className='py-1 px-2'>Stop</small>
				</span>

				<UploadButton className='btn py-1 px-1 mr-1' id={'timer-upload'}>
					<UploadFile type='file' accept='video/*' onChange={handleChange} />
					<i className='mdi mdi-upload' />

					<span
						className='py-1 px-3'
						style={{ fontSize: '10px', color: '#898A8D' }}>
						{'upload footage'}
					</span>
				</UploadButton>
			</div>
		</React.Fragment>
	);
}
