import React, { useContext, useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import ReactCountryFlag from 'react-country-flag';
import axios from '../../../helpers/axios';

import * as ROUTES from '../../../constants/routes';
import { Hero, Button } from '../../index';
import { BackArrow } from '../../Button/styles';
import { options, regionOptions } from '../CreateCompetition/data';

import {
	BoxOne,
	BoxTwo,
	Container,
	FormContainer,
	FormControl,
	ImageAndFileContainer,
	ImageContainer,
	Inner,
	Input,
	MySelect,
	Nofile,
	TeamLabel,
	CreateButton,
	ButtonContainer,
	Text,
	Image,
	ImageInputContainer,
	ImageInput,
	ImageLabel,
} from './styles';

import { CreateModalContext } from '../../../context/Modal';

const formatOptionLabel = ({ value, label, customFlag }) => (
	<div style={{ display: 'flex' }}>
		<div style={{ marginRight: '10px' }}>{customFlag}</div>
		<div>{label}</div>
	</div>
);

const Edit = () => {
	const history = useHistory();

	const [selected, setSelected] = useState(null);
	const [selectedName, setSelectedName] = useState('');
	const { id } = useParams();

	const [competitionName, setCompetitionName] = useState('');
	const [competitionType, setCompetitionType] = useState(null);
	const [region, setRegion] = useState(null);
	const [abbreviation, setAbbreviation] = useState('');
	const [country, setCountry] = useState(null);
	const [maxOfTeam, setMaxOfTeam] = useState('');

	const { setSpinner } = useContext(CreateModalContext);

	const disabled =
		competitionName === '' ||
		competitionType === null ||
		region === null ||
		abbreviation === '' ||
		country === null ||
		maxOfTeam === '';

	//get single competition
	useEffect(() => {
		axios
			.get(`/competition/competition/${id}`)
			.then((response) => {
				const { abbrev, country, limit, logo, region, type, name } =
					response.data.data;
				setAbbreviation(abbrev);
				setMaxOfTeam(limit);
				setCountry({ value: country, label: country });
				setRegion({ value: region, label: region });
				setCompetitionType({ value: type, label: type });
				setCompetitionName(name);
				setSelected(logo);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [id]);

	const handleChange = (e) => {
		setSelectedName(e.target.files[0].name);

		const file = new FileReader();
		console.log(file);

		file.onload = () => {
			if (file.readyState === 2) {
				setSelected(file.result);
			}
		};

		file.readAsDataURL(e.target.files[0]);
	};

	//competition options
	const competitionOptions = [
		{ value: 'League', label: 'League' },
		{ value: 'Cup', label: 'Cup' },
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

	const handleSubmit = (e) => {
		e.preventDefault();
		setSpinner(true);

		const data = new FormData();
		// data.append('id', )

		data.append('competition_id', id);
		data.append('image', selected);
		data.append('competition_name', competitionName);
		data.append('type', competitionType.value);
		data.append('country', country.value);
		data.append('abbrev', abbreviation);
		data.append('region', region.value);
		data.append('limit', maxOfTeam);

		axios
			.put('/competition/edit', data)
			.then((response) => {
				setSpinner(false);
				history.push(ROUTES.COMPETITION);
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
						<Hero.Text>Edit Competition</Hero.Text>
					</Button.TxtContainer>

					<Button.ButtonLink to={ROUTES.COMPETITION}>
						<BackArrow />
						BACK
					</Button.ButtonLink>
				</Button.Inner>
			</Button>

			<Container>
				<Inner onSubmit={handleSubmit}>
					<Text>Competition Logo</Text>
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
								<TeamLabel>Competition Name</TeamLabel>
								<Input
									onChange={({ target }) => setCompetitionName(target.value)}
									value={competitionName}
									placeholder='Enter competition name'
								/>
							</FormControl>
							<FormControl>
								<TeamLabel>Abbreviation</TeamLabel>
								<Input
									onChange={({ target }) => setAbbreviation(target.value)}
									value={abbreviation}
									placeholder='abbreviation'
								/>
							</FormControl>
							<FormControl>
								<TeamLabel>Competition Type</TeamLabel>
								<MySelect
									options={competitionOptions}
									onChange={setCompetitionType}
									value={competitionType}
									styles={{
										control: () => ({
											backgroundColor: 'transparent',
											display: 'flex',
											height: 'inherit',
										}),
									}}
									placeholder='Select competition type'
								/>
							</FormControl>
						</BoxOne>
						<BoxTwo>
							<FormControl>
								<TeamLabel>Region</TeamLabel>
								<MySelect
									onChange={setRegion}
									options={regionOptions}
									value={region}
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
									onChange={setCountry}
									formatOptionLabel={formatOptionLabel}
									options={newCountry}
									isDisabled={!region}
									value={country}
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

							<FormControl>
								<TeamLabel>Maximum number of teams</TeamLabel>
								<Input
									value={maxOfTeam}
									onChange={({ target }) => setMaxOfTeam(target.value)}
									type='number'
									placeholder='Enter max number of team'
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

export default Edit;
