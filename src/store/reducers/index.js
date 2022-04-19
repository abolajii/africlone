import { combineReducers } from "redux";
import competition from "./competition";
import event from "./player/event";
import team from "./team"

const rootReducer = combineReducers({
  competition, team, event
});

export default rootReducer;
