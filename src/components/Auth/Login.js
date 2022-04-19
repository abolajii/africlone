import React, { useState, useEffect } from 'react';
import { useUser } from '../../store/contexts/user';
import { loginUser } from '../../services/auth.service';
import { useHistory } from 'react-router-dom';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Overlay } from 'react-portal-overlay';
import ClipLoader from 'react-spinners/ClipLoader';
import { css } from '@emotion/core';
import '../../styles/login.scss';

const override = css`
	display: block;
	margin: 0 auto;
	border-color: 'red';
`;

const bodyCenter = {
	'padding-top': '150px',
	'padding-bottom': '40px',
};

const STATUS = {
	IDLE: 'IDLE',
	SUBMITTED: 'SUBMITTED',
	SUBMITTING: 'SUBMITTING',
	COMPLETED: 'COMPLETED',
};

const loginDetails = {
	email: '',
	password: '',
};

export default function Login() {
	const { dispatch } = useUser();
	const [login, setLogin] = useState(loginDetails);
	const [status, setStatus] = useState(STATUS.IDLE);
	const [networkError, setNetworkError] = useState(null);
	const [loadingSpinner, setLoadingSpinner] = useState(false);
	const history = useHistory();

	// DERIVED STATE
	const errors = getErrors(login);
	const isValid = Object.keys(errors).length === 0;

	function handleChange(e) {
		e.persist();
		setLogin((currentLogin) => {
			return {
				...currentLogin,
				[e.target.id]: e.target.value,
			};
		});
	}

	useEffect(() => {
		let data = localStorage.getItem('user');

		if (data !== null && data.length > 3) {
			history.push('/matches');
		}
	}, [history]);

	const CustomSpinner = () => {
		return (
			<Overlay
				className='modal'
				closeOnClick={true}
				open={loadingSpinner}
				onClose={() => {
					setLoadingSpinner(false);
				}}>
				<ClipLoader css={override} size={50} color={'#123abc'} loading={true} />
			</Overlay>
		);
	};

	async function handleSubmit(event) {
		event.preventDefault();
		setStatus(STATUS.SUBMITTING);
		if (isValid) {
			setLoadingSpinner(true);
			loginUser(login)
				.then((response) => response.json())
				.then((data) => {
					setLoadingSpinner(false);

					console.log(data);
					let user = data.data.user;
					if (data.statuscode === 200) {
						dispatch({
							type: 'add',
							name: `${user.firstname} ${user.lastname}`,
							token: user.jwt_token,
						});
						history.push('/matches');
					} else {
						setNetworkError(data.message);
					}
				})
				.catch((reason) => {
					setLoadingSpinner(false);
					setNetworkError(`${reason}`);
				});
			setStatus(STATUS.COMPLETED);
		} else {
			setStatus(STATUS.SUBMITTED);
		}
	}

	function getErrors(login) {
		const result = {};
		if (!login.email) result.email = 'Email is required';
		if (!login.password) result.password = 'Password is required';
		return result;
	}

	return (
		<body style={bodyCenter} className='container h-100'>
			<div className='row h-100 justify-content-center align-items-center'>
				<div className='col-10 col-md-8 col-lg-6 align-self-center'>
					<form onSubmit={handleSubmit}>
						<h3>Sign In</h3>
						{networkError !== null && status === STATUS.COMPLETED && (
							<div role='alert'>
								<ul style={{ color: 'red' }} key='password'>
									{networkError}
								</ul>
							</div>
						)}
						<div className='form-group'>
							<label>Email address</label>
							<input
								id='email'
								value={login.email}
								type='email'
								onChange={handleChange}
								className='form-control'
								placeholder='Enter email'
							/>
							{!isValid && status === STATUS.SUBMITTED && (
								<div role='alert'>
									<ul style={{ color: 'red' }} key='email'>
										{errors.email}
									</ul>
								</div>
							)}
						</div>

						<div className='form-group'>
							<label>Password</label>
							<input
								id='password'
								value={login.password}
								type='password'
								onChange={handleChange}
								className='form-control'
								placeholder='Enter password'
							/>
							{!isValid && status === STATUS.SUBMITTED && (
								<div role='alert'>
									<ul style={{ color: 'red' }} key='password'>
										{errors.password}
									</ul>
								</div>
							)}
						</div>

						<button
							disabled={status === STATUS.SUBMITTING}
							type='submit'
							className='btn btn-primary btn-block'>
							Submit
						</button>
						<br />
					</form>
				</div>
			</div>
			<CustomSpinner />
		</body>
	);
}
