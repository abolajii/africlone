import { call, takeLatest, put } from "redux-saga/effects";
import { fetchCompetitionsSuccess } from "../actions/competition";
import { COMPETITION } from "../actions/types";
import { toast } from "react-toastify";
import axios from "axios";
import NProgress from "nprogress";

const API_BASE_URL = process.env.REACT_APP_BASE_URL;

function* handleFetchCompetitons() {
  const api = `${API_BASE_URL}/routes/all-comp`;

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
    const { data } = yield call(apiCall);

    yield put(fetchCompetitionsSuccess(data.data));
  } catch (error) {
    return error;
  } finally {
    NProgress.done();
  }
}

function* handleAddCompetition({ payload, history }) {
  const api = `${API_BASE_URL}/routes/create-comp`;

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
    const result = yield call(apiCall);

    if (result.data.status === 200) {
      toast.success(result.data.message);
      history.push("/competitions");
    } else {
      toast.error(result.data.message);
    }
  } catch (error) {
    console.log(error);
  } finally {
    NProgress.done();
  }
}

const competitionSaga = [
  takeLatest(COMPETITION.FETCH_ALL, handleFetchCompetitons),
  takeLatest(COMPETITION.ADD_COMPETITION, handleAddCompetition),
];

export default competitionSaga;
