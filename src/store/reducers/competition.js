import { COMPETITION } from "../actions/types";

const competitionReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case COMPETITION.FETCH_ALL_SUCCESS:
      return { ...state, competitions: payload };

    default:
      return state;
  }
};

export default competitionReducer;
