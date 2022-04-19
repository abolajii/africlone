import { COMPETITION } from "./types";

const fetchCompetitions = () => ({
  type: COMPETITION.FETCH_ALL,
});

const fetchCompetitionsSuccess = (data) => {
  return {
    type: COMPETITION.FETCH_ALL_SUCCESS,
    payload: data,
  };
};

const addCompetition = ({ data, history }) => ({
  type: COMPETITION.ADD_COMPETITION,
  payload: data,
  history,
});

export { fetchCompetitions, fetchCompetitionsSuccess, addCompetition };
