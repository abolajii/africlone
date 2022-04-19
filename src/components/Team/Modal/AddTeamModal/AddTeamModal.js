import React, { useState, useContext, useEffect } from 'react';
import {
	options,
	regionOptions,
} from '../../../Competitions/CreateCompetition/data';

import { CreateModalContext } from '../../../../context/Modal';
import ReactCountryFlag from 'react-country-flag';

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
	MyInput,
	Dropdown,
	DropDownItem,
	Item,
	ModalForm,
	Body,
} from './styles';
import { GlobalContext } from '../../../../context/Global';

import axios from '../../../../helpers/axios';
import { useHistory, useParams } from 'react-router-dom';

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

const AddTeamModal = () => {
	const { team_id } = useParams();
	const history = useHistory();
	const { showTeamModal, setShowTeamModal } = useContext(CreateModalContext);
	const {
		singleTeam,
		playerSeasonValue,
		setPlayerSeasonValue,
		// playerQueryId,
		// setPlayerQueryId,
	} = useContext(GlobalContext);

	const disabled = playerSeasonValue === null;

	const [regionQuery, setRegionQuery] = useState('');
	const [nationalityQuery, setNationalityQuery] = useState('');
	const [playerQuery, setPlayerQuery] = useState([]);
	const [selectedPlayer, setSelectedPlayer] = useState({});
	const [playerName, setPlayerName] = useState('');
	const [selectedNationality, setSelectedNationality] = useState(null);
	const [selectedRegion, setSelectedRegion] = useState(null);
	const [dropDown, setDropDown] = useState(true);
	const [clicked, setClicked] = useState(false);

	const [error, setError] = useState(false);

	useEffect(() => {
		axios
			.get(`/team/season/${singleTeam._id}`)
			.then((response) => {
				setPlayerSeasonOptions(
					response.data.data?.map((each) => {
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
	}, [showTeamModal]);

	useEffect(() => {
		axios
			.get(
				`/player/?search=${playerName}&region=${regionQuery}&nationality=${nationalityQuery}`
			)
			.then((response) => {
				setPlayerQuery(
					response.data.data.map((each) => ({
						firstName: each.first_name,
						lastName: each.last_name,
						region: each.region,
						nationality: each.nationality,
						id: each._id,
					}))
				);
			})
			.catch((err) => {
				setError(true);
				toast.error('Something went wrong, please try again');
			});
	}, [playerName, selectedRegion, selectedNationality]);

	const [playerSeasonOptions, setPlayerSeasonOptions] = useState([]);

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
			team_id: singleTeam?._id,
			player_id: selectedPlayer?.id,
			season_id: playerSeasonValue?.id,
		};

		axios
			.put('/team/season/squad/add', data)
			.then((response) => {
				setPlayerName('');
				setSelectedNationality({});
				setSelectedRegion({});
				setPlayerSeasonValue({});
				setShowTeamModal(false);
				setDropDown(true);
			})
			.catch((err) => {
				setError(true);
				toast.error('Something went wrong, please try again');
			});
	};

	return (
		<>
			<Background
				show={showTeamModal}
				backdrop='static'
				keyboard={false}
				centered
				aria-labelledby=''>
				{error && <ToastContainer />}
				<ModalForm onSubmit={handleSubmit}>
					<Body>
						<Top>
							<ModalText>Add Player</ModalText>
							<CloseIcon
								onClick={() => {
									setPlayerSeasonValue(null);
									setShowTeamModal(false);
									setPlayerName('');
									setSelectedRegion(null);
									setSelectedNationality(null);
									setPlayerQuery('');
								}}
							/>
						</Top>

						<SelectContainer>
							<Label>Select Season</Label>
							<MySelectContainer>
								<MySelect
									value={playerSeasonValue}
									onChange={setPlayerSeasonValue}
									options={playerSeasonOptions}
									placeholder='Select a season'
									styles={styles}
								/>
							</MySelectContainer>
						</SelectContainer>

						<SelectContainer>
							<Label>Select Player Region</Label>
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
							<Label>Select Player Nationality</Label>
							<MySelectContainer>
								<MySelect
									options={newCountry}
									isDisabled={!selectedRegion}
									onChange={handleNationalityChange}
									formatOptionLabel={formatOptionLabel}
									value={selectedNationality}
									placeholder='Select nationality'
									styles={styles}
								/>
							</MySelectContainer>
						</SelectContainer>
						<SelectContainer>
							<Label>Enter Player Name</Label>
							<MySelectContainer>
								<Input
									value={playerName}
									onChange={({ target }) => setPlayerName(target.value)}
									placeholder='Enter player name'
								/>
							</MySelectContainer>
						</SelectContainer>
						{dropDown && playerName && (
							<Dropdown>
								{playerQuery?.map((each) => {
									return (
										<DropDownItem
											key={each._id}
											onClick={() => {
												setPlayerName(`${each.firstName} ${each.lastName}`);
												setDropDown(false);
												setSelectedPlayer(each);
											}}>
											<Item>
												{each.firstName} {each.lastName}
											</Item>
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
							ADD PLAYER
						</SaveButton>
					</ButtonContainer>
				</ModalForm>
			</Background>
		</>
	);
};

export default AddTeamModal;
