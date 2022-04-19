import { takeLatest, call } from "redux-saga/effects";
import { MATCH } from "../actions/types";
import { toast } from "react-toastify";
import axios from "axios";
import NProgress from "nprogress";

const API_BASE_URL = process.env.REACT_APP_BASE_URL;

function* handleAddMatch({ payload, history }) {
  const api = `${API_BASE_URL}/routes/create-match`;

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
      history.push("/matches");
    } else {
      toast.error(result.data.message);
    }
  } catch (error) {
    console.log(error);
  } finally {
    NProgress.done();
  }
}

// function* handleFetchMatches() {
//   const api = `${API_BASE_URL}/routes/create-match`;
// }

const matchSaga = [
  takeLatest(MATCH.ADD_MATCH, handleAddMatch),
  // takeLatest(MATCH.FETCH_MATCHES, handleFetchMatches),
];

export default matchSaga;
