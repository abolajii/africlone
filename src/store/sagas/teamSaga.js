import { takeLatest, put, call } from "redux-saga/effects";
import { TEAM } from "../actions/types";
import { toast } from "react-toastify";
import { fetchTeamSuccess } from "../actions/team";
import axios from "axios";
import NProgress from "nprogress";

const API_BASE_URL = process.env.REACT_APP_BASE_URL;

function* handleAddTeam({ payload, history }) {
  const api = `${API_BASE_URL}/routes/create-team`;

  const apiCall = async () => {
    try {
      const result = await axios(api, { method: "post", data: payload });
      return result;
    } catch (error) {
      throw error;
    }
  };

  try {
    NProgress.start();
    const response = yield call(apiCall);
    if (response?.status === 200) {
      toast.success(response.data.message);
      history.push("/teams");
    } else {
      toast.error(response.message);
    }
  } catch (error) {
    console.log(error);
  }
}

function* handleFetchTeams() {
  const api = `${API_BASE_URL}/routes/all-team`;

  const apiCall = async () => {
    try {
      const result = await axios.post(api);
      return result;
    } catch (error) {
      throw error;
    }
  };

  try {
    NProgress.start();
    const response = yield call(apiCall);

    if (response?.status === 200) {
      yield put(fetchTeamSuccess(response.data.data));
    } else {
      toast.error("Error fetching all teams");
    }
  } catch (error) {
    return error;
  } finally {
    NProgress.done();
  }
}

const teamSaga = [
  takeLatest(TEAM.FETCH_TEAMS, handleFetchTeams),
  takeLatest(TEAM.ADD_TEAM, handleAddTeam),
];

export default teamSaga;
