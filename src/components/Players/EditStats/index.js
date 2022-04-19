import React from 'react';
import { Hero, Button } from '../..';
import * as ROUTES from '../../../constants/routes';
import { BackArrow } from '../../Button/styles';
import {
	BodyBox,
	BodyBoxText,
	BodyText,
	Box,
	BoxBody,
	BoxHeader,
	Card,
	CardContainer,
	Container,
	SaveButton,
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
} from '../ViewStats/data';

const EditStats = () => {
	return (
		<Hero>
			<Button>
				<Button.Inner>
					<Button.TxtContainer>
						<Hero.Text>Edit Player Stats</Hero.Text>
					</Button.TxtContainer>

					<Button.ButtonLink to={ROUTES.VIEWSTATS}>
						<BackArrow />
						BACK
					</Button.ButtonLink>
				</Button.Inner>
			</Button>

			<Container>
				<Inner>
					<ImageAndFileContainer>
						<ImageAndLabelContainer>
							<ImageContainer></ImageContainer>

							<LabelContainer>
								<PlayerName>Wilfred Ndidi</PlayerName>
								<PlayerPosition>Midfielder</PlayerPosition>
							</LabelContainer>
						</ImageAndLabelContainer>

						<SelectAndButtonContainer>
							<SelectText>Select</SelectText>
							<MySelect />
							<SaveButton>save stats</SaveButton>
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

export default EditStats;
