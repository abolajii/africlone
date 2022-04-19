import React, { useContext, useEffect, useState } from 'react';
import ReactCountryFlag from 'react-country-flag';

import { CreateModalContext } from '../../context/Modal';
import { options, regionOptions } from '../Competitions/CreateCompetition/data';
import axios from '../../helpers/axios';
import { useHistory } from 'react-router-dom';

import {
	Background,
	ModalText,
	Top,
	Label,
	CloseIcon,
	SelectContainer,
	MySelectContainer,
	MySelect,
	Input,
	ButtonContainer,
	SaveButton,
	Body,
	Item,
	DropDownItem,
	Dropdown,
	ModalForm,
} from './styles';

import { GlobalContext } from '../../context/Global';
import { ToastContainer, toast } from 'react-toastify';

const styles = {
	control: (base) => ({
		...base,
		// This line disable the blue border
		boxShadow: 'none',
	}),
};

const formatOptionLabel = ({ value, label, customFlag }) => (
	<div style={{ display: 'flex' }}>
		<div style={{ marginRight: '10px' }}>{customFlag}</div>
		<div>{label}</div>
	</div>
);

const ModalComponent = () => {
	const history = useHistory();

	const { showCompetitionTeamModal, setShowCompetitionTeamModal } =
		useContext(CreateModalContext);
	const { singleCompetition, setTableCompetition } = useContext(GlobalContext);

	const [competitionSeasonOptions, setCompetitionSeasonOptions] = useState([]);
	const [selectedTeam, setSelectedTeam] = useState({});
	const [selectValue, setSelectValue] = useState(null);
	const [selectedNationality, setSelectedNationality] = useState(null);
	const [selectedRegion, setSelectedRegion] = useState(null);
	const [teamName, setTeamName] = useState('');
	const [teamQuery, setTeamQuery] = useState([]);
	const [regionQuery, setRegionQuery] = useState('');
	const [nationalityQuery, setNationalityQuery] = useState('');

	const [clicked, setClicked] = useState(false);
	const [dropDown, setDropDown] = useState(true);
	const [error, setError] = useState(false);

	const disabled = selectValue === null;
	// get all seasons in a competition
	useEffect(() => {
		axios
			.get(`/competition/season/${singleCompetition?._id}`)
			.then((response) => {
				setCompetitionSeasonOptions(
					response.data.data.map((each) => {
						return {
							value: each.season_name,
							label: each.season_name,
							id: each._id,
						};
					})
				);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [showCompetitionTeamModal]);

	//add a team in a competition
	useEffect(() => {
		axios
			.get(
				`/team?search=${teamName}&region=${regionQuery}&nationality=${nationalityQuery}`
			)
			.then((response) => {
				setTeamQuery(response.data.data);
			})
			.catch((err) => console.error(err));
	}, [teamName, selectedRegion, showCompetitionTeamModal, selectedNationality]);

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

	const newCountry = arrToFilter.filter(
		(each) => each.link === selectedRegion?.link
	);

	const handleSelect = (e) => {
		setSelectValue(e);
	};

	const handleRegionChange = (e) => {
		setSelectedRegion(e);
		setRegionQuery(e.value);
	};

	const handleNationalityChange = (e) => {
		setSelectedNationality(e);
		setNationalityQuery(e.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const data = {
			season_id: selectValue?.id,
			competition_id: singleCompetition?._id,
			team_id: selectedTeam?._id,
		};
		axios
			.put('/competition/season/team/add', data)
			.then((response) => {
				axios
					.get(`/competition/season/season/${selectValue?.id}`)
					.then((response) => {
						setTableCompetition(response.data.data?.teams);
					})
					.catch((err) => console.log(err));
				setShowCompetitionTeamModal(false);
				setTeamName('');
				setSelectedNationality(null);
				setSelectValue(null);
				setSelectedRegion(null);
				setDropDown(true);

				history.push('/view-competition');
				setClicked(false);
			})
			.catch((error) => {
				setError(true);
				toast.error('Something went wrong, please try again');
			});
	};

	return (
		<>
			<Background
				show={showCompetitionTeamModal}
				backdrop='static'
				keyboard={false}
				centered
				aria-labelledby=''>
				{error && <ToastContainer />}
				<ModalForm onSubmit={handleSubmit}>
					<Body>
						<Top>
							<ModalText>Add Team</ModalText>
							<CloseIcon onClick={() => setShowCompetitionTeamModal(false)} />
						</Top>

						<SelectContainer>
							<Label>Select Season</Label>
							<MySelectContainer>
								<MySelect
									value={selectValue}
									onChange={handleSelect}
									options={competitionSeasonOptions}
									placeholder='Select season'
									styles={styles}
								/>
							</MySelectContainer>
						</SelectContainer>

						<SelectContainer>
							<Label>Select Region</Label>
							<MySelectContainer>
								<MySelect
									value={selectedRegion}
									onChange={handleRegionChange}
									options={regionOptions}
									placeholder='Select region'
									styles={styles}
								/>
							</MySelectContainer>
						</SelectContainer>

						<SelectContainer>
							<Label>Select Country</Label>
							<MySelectContainer>
								<MySelect
									maxMenuHeight={140}
									value={selectedNationality}
									onChange={handleNationalityChange}
									isDisabled={!selectedRegion}
									options={newCountry}
									formatOptionLabel={formatOptionLabel}
									placeholder='Select country'
									styles={styles}
								/>
							</MySelectContainer>
						</SelectContainer>
						<SelectContainer>
							<Label>Enter Team</Label>
							<MySelectContainer>
								<Input
									placeholder='Enter team name'
									value={teamName}
									onChange={({ target }) => setTeamName(target.value)}
								/>
							</MySelectContainer>
						</SelectContainer>
						{dropDown && teamName && (
							<Dropdown>
								{teamQuery.map((each) => {
									return (
										<DropDownItem
											key={each._id}
											onClick={() => {
												setTeamName(each.name);
												setDropDown(false);
												setSelectedTeam(each);
											}}>
											<Item>{each.name}</Item>
										</DropDownItem>
									);
								})}
							</Dropdown>
						)}
					</Body>
					<ButtonContainer>
						<SaveButton
							disabled={disabled}
							className={clicked && 'not-allowed'}
							onClick={() => {
								setClicked(true);
							}}>
							ADD TEAMM
						</SaveButton>
					</ButtonContainer>
				</ModalForm>
			</Background>
		</>
	);
};

export default ModalComponent;
