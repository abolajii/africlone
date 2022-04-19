import React, { useContext, useEffect, useState } from 'react';
import { Hero, Button } from '../..';
import * as ROUTES from '../../../constants/routes';
import { BackArrow } from '../../Button/styles';
import axios from '../../../helpers/axios';
import {
	BodyBox,
	BodyBoxText,
	BodyText,
	Box,
	BoxBody,
	BoxHeader,
	ButtonOutline,
	Card,
	CardContainer,
	Container,
	EditStats,
	Image,
	ImageAndFileContainer,
	ImageAndLabelContainer,
	ImageContainer,
	Inner,
	LabelContainer,
	MySelect,
	PlayerName,
	PlayerPosition,
	SelectAndButtonContainer,
	SelectText,
	Top,
	TopHeaderText,
} from './styles';

import {
	passData,
	dribbleData,
	shotData,
	goalData,
	setPieceData,
	defendingData,
	otherData,
	cardData,
} from './data';
import { CreateModalContext } from '../../../context/Modal';

import { useParams } from 'react-router-dom';

const ViewStats = () => {
	const { id } = useParams();
	const { setPlayerModal } = useContext(CreateModalContext);
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [playerPosition, setPlayerPosition] = useState('');
	const [selected, setSelected] = useState(null);
	useEffect(() => {
		axios
			.get(`/player/player/${id}`)
			.then((response) => {
				const { first_name, last_name, position, image } = response.data.data;
				setFirstName(first_name);
				setLastName(last_name);
				setPlayerPosition(position);
				setSelected(image);
			})
			.catch((error) => {});
	}, []);
	return (
		<Hero>
			<Button>
				<Button.Inner>
					<Button.TxtContainer>
						<Hero.Text>Player Stats</Hero.Text>
					</Button.TxtContainer>

					<Button.ButtonLink to={ROUTES.PLAYERS}>
						<BackArrow />
						BACK
					</Button.ButtonLink>
				</Button.Inner>
			</Button>

			<Container>
				<Inner>
					<ImageAndFileContainer>
						<ImageAndLabelContainer>
							<ImageContainer>
								<Image src={selected} alt={firstName} />
							</ImageContainer>

							<LabelContainer>
								<PlayerName>
									{firstName} {lastName}
								</PlayerName>
								<PlayerPosition>{playerPosition}</PlayerPosition>
							</LabelContainer>
						</ImageAndLabelContainer>

						<SelectAndButtonContainer>
							<SelectText>Select</SelectText>
							<MySelect />
							<ButtonOutline onClick={() => setPlayerModal(true)}>
								ADD NEW SEASON
							</ButtonOutline>

							<EditStats to={ROUTES.EDITSTATS}>edit stats</EditStats>
						</SelectAndButtonContainer>
					</ImageAndFileContainer>

					<CardContainer>
						<Card>
							<Top>
								<TopHeaderText>Stats</TopHeaderText>
								<TopHeaderText>Cum. Value</TopHeaderText>
							</Top>
							<Box>
								<BoxHeader>Pass</BoxHeader>
								{passData.map((each) => {
									return (
										<BoxBody key={each.id}>
											<BodyText>{each.text}</BodyText>
											<BodyBox>
												<BodyBoxText>{each.fg}</BodyBoxText>
											</BodyBox>
										</BoxBody>
									);
								})}
								<BoxHeader>Dribble</BoxHeader>
								{dribbleData.map((each) => {
									return (
										<BoxBody key={each.id}>
											<BodyText>{each.text}</BodyText>
											<BodyBox>
												<BodyBoxText>{each.fg}</BodyBoxText>
											</BodyBox>
										</BoxBody>
									);
								})}
								<BoxHeader>Shots</BoxHeader>
								{shotData.map((each) => {
									return (
										<BoxBody key={each.id}>
											<BodyText>{each.text}</BodyText>
											<BodyBox>
												<BodyBoxText>{each.fg}</BodyBoxText>
											</BodyBox>
										</BoxBody>
									);
								})}
							</Box>
						</Card>
						<Card>
							<Top>
								<TopHeaderText>Stats</TopHeaderText>
								<TopHeaderText>Cum. Value</TopHeaderText>
							</Top>
							<Box>
								<BoxHeader>Goals</BoxHeader>
								{goalData.map((each) => {
									return (
										<BoxBody key={each.id}>
											<BodyText>{each.text}</BodyText>
											<BodyBox>
												<BodyBoxText>{each.fg}</BodyBoxText>
											</BodyBox>
										</BoxBody>
									);
								})}
								<BoxHeader>Setpiece</BoxHeader>
								{setPieceData.map((each) => {
									return (
										<BoxBody key={each.id}>
											<BodyText>{each.text}</BodyText>
											<BodyBox>
												<BodyBoxText>{each.fg}</BodyBoxText>
											</BodyBox>
										</BoxBody>
									);
								})}
							</Box>
						</Card>
						<Card>
							<Top>
								<TopHeaderText>Stats</TopHeaderText>
								<TopHeaderText>Cum. Value</TopHeaderText>
							</Top>
							<Box>
								<BoxHeader>Defending</BoxHeader>
								{defendingData.map((each) => {
									return (
										<BoxBody key={each.id}>
											<BodyText>{each.text}</BodyText>
											<BodyBox>
												<BodyBoxText>{each.fg}</BodyBoxText>
											</BodyBox>
										</BoxBody>
									);
								})}
							</Box>
						</Card>
					</CardContainer>

					<CardContainer>
						<Card>
							<Top>
								<TopHeaderText>Stats</TopHeaderText>
								<TopHeaderText>Cum. Value</TopHeaderText>
							</Top>
							<Box>
								<BoxHeader>Others</BoxHeader>
								{otherData.map((each) => {
									return (
										<BoxBody key={each.id}>
											<BodyText>{each.text}</BodyText>
											<BodyBox>
												<BodyBoxText>{each.fg}</BodyBoxText>
											</BodyBox>
										</BoxBody>
									);
								})}
								<BoxHeader>Card</BoxHeader>
								{cardData.map((each) => {
									return (
										<BoxBody key={each.id}>
											<BodyText>{each.text}</BodyText>
											<BodyBox>
												<BodyBoxText>{each.fg}</BodyBoxText>
											</BodyBox>
										</BoxBody>
									);
								})}
							</Box>
						</Card>
					</CardContainer>
				</Inner>
			</Container>
		</Hero>
	);
};

export default ViewStats;
