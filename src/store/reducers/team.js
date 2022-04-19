import { TEAM } from "../actions/types";

const teamReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case TEAM.FETCH_TEAMS_SUCCESS:
      return { ...state, teams: payload };

    default:
      return state;
  }
};

export default teamReducer;
