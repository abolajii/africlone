import React from 'react';
import {
	Field,
	FieldContainer,
	Left,
	HalfWayLineLeft,
	CenterCircle,
	FieldInner,
	PenaltyArea,
	PenaltyArc,
	GoalArea,
	Right,
	HalfWayLineRight,
	CornerArc,
	PlayerField,
	Players,
} from './styles';

const FootballPitch = ({ newFormation, secondNewFormation, sm }) => {
	return (
		<FieldContainer sm={sm}>
			<FieldInner sm={sm}>
				<Field>
					<Left>
						<HalfWayLineLeft />
						<CenterCircle />
						<PenaltyArea />
						<PenaltyArc />
						<GoalArea>
							<Players top={'35%'} left={'50%'}>
								GK
							</Players>
						</GoalArea>
						<CornerArc />

						{!newFormation && (
							<PlayerField>
								<Players top={'12.5%'}>LB</Players>
								<Players top={'29%'}>CB</Players>
								<Players top={'45%'}>CB</Players>
								<Players top={'62%'}>RB</Players>

								<Players left={'35%'} top={'20%'}>
									MC
								</Players>
								<Players left={'35%'} top={'37%'}>
									{' '}
									MC
								</Players>
								<Players left={'35%'} top={'54%'}>
									MC
								</Players>
								<Players left={'75%'} top={'20%'}>
									FW
								</Players>
								<Players left={'75%'} top={'37%'}>
									FW
								</Players>
								<Players left={'75%'} top={'54%'}>
									FW
								</Players>
							</PlayerField>
						)}

						{newFormation === 433 && (
							<PlayerField>
								<Players top={'13%'}>LB</Players>
								<Players top={'29%'}>CB</Players>
								<Players top={'45%'}>CB</Players>
								<Players top={'62%'}>RB</Players>
								<Players left={'35%'} top={'20%'}>
									MC
								</Players>
								<Players left={'35%'} top={'37%'}>
									{' '}
									MC
								</Players>
								<Players left={'35%'} top={'54%'}>
									MC
								</Players>
								<Players left={'75%'} top={'20%'}>
									FW
								</Players>
								<Players left={'75%'} top={'37%'}>
									FW
								</Players>
								<Players left={'75%'} top={'54%'}>
									FW
								</Players>
							</PlayerField>
						)}

						{newFormation === 442 && (
							<PlayerField>
								<Players top={'13%'}>LB</Players>
								<Players top={'29%'}>CB</Players>
								<Players top={'45%'}>CB</Players>
								<Players top={'62%'}>RB</Players>
								<Players left={'35%'} top={'13%'}>
									MC
								</Players>
								<Players left={'35%'} top={'29%'}>
									{' '}
									MC
								</Players>
								<Players left={'35%'} top={'45%'}>
									MC
								</Players>
								<Players left={'35%'} top={'62%'}>
									MC
								</Players>
								<Players left={'75%'} top={'29%'}>
									FW
								</Players>
								<Players left={'75%'} top={'45%'}>
									FW
								</Players>
							</PlayerField>
						)}

						{newFormation === 4411 && (
							<PlayerField>
								<Players top={'13%'}>LB</Players>
								<Players top={'29%'}>CB</Players>
								<Players top={'45%'}>CB</Players>
								<Players top={'62%'}>RB</Players>
								<Players left={'30%'} top={'13%'}>
									MC
								</Players>
								<Players left={'30%'} top={'29%'}>
									{' '}
									MC
								</Players>
								<Players left={'30%'} top={'45%'}>
									MC
								</Players>
								<Players left={'30%'} top={'62%'}>
									MC
								</Players>
								<Players left={'55%'} top={'36%'}>
									FW
								</Players>
								<Players left={'80%'} top={'36%'}>
									FW
								</Players>
							</PlayerField>
						)}

						{newFormation === 4321 && (
							<PlayerField>
								<Players top={'13%'}>LB</Players>
								<Players top={'29%'}>CB</Players>
								<Players top={'45%'}>CB</Players>
								<Players top={'62%'}>RB</Players>
								<Players left={'24%'} top={'20%'}>
									MC
								</Players>
								<Players left={'24%'} top={'37%'}>
									{' '}
									MC
								</Players>
								<Players left={'24%'} top={'54%'}>
									MC
								</Players>
								<Players left={'55%'} top={'29%'}>
									ST
								</Players>
								<Players left={'55%'} top={'45%'}>
									ST
								</Players>
								<Players left={'80%'} top={'36%'}>
									FW
								</Players>
							</PlayerField>
						)}

						{newFormation === 532 && (
							<PlayerField>
								<Players top={'13%'}>LB</Players>
								<Players top={'25%'}>CB</Players>
								<Players top={'37%'}>SW</Players>
								<Players top={'50%'}>CB</Players>
								<Players top={'62%'}>RB</Players>
								<Players left={'35%'} top={'20%'}>
									MC
								</Players>
								<Players left={'35%'} top={'37%'}>
									{' '}
									MC
								</Players>
								<Players left={'35%'} top={'54%'}>
									MC
								</Players>
								<Players left={'75%'} top={'21%'}>
									FW
								</Players>
								<Players left={'75%'} top={'54%'}>
									FW
								</Players>
							</PlayerField>
						)}

						{newFormation === 343 && (
							<PlayerField>
								<Players top={'15%'}>CB</Players>
								<Players top={'37%'}>CB</Players>
								<Players top={'60%'}>CB</Players>

								<Players left={'35%'} top={'12.5%'}>
									MC
								</Players>
								<Players left={'35%'} top={'29%'}>
									{' '}
									MC
								</Players>
								<Players left={'35%'} top={'45%'}>
									MC
								</Players>
								<Players left={'35%'} top={'62%'}>
									MC
								</Players>
								<Players left={'75%'} top={'54%'}>
									FW
								</Players>
								<Players left={'75%'} top={'20%'}>
									FW
								</Players>
								<Players left={'75%'} top={'37%'}>
									FW
								</Players>
							</PlayerField>
						)}
					</Left>
					<Right>
						<HalfWayLineRight />
						<CenterCircle />
						<PenaltyArea />
						<PenaltyArc />
						<GoalArea>
							<Players right top={'35%'} left={'50%'}>
								GK
							</Players>
						</GoalArea>
						<CornerArc />

						{!secondNewFormation && (
							<PlayerField>
								<Players right left={'12%'} top={'13%'}>
									LB
								</Players>
								<Players right left={'12%'} top={'29%'}>
									CB
								</Players>
								<Players right left={'12%'} top={'45%'}>
									CB
								</Players>
								<Players right left={'12%'} top={'62%'}>
									RB
								</Players>
								<Players right left={'45%'} top={'13%'}>
									MC
								</Players>
								<Players right left={'45%'} top={'29%'}>
									{' '}
									MC
								</Players>
								<Players right left={'45%'} top={'45%'}>
									MC
								</Players>
								<Players right left={'45%'} top={'62%'}>
									MC
								</Players>
								<Players right left={'75%'} top={'20%'}>
									FW
								</Players>
								<Players right left={'75%'} top={'55%'}>
									FW
								</Players>
							</PlayerField>
						)}

						{secondNewFormation === 433 && (
							<PlayerField>
								<Players right left={'12%'} top={'13%'}>
									LB
								</Players>
								<Players right left={'12%'} top={'29%'}>
									CB
								</Players>
								<Players right left={'12%'} top={'45%'}>
									CB
								</Players>
								<Players right left={'12%'} top={'62%'}>
									RB
								</Players>
								<Players right left={'45%'} top={'20%'}>
									MC
								</Players>
								<Players right left={'45%'} top={'37%'}>
									{' '}
									MC
								</Players>
								<Players right left={'45%'} top={'54%'}>
									MC
								</Players>
								<Players right left={'75%'} top={'20%'}>
									FW
								</Players>
								<Players right left={'75%'} top={'37%'}>
									FW
								</Players>
								<Players right left={'75%'} top={'54%'}>
									FW
								</Players>
							</PlayerField>
						)}

						{secondNewFormation === 442 && (
							<PlayerField>
								<Players right left={'12%'} top={'13%'}>
									LB
								</Players>
								<Players right left={'12%'} top={'29%'}>
									CB
								</Players>
								<Players right left={'12%'} top={'45%'}>
									CB
								</Players>
								<Players right left={'12%'} top={'62%'}>
									RB
								</Players>
								<Players right left={'45%'} top={'13%'}>
									MC
								</Players>
								<Players right left={'45%'} top={'29%'}>
									{' '}
									MC
								</Players>
								<Players right left={'45%'} top={'45%'}>
									MC
								</Players>
								<Players right left={'45%'} top={'62%'}>
									MC
								</Players>
								<Players right left={'85%'} top={'29%'}>
									FW
								</Players>
								<Players right left={'85%'} top={'45%'}>
									FW
								</Players>
							</PlayerField>
						)}

						{secondNewFormation === 4411 && (
							<PlayerField>
								<Players right left={'12%'} top={'13%'}>
									LB
								</Players>
								<Players right left={'12%'} top={'29%'}>
									CB
								</Players>
								<Players right left={'12%'} top={'45%'}>
									CB
								</Players>
								<Players right left={'12%'} top={'62%'}>
									RB
								</Players>
								<Players right left={'45%'} top={'13%'}>
									MC
								</Players>
								<Players right left={'45%'} top={'29%'}>
									{' '}
									MC
								</Players>
								<Players right left={'45%'} top={'45%'}>
									MC
								</Players>
								<Players right left={'45%'} top={'62%'}>
									MC
								</Players>
								<Players right left={'73%'} top={'37%'}>
									FW
								</Players>
								<Players right left={'99%'} top={'37%'}>
									FW
								</Players>
							</PlayerField>
						)}

						{secondNewFormation === 4321 && (
							<PlayerField>
								<Players right left={'12%'} top={'13%'}>
									LB
								</Players>
								<Players right left={'12%'} top={'29%'}>
									CB
								</Players>
								<Players right left={'12%'} top={'45%'}>
									CB
								</Players>
								<Players right left={'12%'} top={'62%'}>
									RB
								</Players>
								<Players right left={'44%'} top={'20%'}>
									MC
								</Players>
								<Players right left={'44%'} top={'37%'}>
									{' '}
									MC
								</Players>
								<Players right left={'44%'} top={'54%'}>
									MC
								</Players>
								<Players right left={'69%'} top={'29%'}>
									ST
								</Players>
								<Players right left={'69%'} top={'45%'}>
									ST
								</Players>
								<Players right left={'95%'} top={'36%'}>
									FW
								</Players>
							</PlayerField>
						)}

						{secondNewFormation === 532 && (
							<PlayerField>
								<Players right left={'12%'} top={'13%'}>
									LB
								</Players>
								<Players right left={'12%'} top={'25%'}>
									CB
								</Players>
								<Players right left={'12%'} top={'37%'}>
									SW
								</Players>
								<Players right left={'12%'} top={'50%'}>
									CB
								</Players>
								<Players right left={'12%'} top={'62%'}>
									RB
								</Players>
								<Players right left={'50%'} top={'20%'}>
									MC
								</Players>
								<Players right left={'50%'} top={'37%'}>
									{' '}
									MC
								</Players>
								<Players right left={'50%'} top={'54%'}>
									MC
								</Players>
								<Players right left={'85%'} top={'21%'}>
									FW
								</Players>
								<Players right left={'85%'} top={'54%'}>
									FW
								</Players>
							</PlayerField>
						)}

						{secondNewFormation === 343 && (
							<PlayerField>
								<Players right left={'12%'} top={'15%'}>
									CB
								</Players>
								<Players right left={'12%'} top={'37%'}>
									CB
								</Players>
								<Players right left={'12%'} top={'60%'}>
									CB
								</Players>

								<Players right left={'45%'} top={'12.5%'}>
									MC
								</Players>
								<Players right left={'45%'} top={'29%'}>
									{' '}
									MC
								</Players>
								<Players right left={'45%'} top={'45%'}>
									MC
								</Players>
								<Players right left={'45%'} top={'62%'}>
									MC
								</Players>
								<Players right left={'75%'} top={'54%'}>
									FW
								</Players>
								<Players right left={'75%'} top={'20%'}>
									FW
								</Players>
								<Players right left={'75%'} top={'37%'}>
									FW
								</Players>
							</PlayerField>
						)}
					</Right>
				</Field>
			</FieldInner>
		</FieldContainer>
	);
};

export default FootballPitch;
