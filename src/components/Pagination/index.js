import React from 'react';
import {
	Container,
	Inner,
	NextButton,
	PageNumberBox,
	PrevButton,
} from './styles';

const Pagination = ({ prev, next, num, setNumber, number }) => {
	return (
		<Container>
			<Inner>
				<PrevButton
					onClick={() => setNumber((number) => number - 1)}
					disabled={num <= 10 || !prev}>
					Prev
				</PrevButton>
				<PageNumberBox>{number}</PageNumberBox>
				<NextButton
					disabled={num <= 10 || !next}
					onClick={() => setNumber((number) => number + 1)}>
					Next
				</NextButton>
			</Inner>
		</Container>
	);
};

export default Pagination;
