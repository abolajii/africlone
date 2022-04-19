import React, { useContext, useEffect, useState } from 'react';
import { Hero, Button } from '../..';
import ReactCountryFlag from 'react-country-flag';
import * as ROUTES from '../../../constants/routes';

import { BackArrow } from '../../Button/styles';
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
	Image,
	ImageInput,
	ImageLabel,
	ImageInputContainer,
} from './styles';
import {
	regionOptions,
	options,
} from '../../Competitions/CreateCompetition/data';

import axios from '../../../helpers/axios';
import { useParams, useHistory } from 'react-router-dom';
import { CreateModalContext } from '../../../context/Modal';

const formatOptionLabel = ({ value, label, customFlag }) => (
	<div style={{ display: 'flex' }}>
		<div style={{ marginRight: '10px' }}>{customFlag}</div>
		<div>{label}</div>
	</div>
);

const EditTeam = () => {
	const { id } = useParams();
	const history = useHistory();
	// const [selected, setSelected] = useState(null);
	const [selectedName, setSelectedName] = useState('');

	const { setSpinner } = useContext(CreateModalContext);
	const [file, setFile] = useState(null);
	const [selected, setSelected] = useState(null);
	const [selectedImage, setSelectedImage] = useState(null);
	const [teamName, setTeamName] = useState('');
	const [nickName, setNickName] = useState('');
	const [stadium, setStadium] = useState('');
	const [region, setRegion] = useState(null);
	const [nationality, setNationality] = useState(null);

	const disabled =
		file === null ||
		selected === null ||
		selectedName === null ||
		teamName === '' ||
		nickName === '' ||
		stadium === '' ||
		region === null ||
		nationality === null;

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
	const newCountry = arrToFilter.filter((each) => each.link === region?.link);

	const handleChange = (e) => {
		setSelectedName(e.target.files[0].name);
		setSelectedImage(e.target.files[0]);

		const file = new FileReader();
		console.log(file);

		file.onload = () => {
			if (file.readyState === 2) {
				setSelected(file.result);
			}
		};

		file.readAsDataURL(e.target.files[0]);
	};

	useEffect(() => {
		axios
			.get(`/team/team/${id}`)
			.then((response) => {
				console.log(response.data.data);
				const { country, logo, name, nick_name, region, stadium } =
					response.data.data;
				setNickName(nick_name);
				setStadium(stadium);
				setTeamName(name);
				setNationality({ value: country, label: country });
				setRegion({ value: region, label: region });
				setFile(logo);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();
		setSpinner(true);
		const data = new FormData();

		data.append('team_id', id);
		data.append('image', selectedImage);
		data.append('team_name', teamName);
		data.append('nick_name', nickName);
		data.append('stadium', stadium);
		data.append('country', nationality.value);
		data.append('region', region.value);

		axios
			.put('/team/edit', data)
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
						<Hero.Text>Edit Team</Hero.Text>
					</Button.TxtContainer>

					<Button.ButtonLink to={ROUTES.TEAMS}>
						<BackArrow />
						BACK
					</Button.ButtonLink>
				</Button.Inner>
			</Button>
			<Container>
				<Inner onSubmit={handleSubmit}>
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
							<ImageLabel for='file'>Replace Image</ImageLabel>
						</ImageInputContainer>
					</ImageAndFileContainer>

					<FormContainer>
						<BoxOne>
							<FormControl>
								<TeamLabel>Team Name</TeamLabel>
								<Input
									type='text'
									value={teamName}
									onChange={({ target }) => setTeamName(target.value)}
								/>
							</FormControl>
							<FormControl>
								<TeamLabel>Nickname</TeamLabel>
								<Input
									type='text'
									value={nickName}
									onChange={({ target }) => setNickName(target.value)}
									placeholder='Enter team nickname'
								/>
							</FormControl>
							<FormControl>
								<TeamLabel>Stadium Name</TeamLabel>
								<Input
									type='text'
									value={stadium}
									onChange={({ target }) => setStadium(target.value)}
									placeholder='Enter Stadium Name'
								/>
							</FormControl>
						</BoxOne>
						<BoxTwo>
							<FormControl>
								<TeamLabel>Region</TeamLabel>
								<MySelect
									value={region}
									onChange={setRegion}
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
									value={nationality}
									onChange={setNationality}
									formatOptionLabel={formatOptionLabel}
									options={newCountry}
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
						<CreateButton disabled={disabled}>SAVE CHANGES</CreateButton>
					</ButtonContainer>
				</Inner>
			</Container>
		</Hero>
	);
};

export default EditTeam;
