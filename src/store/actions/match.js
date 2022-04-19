import { MATCH } from "./types";

const addMatch = ({ data, history }) => ({
  type: MATCH.ADD_MATCH,
  payload: data,
  history,
});

const fetchMatches = () => ({
  type: MATCH.FETCH_MATCHES,
})



export { addMatch, fetchMatches };
