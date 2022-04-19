import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "../../../styles/create-team.scss";
import { createCompetition } from "../../../services/competition.service";

const STATUS = {
  IDLE: "IDLE",
  SUBMITTED: "SUBMITTED",
  SUBMITTING: "SUBMITTING",
  COMPLETED: "COMPLETED",
};

const compDetails = {
  competition_name: "",
  abbrev: "",
  type: "",
  country: "",
  season: "",
  limit: "",
};

export default function CreateTeam(props) {
  const history = useHistory();
  // const dispatch = useDispatch();
  const [status, setStatus] = useState(STATUS.IDLE);
  const [state, setState] = useState(compDetails);
  const [networkError, setNetworkError] = useState(null);
  const [networkSuccess, setNetworkSuccess] = useState(null);

  // DERIVED STATE
  const errors = getErrors(state);
  const isValid = Object.keys(errors).length === 0;

  async function handleSubmit(e) {
    e.preventDefault();
    // dispatch(addCompetition({ data: state, history: props.history }));
    setNetworkError(null);
    setNetworkSuccess(null);
    setStatus(STATUS.SUBMITTING);
    if (isValid) {
      createCompetition(state)
        .then((response) => response.json())
        .then((data) => {
          let status = data.status;
          console.log(status);
          let msg = data.message;
          if (status === 200) {
            setNetworkSuccess(msg);
          } else {
            setNetworkError(msg);
          }
        })
        .catch((reason) => {
          setNetworkError(`${reason}`);
        });
      setStatus(STATUS.COMPLETED);
    } else {
      setStatus(STATUS.SUBMITTED);
    }
  }

  function handleChange(e) {
    const { id, value } = e.target;
    setState((current) => {
      return {
        ...current,
        [id]: value,
      };
    });
  }

  function getErrors(state) {
    const result = {};
    if (!state.competition_name) result.competition_name = "Name is required";
    if (!state.abbrev) result.abbrev = "Abbreviation is required";
    if (!state.type) result.type = "Type is required";
    if (!state.country) result.country = "Country is required";
    if (!state.season) result.season = "Season is required";
    if (!state.limit) result.limit = "Limit is required";
    return result;
  }

  return (
    <div className="create-team container-fluid mb-3">
      <div className="row mb-0">
        <p className="header">
          <i className="mdi mdi-trophy-outline mr-1" /> Create Competition
        </p>
        <button
          className="btn btn-xs primary-btn ml-auto"
          onClick={() => history.push("/")}
        >
          <i className="mdi mdi-arrow-left mr-1" />
          Back
        </button>
      </div>
      <div className="row mt-4 justify-content-center inner-content-wrapper">
        <div className="col-12 px-lg-4">
          <form autoComplete="on" onSubmit={handleSubmit} className="row">
            <div className="col-md-6 form-group">
              <label>Competition Logo</label>
              <div className="d-flex">
                <div
                  style={{
                    width: "100px",
                    height: "100px",
                    background: "#E5E5E5",
                    borderRadius: "50%",
                    marginRight: "1rem",
                  }}
                ></div>
                <div className="d-flex flex-column justify-content-center">
                  <span>No file added</span>
                  <p
                    style={{
                      color: "#FE4302",
                      fontSize: "15px",
                      fontWeight: "500",
                    }}
                  >
                    Add Image
                  </p>
                </div>
              </div>
            </div>

            <div className="form-group  col-md-6">
              <label>Country</label>
              <input
                className="form-control"
                type="text"
                name="country"
                id="country"
                value={state.country}
                placeholder="Nigeria"
                onChange={handleChange}
              />
              {!isValid && status === STATUS.SUBMITTED && (
                <div role="alert">
                  <ul style={{ color: "red" }} key="email">
                    {errors.country}
                  </ul>
                </div>
              )}
            </div>

            <div className="form-group  col-md-6">
              {networkError !== null && status === STATUS.COMPLETED && (
                <div role="alert">
                  <ul style={{ color: "red" }} key="password">
                    {networkError}
                  </ul>
                </div>
              )}
              {networkSuccess !== null && status === STATUS.COMPLETED && (
                <div role="alert">
                  <ul style={{ color: "blue" }} key="password">
                    {networkSuccess}
                  </ul>
                </div>
              )}
              <label>Competition Name</label>
              <input
                className="form-control"
                type="text"
                name="competition_name"
                id="competition_name"
                value={state.competition_name}
                placeholder="Nigeria Professional Football League"
                onChange={handleChange}
              />
              {!isValid && status === STATUS.SUBMITTED && (
                <div role="alert">
                  <ul style={{ color: "red" }} key="email">
                    {errors.competition_name}
                  </ul>
                </div>
              )}
            </div>
            <div className="form-group col-md-6">
              <label>Abbreviation</label>
              <input
                className="form-control"
                type="text"
                name="abbrev"
                id="abbrev"
                value={state.abbrev}
                placeholder="NPFL"
                onChange={handleChange}
              />
              {!isValid && status === STATUS.SUBMITTED && (
                <div role="alert">
                  <ul style={{ color: "red" }} key="email">
                    {errors.abbrev}
                  </ul>
                </div>
              )}
            </div>

            <div className="form-group  col-md-6">
              <label>Type</label>
              <select
                className="form-control"
                name="type"
                id="type"
                value={state.type}
                onChange={handleChange}
              >
                <option>Select type</option>
                <option>League</option>
                <option>Cup</option>
              </select>
              {!isValid && status === STATUS.SUBMITTED && (
                <div role="alert">
                  <ul style={{ color: "red" }} key="email">
                    {errors.type}
                  </ul>
                </div>
              )}
            </div>

            <div className="form-group  col-md-6">
              <label>Max Number of Teams</label>
              <input
                className="form-control"
                type="number"
                name="limit"
                id="limit"
                value={state.limit}
                placeholder="20"
                onChange={handleChange}
              />
              {!isValid && status === STATUS.SUBMITTED && (
                <div role="alert">
                  <ul style={{ color: "red" }} key="email">
                    {errors.limit}
                  </ul>
                </div>
              )}
            </div>

            <div className="col-12 text-center">
              <button
                style={{ background: "#B7B7B7", color: "#fff" }}
                disabled={status === STATUS.SUBMITTING}
                className="btn mt-2 px-3 py-2"
              >
                CREATE COMPETITION
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
