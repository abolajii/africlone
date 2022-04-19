import React, { useContext, useState } from 'react';
import ReactCountryFlag from 'react-country-flag';
import { Hero, Button } from '../..';
import * as ROUTES from '../../../constants/routes';
import { BackArrow } from '../../Button/styles';
import {
	regionOptions,
	options,
} from '../../Competitions/CreateCompetition/data';
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
	ImageInputContainer,
	ImageInput,
	ImageLabel,
	Image,
} from './styles';
import { CreateModalContext } from '../../../context/Modal';

const formatOptionLabel = ({ value, label, customFlag }) => (
	<div style={{ display: 'flex' }}>
		<div style={{ marginRight: '10px' }}>{customFlag}</div>
		<div>{label}</div>
	</div>
);

const CreateTeam = () => {
	const history = useHistory();
	const [selectedName, setSelectedName] = useState('');
	const [teamName, setTeamName] = useState('');
	const [nickName, setNickName] = useState('');
	const [stadiumName, setStadiumName] = useState('');
	const [selected, setSelected] = useState(null);
	const [selectedImage, setSelectedImage] = useState(null);
	const [selectedCountry, setSelectedCountry] = useState(null);
	const [selectedRegion, setSelectedRegion] = useState(null);

	const { setSpinner } = useContext(CreateModalContext);

	const disabled =
		teamName === '' ||
		nickName === '' ||
		stadiumName === '' ||
		selected === null ||
		selectedImage === null ||
		selectedCountry === null ||
		selectedRegion === null;

	function dynamicSort(property) {
		var sortOrder = 1;

		if (property[0] === '-') {
			sortOrder = -1;
			property = property.substr(1);
		}

		return function (a, b) {
			if (sortOrder === -1) {
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
	const newCountry = arrToFilter.filter(
		(each) => each.link === selectedRegion?.link
	);

	const handleChange = (e) => {
		setSelectedName(e.target.files[0].name);
		setSelectedImage(e.target.files[0]);

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
		data.append('image', selectedImage);
		data.append('team_name', teamName);
		data.append('nick_name', nickName);
		data.append('stadium', stadiumName);
		data.append('region', selectedRegion?.value);
		data.append('country', selectedCountry?.value);

		axios
			.post('/team/create', data)
			.then((res) => {
				setSpinner(false);
				history.push('/teams');
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<Hero>
			<Button>
				<Button.Inner>
					<Button.TxtContainer>
						<Hero.Text>Create Team</Hero.Text>
					</Button.TxtContainer>

					<Button.ButtonLink to={ROUTES.TEAMS}>
						<BackArrow />
						BACK
					</Button.ButtonLink>
				</Button.Inner>
			</Button>
			<Container>
				<Inner
					onSubmit={handleSubmit}
					method='POST'
					encType='multipart/form-data'>
					<Text>Club Logo</Text>
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
								<TeamLabel>Team Name</TeamLabel>
								<Input
									value={teamName}
									onChange={({ target }) => setTeamName(target.value)}
									placeholder='Enter Team Name'
								/>
							</FormControl>
							<FormControl>
								<TeamLabel>Nickname</TeamLabel>
								<Input
									value={nickName}
									onChange={({ target }) => setNickName(target.value)}
									placeholder='Enter team nickname'
								/>
							</FormControl>
							<FormControl>
								<TeamLabel>Stadium Name</TeamLabel>
								<Input
									value={stadiumName}
									onChange={({ target }) => setStadiumName(target.value)}
									placeholder='Enter Stadium Name'
								/>
							</FormControl>
						</BoxOne>
						<BoxTwo>
							<FormControl>
								<TeamLabel>Region</TeamLabel>
								<MySelect
									value={selectedRegion}
									onChange={setSelectedRegion}
									options={regionOptions}
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
								<TeamLabel>Select Country</TeamLabel>
								<MySelect
									value={selectedCountry}
									isDisabled={!selectedRegion}
									formatOptionLabel={formatOptionLabel}
									options={newCountry}
									onChange={setSelectedCountry}
									styles={{
										control: () => ({
											backgroundColor: 'transparent',
											display: 'flex',
											height: 'inherit',
										}),
									}}
									placeholder='Select Country'
								/>
							</FormControl>
						</BoxTwo>
					</FormContainer>
					<ButtonContainer>
						<CreateButton disabled={disabled}>CREATE TEAM</CreateButton>
					</ButtonContainer>
				</Inner>
			</Container>
		</Hero>
	);
};

export default CreateTeam;
