import competitionSaga from "./competitonSaga";
import teamSaga from "./teamSaga";
import matchSaga from "./matchSaga";
import eventSaga from "./player/eventSaga";
import { all } from "redux-saga/effects";

export default function* rootSaga() {
  yield all([...competitionSaga, ...teamSaga, ...matchSaga, ...eventSaga]);
}