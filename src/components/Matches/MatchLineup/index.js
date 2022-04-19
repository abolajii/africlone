import React, { useContext } from 'react';
import './style.scss';
import Home from '../../SelectTeamLineup/HomeTeamLineup/HomeStarting';
import Away from '../../SelectTeamLineup/AwayTeamLineup/AwayStarting';
import HomeSubstitute from '../../SelectTeamLineup/HomeTeamLineup/HomeSubstitute';
import AwaySubstitute from '../../SelectTeamLineup/AwayTeamLineup/AwaySubstitute';

const MatchLineup = ({ awaySubs, homeSubs }) => {
	return (
		<div className='row'>
			<div className='col-6'>
				<p
					style={{ fontSize: '16px', fontWeight: '500', marginBottom: '1rem' }}>
					Starting Line-up
				</p>
				<Home />
			</div>
			<div className='col-6'>
				<p
					style={{ fontSize: '16px', fontWeight: '500', marginBottom: '1rem' }}>
					Starting Line-up
				</p>
				<Away />
			</div>
			<div className='col-6'>
				<p
					style={{ fontSize: '16px', fontWeight: '500', marginBottom: '1rem' }}>
					Substitutions
				</p>
				<HomeSubstitute homeSubstitute={homeSubs} />
			</div>
			<div className='col-6'>
				<p
					style={{ fontSize: '16px', fontWeight: '500', marginBottom: '1rem' }}>
					Substitutions
				</p>
				<AwaySubstitute awaySubstitute={awaySubs} />
			</div>
		</div>
	);
};

export default MatchLineup;
