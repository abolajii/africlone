import React, { useContext, useState } from 'react';
import * as ROUTES from '../../../constants/routes';
import { BackArrow } from '../../Button/styles';
import ReactCountryFlag from 'react-country-flag';
import { options, regionOptions } from './data';
import { useHistory } from 'react-router-dom';
import { Hero, Button } from '../../index';
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
	ImageInput,
	ImageInputContainer,
	ImageLabel,
} from './styles';

import { CreateModalContext } from '../../../context/Modal';
import { ToastContainer, toast } from 'react-toastify';
import axios from '../../../helpers/axios';

const formatOptionLabel = ({ value, label, customFlag }) => (
	<div style={{ display: 'flex' }}>
		<div style={{ marginRight: '10px' }}>{customFlag}</div>
		<div>{label}</div>
	</div>
);

const CreateCompetition = () => {
	const history = useHistory();

	const { setSpinner } = useContext(CreateModalContext);

	const [selected, setSelected] = useState(null);
	const [selectedName, setSelectedName] = useState('');
	const [selectedImage, setSelectedImage] = useState(null);

	const [selectedCompetitionType, setSelectedCompetitionType] = useState(null);
	const [selectedCountry, setSelectedCountry] = useState(null);
	const [selectedRegion, setSelectedRegion] = useState(null);

	const [competitionName, setCompetitionName] = useState('');
	const [abbreviation, setAbbreviation] = useState('');
	const [maxNum, setMaxNum] = useState(null);
	const [click, setClick] = useState(false);

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

	const disabled =
		selected === null ||
		selectedName === '' ||
		selectedCompetitionType === null ||
		selectedCountry === null ||
		selectedRegion === null ||
		competitionName === '' ||
		abbreviation === '' ||
		maxNum === null;

	//competition options
	const competitionOptions = [
		{ value: 'League', label: 'League' },
		{ value: 'Cup', label: 'Cup' },
	];

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

	const defaultValue = arrToFilter[0];

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
		data.append('competition_name', competitionName);
		data.append('type', selectedCompetitionType.value);
		data.append('abbrev', abbreviation);
		data.append('region', selectedRegion.value);
		data.append('limit', maxNum);
		data.append('country', selectedCountry.value);

		axios
			.post('/competition/create', data)
			.then((response) => {
				setSpinner(false);
				setClick(false);
				history.push(ROUTES.COMPETITION);
			})
			.catch((error) => {
				setSpinner(false);
				toast.error('Something went wrong, try again later');
			});
	};

	return (
		<>
			<Hero>
				<ToastContainer />
				<Button>
					<Button.Inner>
						<Button.TxtContainer>
							<Hero.Text>Create Competition</Hero.Text>
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
								{!selectedName && <ImageLabel for='file'>Add Image</ImageLabel>}
							</ImageInputContainer>
						</ImageAndFileContainer>

						<FormContainer>
							<BoxOne>
								<FormControl>
									<TeamLabel>Competition Name</TeamLabel>
									<Input
										value={competitionName}
										onChange={({ target }) => setCompetitionName(target.value)}
										placeholder='Enter competition name'
									/>
								</FormControl>
								<FormControl>
									<TeamLabel>Abbreviation</TeamLabel>
									<Input
										value={abbreviation}
										onChange={({ target }) => setAbbreviation(target.value)}
										placeholder='Abbreviation'
									/>
								</FormControl>
								<FormControl>
									<TeamLabel>Competition Type</TeamLabel>
									<MySelect
										options={competitionOptions}
										value={selectedCompetitionType}
										onChange={setSelectedCompetitionType}
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
										options={regionOptions}
										value={selectedRegion}
										onChange={setSelectedRegion}
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
										options={newCountry}
										isDisabled={!selectedRegion}
										defaultValue={defaultValue}
										value={selectedCountry}
										formatOptionLabel={formatOptionLabel}
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

								<FormControl>
									<TeamLabel>Maximum number of teams</TeamLabel>
									<Input
										value={maxNum}
										onChange={({ target }) => setMaxNum(target.value)}
										type='number'
										placeholder='Enter max number of team'
									/>
								</FormControl>
							</BoxTwo>
						</FormContainer>
						<ButtonContainer>
							<CreateButton
								className={click && 'not-allowed'}
								onClick={() => setClick(true)}
								disabled={disabled}>
								CREATE COMPETITION
							</CreateButton>
						</ButtonContainer>
					</Inner>
				</Container>
			</Hero>
		</>
	);
};

export default CreateCompetition;
