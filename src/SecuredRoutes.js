import React, { useContext, useEffect } from 'react';
import Loadable from 'react-loadable';
import Loader from './helpers/Loader';
import { Switch, Route, useHistory } from 'react-router-dom';
import Footer from './components/Global/Footer';
import './styles/container.scss';
import { GlobalContext } from './context/Global';

const Login = Loadable({
	loader: () => import('./components/Auth/Login'),
	loading: Loader,
	delay: 100,
});

const Home = Loadable({
	loader: () => import('./components/Home/Home'),
	loading: Loader,
	delay: 100,
});

const Matches = Loadable({
	loader: () => import('./components/Matches/Matches'),
	loading: Loader,
	delay: 100,
});

const Teams = Loadable({
	loader: () => import('./components/Team'),
	loading: Loader,
	delay: 100,
});

const AddPlayers = Loadable({
	loader: () => import('./components/Teams/AddPlayers'),
	loading: Loader,
	delay: 100,
});

const Competitions = Loadable({
	loader: () => import('./components/Competitions/Competitions'),
	loading: Loader,
	delay: 100,
});

const Seasons = Loadable({
	loader: () => import('./components/Seasons/Seasons'),
	loading: Loader,
	delay: 100,
});

const Stadiums = Loadable({
	loader: () => import('./components/Stadiums/Stadiums'),
	loading: Loader,
	delay: 100,
});

const Countries = Loadable({
	loader: () => import('./components/Countries/Countries'),
	loading: Loader,
	delay: 100,
});

const AddCompetitions = Loadable({
	loader: () => import('./components/Competitions/AddCompetition'),
	loading: Loader,
	delay: 100,
});

const AddMatch = Loadable({
	loader: () => import('./container/AddMatchContainer'),
	loading: Loader,
	delay: 100,
});

const EditMatch = Loadable({
	loader: () => import('./components/EditMatch'),
	loading: Loader,
	delay: 100,
});

const Lineup = Loadable({
	loader: () => import('./components/Matches/StartingLineUp'),
	loading: Loader,
	delay: 100,
});

const Subs = Loadable({
	loader: () => import('./components/Matches/StartingSubs'),
	loading: Loader,
	delay: 100,
});

const StartMatch = Loadable({
	loader: () => import('./components/Matches/StartMatch/index'),
	loading: Loader,
	delay: 100,
});

const MatchFixture = Loadable({
	loader: () => import('./container/MatchFixtureContainer'),
	loading: Loader,
	delay: 100,
});

const SelectLineup = Loadable({
	loader: () => import('./components/SelectTeamLineup'),
	loading: Loader,
	delay: 100,
});

const StartMatchV2 = Loadable({
	loader: () => import('./components/Matches/StartMatchV2'),
	loading: Loader,
	delay: 100,
});

const CreateCompetition = Loadable({
	loader: () => import('./components/Competitions/CreateCompetition'),
	loading: Loader,
	delay: 100,
});

const EditCompetition = Loadable({
	loader: () => import('./components/Competitions/Edit'),
	loading: Loader,
	delay: 100,
});
const ViewCompetition = Loadable({
	loader: () => import('./components/Competitions/ViewCompetition'),
	loading: Loader,
	delay: 100,
});

const CreateTeam = Loadable({
	loader: () => import('./components/Team/CreateTeam'),
	loading: Loader,
	delay: 100,
});

const ViewTeam = Loadable({
	loader: () => import('./components/Team/ViewTeam'),
	loading: Loader,
	delay: 100,
});

const EditTeam = Loadable({
	loader: () => import('./components/Team/EditTeam'),
	loading: Loader,
	delay: 100,
});

const Players = Loadable({
	loader: () => import('./components/Players'),
	loading: Loader,
	delay: 100,
});

const CreatePlayer = Loadable({
	loader: () => import('./components/Players/CreatePlayer'),
	loading: Loader,
	delay: 100,
});

const EditPlayer = Loadable({
	loader: () => import('./components/Players/EditPlayer'),
	loading: Loader,
	delay: 100,
});

const ViewStats = Loadable({
	loader: () => import('./components/Players/ViewStats'),
	loading: Loader,
	delay: 100,
});

const EditStats = Loadable({
	loader: () => import('./components/Players/EditStats'),
	loading: Loader,
	delay: 100,
});

export default function SecuredRoutes(props) {
	const { setId } = useContext(GlobalContext);

	const history = useHistory();

	let data = localStorage.getItem('user');
	if (!data || data.length < 3) {
		history.push('/login');
		setId(1);
	}

	return (
		<div className='main-container container-fluid'>
			<Switch>
				<Route path='/' exact component={Home} />
				<Route path='/home' exact component={Home} />
				<Route path='/teams' exact component={Teams} />
				<Route path='/players' exact component={Players} />
				<Route path='/create-player' exact component={CreatePlayer} />
				<Route path='/edit-player/:id' exact component={EditPlayer} />
				<Route path='/view-stats/:id' exact component={ViewStats} />
				<Route path='/edit-stats' exact component={EditStats} />
				<Route path='/create-team' exact component={CreateTeam} />
				<Route path='/view-team/:team_id' exact component={ViewTeam} />
				<Route path='/edit-team/:id' exact component={EditTeam} />
				<Route path='/add-players' exact component={AddPlayers} />
				<Route path='/competitions' exact component={Competitions} />
				<Route path='/seasons' exact component={Seasons} />
				<Route path='/stadiums' exact component={Stadiums} />
				<Route path='/countries' exact component={Countries} />
				<Route path='/matches' exact component={Matches} />
				<Route path='/matchfixture' exact component={MatchFixture} />
				<Route path='/select-team' exact component={SelectLineup} />
				<Route path='/add-competition' exact component={AddCompetitions} />
				<Route path='/create-competition' exact component={CreateCompetition} />
				<Route path='/view-competition/:id' exact component={ViewCompetition} />
				<Route path='/edit-competition/:id' exact component={EditCompetition} />
				<Route path='/add-match' exact component={AddMatch} />
				<Route path='/edit-match' exact component={EditMatch} />
				<Route path='/match/subs/:id' exact component={Subs} />
				<Route path='/match/lineup/:id' exact component={Lineup} />

				{/* <Route path="/match/start-match/:id" exact component={StartMatch} /> */}
				<Route path='/match/start-match' exact component={StartMatch} />
			</Switch>

			<Footer />
		</div>
	);
}
