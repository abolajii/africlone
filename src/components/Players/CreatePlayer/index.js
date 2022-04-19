import React, { useContext, useState } from 'react';
import { Hero, Button } from '../..';

import ReactCountryFlag from 'react-country-flag';
import {
	options,
	regionOptions,
} from '../../Competitions/CreateCompetition/data';

import * as ROUTES from '../../../constants/routes';
import { BackArrow } from '../../Button/styles';
import axios from '../../../helpers/axios';

import { useHistory } from 'react-router-dom';

import {
	Text,
	BoxOne,
	BoxTwo,
	Container,
	CreateButton,
	ButtonContainer,
	ImageContainer,
	Inner,
	FormContainer,
	ImageAndFileContainer,
	Nofile,
	TeamLabel,
	FormControl,
	Input,
	MySelect,
	ImageInput,
	ImageInputContainer,
	ImageLabel,
	Image,
	NumberInput,
} from './styles';
import { CreateModalContext } from '../../../context/Modal';

const formatOptionLabel = ({ value, label, customFlag }) => (
	<div style={{ display: 'flex' }}>
		<div style={{ marginRight: '10px' }}>{customFlag}</div>
		<div>{label}</div>
	</div>
);

const CreatePlayer = () => {
	const history = useHistory();

	const [selected, setSelected] = useState(null);
	const [selectedName, setSelectedName] = useState('');
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [dob, setDob] = useState('');
	const [playerRole, setPlayerRole] = useState('');
	const [region, setRegion] = useState(null);
	const [playerPosition, setPlayerPosition] = useState(null);
	const [playerHeight, setPlayerHeight] = useState('');
	const [agentName, setAgentName] = useState('');
	const [agentPhone, setAgentPhone] = useState();
	const [agentEmail, setAgentEmail] = useState('');
	const [playerWeight, setPlayerWeight] = useState('');
	const [preferredFoot, setPreferredFoot] = useState(null);
	const [nationality, setNationality] = useState(null);
	const [file, setFile] = useState(null);

	const { setSpinner } = useContext(CreateModalContext);

	const disabled =
		selected === null ||
		selectedName === '' ||
		file === null ||
		firstName === '' ||
		lastName === '' ||
		dob === '' ||
		agentName === '' ||
		!agentPhone ||
		agentEmail === '' ||
		playerPosition === null ||
		preferredFoot === null ||
		playerHeight === '' ||
		playerWeight === '' ||
		playerRole === null ||
		region === null ||
		nationality === null;

	//foot options
	const footOptions = [
		{
			value: 'Left',
			label: 'Left',
		},
		{ value: 'Right', label: 'Right' },
	];

	//position options
	const positionOptions = [
		{
			value: 'Goalkeeper',
			label: 'Goalkeeper',
		},
		{
			value: 'Defender',
			label: 'Defender',
		},
		{
			value: 'Midfielder',
			label: 'Midfielder',
		},
		{
			value: 'Forward',
			label: 'Forward',
		},
	];

	//role options
	const roleOptions = [
		{
			value: 'Goal Keeper ',
			label: 'Goal Keeper ',
		},
		{
			value: 'Right Back',
			label: 'Right Back',
		},
		{
			value: 'Left Back',
			label: 'Left Back',
		},
		{
			value: 'Center Back',
			label: 'Center Back',
		},
		{
			value: 'Defensive Midfielder',
			label: 'Defensive Midfielder',
		},
		{
			value: 'Central Midfielder',
			label: 'Central Midfielder',
		},
		{
			value: 'Attacking Midfielder',
			label: 'Attacking Midfielder',
		},
		{
			value: 'Left Winger',
			label: 'Left Winger',
		},
		{
			value: 'Right Winger',
			label: 'Right Winger',
		},
		{
			value: 'Right Midfielder',
			label: 'Right Midfielder',
		},
		{
			value: 'Left Midfielder',
			label: 'Left Midfielder',
		},
		{
			value: 'Supporting Striker',
			label: 'Supporting Striker',
		},
		{
			value: 'Center Forward ',
			label: 'Center Forward',
		},
	];

	function dynamicSort(property) {
		var sortOrder = 1;

		if (property[0] === '-') {
			sortOrder = -1;
			property = property.substr(1);
		}

		return function (a, b) {
			if (sortOrder == -1) {
				return b[property].localeCompare(a[property]);
			} else {
				return a[property].localeCompare(b[property]);
			}
		};
	}

	const sortOption = options.sort(dynamicSort('value'));

	const arrToFilter = sortOption.map((each) => {
		return {
			...each,
			customFlag: <ReactCountryFlag svg countryCode={each.countryCode} />,
		};
	});

	const newCountry = arrToFilter.filter((each) => each.link === region?.link);

	const handleChange = (e) => {
		setSelectedName(e.target.files[0].name);
		setFile(e.target.files[0]);
		const file = new FileReader();

		file.onload = () => {
			if (file.readyState === 2) {
				setSelected(file.result);
			}
		};

		file.readAsDataURL(e.target.files[0]);
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		setSpinner(true);

		const data = new FormData();

		data.append('first_name', firstName);
		data.append('last_name', lastName);
		data.append('position', playerPosition.value);
		data.append('role', playerRole);
		data.append('dob', dob);
		data.append('nationality', nationality.value);
		data.append('region', region.value);
		data.append('image', file);
		data.append('weight', playerWeight);
		data.append('height', playerHeight);
		data.append('agency_name', agentName);
		data.append('agency_email', agentEmail);
		data.append('agency_number', agentPhone);
		data.append('foot', preferredFoot.value);

		axios
			.post('/player/create', data)
			.then((response) => {
				setSpinner(false);
				history.push('/players');
			})
			.catch((error) => {
				setSpinner(false);
				console.log(error);
			});
	};

	return (
		<Hero>
			<Button>
				<Button.Inner>
					<Button.TxtContainer>
						<Hero.Text>Create Player</Hero.Text>
					</Button.TxtContainer>

					<Button.ButtonLink to={ROUTES.PLAYERS}>
						<BackArrow />
						BACK
					</Button.ButtonLink>
				</Button.Inner>
			</Button>
			<Container>
				<Inner onSubmit={handleSubmit}>
					<Text>Player Photo</Text>
					<ImageAndFileContainer>
						<ImageContainer>
							<Image src={selected} alt={selectedName} />
						</ImageContainer>
						<ImageInputContainer>
							<ImageInput
								onChange={handleChange}
								type='file'
								accept='image/*'
							/>
							{selectedName ? (
								<Nofile>{selectedName}</Nofile>
							) : (
								<Nofile>No file Added</Nofile>
							)}
							{!selectedName && <ImageLabel for='file'>Add Image</ImageLabel>}
						</ImageInputContainer>
					</ImageAndFileContainer>

					<FormContainer>
						<BoxOne>
							<FormControl>
								<TeamLabel>First Name</TeamLabel>
								<Input
									type='text'
									value={firstName}
									onChange={({ target }) => setFirstName(target.value)}
									placeholder='Enter first name'
								/>
							</FormControl>
							<FormControl>
								<TeamLabel>Date of Birth</TeamLabel>
								<Input
									type='date'
									value={dob}
									onChange={({ target }) => setDob(target.value)}
									placeholder='DD-MM-YY'
								/>
							</FormControl>
							<FormControl>
								<TeamLabel>Role</TeamLabel>

								<Input
									text='text'
									value={playerRole}
									onChange={({ target }) => setPlayerRole(target.value)}
									placeholder='Enter player role'
								/>
							</FormControl>
							<FormControl>
								<TeamLabel>Region</TeamLabel>

								<MySelect
									options={regionOptions}
									value={region}
									onChange={setRegion}
									styles={{
										control: () => ({
											backgroundColor: 'transparent',
											display: 'flex',
											height: 'inherit',
										}),
									}}
									placeholder='Select Region'
								/>
							</FormControl>
							<FormControl>
								<TeamLabel>Height</TeamLabel>
								<Input
									type='text'
									value={playerHeight}
									onChange={({ target }) =>
										setPlayerHeight(target.value.replace(/[^\d+$]/g, ''))
									}
									placeholder='Player height'
								/>
							</FormControl>
							<FormControl>
								<TeamLabel>Agency Name</TeamLabel>
								<Input
									type='text'
									value={agentName}
									onChange={({ target }) => setAgentName(target.value)}
									placeholder='Enter agency name'
								/>
							</FormControl>
							<FormControl>
								<TeamLabel>Agency Phone Number</TeamLabel>
								{/* <Input
									type='number'
									value={agentPhone}
									onChange={({ target }) => setAgentPhone(target.value)}
									placeholder='Enter agency phone number'
								/> */}
								<NumberInput
									placeholder='Enter phone number'
									value={agentPhone}
									onChange={setAgentPhone}
								/>
							</FormControl>
						</BoxOne>
						<BoxTwo>
							<FormControl>
								<TeamLabel>Last Name</TeamLabel>
								<Input
									type='text'
									value={lastName}
									onChange={({ target }) => setLastName(target.value)}
									placeholder='Enter last name'
								/>
							</FormControl>
							<FormControl>
								<TeamLabel>Position</TeamLabel>
								<MySelect
									options={positionOptions}
									value={playerPosition}
									onChange={setPlayerPosition}
									styles={{
										control: () => ({
											backgroundColor: 'transparent',
											display: 'flex',
											height: 'inherit',
										}),
									}}
									placeholder='Select player position'
								/>
							</FormControl>
							<FormControl>
								<TeamLabel>Preferred Foot</TeamLabel>
								<MySelect
									options={footOptions}
									value={preferredFoot}
									onChange={setPreferredFoot}
									styles={{
										control: () => ({
											backgroundColor: 'transparent',
											display: 'flex',
											height: 'inherit',
										}),
									}}
									placeholder='Select player preferred foot'
								/>
							</FormControl>
							<FormControl>
								<TeamLabel>Nationality</TeamLabel>
								<MySelect
									maxMenuHeight={190}
									options={newCountry}
									value={nationality}
									isDisabled={!region}
									onChange={setNationality}
									formatOptionLabel={formatOptionLabel}
									styles={{
										control: () => ({
											backgroundColor: 'transparent',
											display: 'flex',
											height: 'inherit',
										}),
									}}
									placeholder='Select player nationality'
								/>
							</FormControl>
							<FormControl>
								<TeamLabel>Weight</TeamLabel>
								<Input
									type='text'
									value={playerWeight}
									onChange={({ target }) =>
										setPlayerWeight(target.value.replace(/[^\d+$]/g, ''))
									}
									placeholder='Player weight'
								/>
							</FormControl>
							<FormControl>
								<TeamLabel>Agency Email</TeamLabel>
								<Input
									type='email'
									value={agentEmail}
									onChange={({ target }) => setAgentEmail(target.value)}
									placeholder='Enter agency email'
								/>
							</FormControl>
						</BoxTwo>
					</FormContainer>
					<ButtonContainer>
						<CreateButton disabled={disabled}>CREATE PLAYER</CreateButton>
					</ButtonContainer>
				</Inner>
			</Container>
		</Hero>
	);
};

export default CreatePlayer;
