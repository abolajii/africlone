import React, { useContext } from 'react';
import Loadable from 'react-loadable';
import Loader from './helpers/Loader';
import Modal from './components/Modal';
import { withRouter } from 'react-router';
import { Switch, Route } from 'react-router-dom';
import Header from './components/Global/Header';
import { DBConfig } from './database/DBConfig';
import { initDB } from 'react-indexed-db';

import { CreateModalContext } from './context/Modal';
import Logout from './components/DeleteModal/Logout';
import DeleteCompetitionTeam from './components/Competitions/Modal';

initDB(DBConfig);

const SecuredRoutes = Loadable({
	loader: () => import('./SecuredRoutes'),
	loading: Loader,
	delay: 100,
});

const AddPlayerSeason = Loadable({
	loader: () => import('./components/Players/Modal/AddPlayerSeason'),
	loading: Loader,
	delay: 100,
});

const SeasonModal = Loadable({
	loader: () => import('./components/SeasonModal'),
	loading: Loader,
	delay: 100,
});
const AddTeamModal = Loadable({
	loader: () => import('./components/Team/Modal/AddTeamModal/AddTeamModal'),
	loading: Loader,
	delay: 100,
});

const AddSeasonModal = Loadable({
	loader: () => import('./components/Team/Modal/AddSeasonModal/AddSeasonModal'),
	loading: Loader,
	delay: 100,
});

const DeleteModal = Loadable({
	loader: () => import('./components/DeleteModal'),
	loading: Loader,
	delay: 100,
});

const Spinner = Loadable({
	loader: () => import('./components/Spinner'),
	loading: Loader,
	delay: 100,
});

const StartMatchModal = Loadable({
	loader: () => import('./components/Matches/StartMatch/Modal'),
	loading: Loader,
	delay: 100,
});

const Login = Loadable({
	loader: () => import('./components/Auth/Login'),
	loading: Loader,
	delay: 100,
});

function App() {
	const {
		deleteModalName,
		spin,
		startMatchSpin,
		deleteCompTeam,
		deleteCompType,
		deleteType,
	} = useContext(CreateModalContext);

	return (
		<>
			<Header />
			<Switch>
				<Route exact path='/login' component={Login} />
				<Route path='/' component={SecuredRoutes} />
			</Switch>
			<Modal />
			<SeasonModal />
			<AddTeamModal />
			<AddSeasonModal />
			<AddPlayerSeason />
			<Logout />
			<DeleteModal name={deleteModalName} type={deleteType} />
			<DeleteCompetitionTeam name={deleteCompTeam} type={deleteCompType} />

			{spin && <Spinner />}
			{startMatchSpin && <StartMatchModal />}
		</>
	);
}

export default withRouter(App);
