import { TEAM } from "./types";

const fetchTeam = () => ({
  type: TEAM.FETCH_TEAMS,
});

const fetchTeamSuccess = (data) => ({
  type: TEAM.FETCH_TEAMS_SUCCESS,
  payload: data,
});

const addTeam = ({data, history}) => ({
  type: TEAM.ADD_TEAM,
  payload: data,
  history
});

export { fetchTeam, fetchTeamSuccess, addTeam };
