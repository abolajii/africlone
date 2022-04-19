import React, { useEffect, useState } from "react";
import "../../../styles/add-match.scss";
import { useHistory } from "react-router-dom";
import { getCompetitionWithSeason } from "../../../services/competition.service";
import { getTeamsWithSeasons } from "../../../services/team.service";
import { CreateMatch } from "../../../services/match.service";
import { Overlay } from "react-portal-overlay";
import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/core";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: "red";
`;

const STATUS = {
  IDLE: "IDLE",
  SUBMITTED: "SUBMITTED",
  SUBMITTING: "SUBMITTING",
  COMPLETED: "COMPLETED",
};

const matchDetails = {
  season_id: "",
  home_team: "",
  away_team: "",
  location: "",
  date: "",
  time: "",
};

export default function Add(props) {
  const [data, setData] = useState({});
  const [networkError, setNetworkError] = useState(null);
  const [button, setButton] = useState(true);
  const [status, setStatus] = useState(STATUS.IDLE);
  const [matchId, setMatchId] = useState(null);
  const [competitions, setCompetitions] = useState([]);
  const [teams, setTeams] = useState([]);
  const [match, setMatch] = useState(matchDetails);
  const [loadingSpinner, setLoadingSpinner] = useState(false);
  const [startMatch, setStartMatch] = useState(false);

  // DERIVED STATE
  const errors = getErrors(match);
  const isValid = Object.keys(errors).length === 0;

  const CustomSpinner = () => {
    return (
      <Overlay
        className="modal"
        closeOnClick={true}
        open={loadingSpinner}
        onClose={() => {
          setLoadingSpinner(false);
        }}
      >
        <ClipLoader css={override} size={50} color={"#123abc"} loading={true} />
      </Overlay>
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus(STATUS.SUBMITTING);
    if (isValid && button === true) {
      setLoadingSpinner(true);
      CreateMatch(data)
        .then((response) => response.json())
        .then((data) => {
          console.log("here", data);

          setLoadingSpinner(false);

          let status = data.status;
          if (status === 200) {
            console.log("here", data.match._id);
            setMatchId(data.match._id);
            setButton(false);
          } else {
            setNetworkError(data.message);
          }
        })
        .catch((reason) => {
          setLoadingSpinner(false);
          setNetworkError(`${reason}`);
        });
      setStatus(STATUS.COMPLETED);
    } else {
      setStatus(STATUS.SUBMITTED);
      setStartMatch(true);
    }
  };

  useEffect(() => {
    setLoadingSpinner(true);
    getTeamsWithSeasons()
      .then((response) => response.json())
      .then((data) => {
        setLoadingSpinner(false);

        const mStatus = data.status;
        if (mStatus === "Success" || mStatus === 200) {
          setTeams(data.data);
        }
      })
      .catch((reason) => {
        setLoadingSpinner(false);
        console.log(reason);
      });
  }, []);

  useEffect(() => {
    getCompetitionWithSeason()
      .then((response) => response.json())
      .then((mData) => {
        const mStatus = mData.status;
        if (mStatus === 200 || mStatus === "Success") {
          setCompetitions(mData.data);
        }
      })
      .catch((reason) => {
        console.log(reason);
      });
  }, []);

  const history = useHistory();

  function handleChange(e) {
    const { name, id, value } = e.target;

    setMatch((current) => {
      return {
        ...current,
        [id]: value,
      };
    });
    setData({ ...data, [name]: value });
  }

  function getErrors(state) {
    const result = {};
    if (!state.season_id) result.season_id = "Competition is required";
    if (!state.home_team) result.home_team = "Home Team is required";
    if (!state.away_team) result.away_team = "Away Team is required";
    if (!state.location) result.location = "Location is required";
    if (!state.date) result.date = "Date is required";
    if (!state.time) result.time = "Time is required";
    return result;
  }

  const lineup = () => {
    history.push({
      pathname: `/match/lineup/${matchId}`,
      state: {
        home_team: {
          id: data.team_A_id,
          name: match.home_team,
        },
        away_team: {
          id: data.team_B_id,
          name: match.away_team,
        },
        match: matchId,
      },
    });
  };

  const StartMatchModal = () => {
    return (
      <>
        {startMatch ? (
          <div className="modal" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <small className="modal-title" id="exampleModalLabel">
                  Start the match now?
                </small>
                <button
                  onClick={() => {
                    setStartMatch(false);
                  }}
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className=" text-center">
                  <div />
                  <button
                    onClick={() => {
                      setStartMatch(false);
                    }}
                    className="btn btn-sm p-2 px-3 mr-1 btn-danger"
                    style={{ fontSize: "12px" }}
                  >
                    No
                  </button>
                  <button
                    className="btn btn-sm primary-btn p-2"
                    style={{ fontSize: "12px" }}
                    data-dismiss="modal"
                    onClick={lineup}
                  >
                    Yes, start match
                  </button>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  onClick={() => {
                    setStartMatch(false);
                  }}
                  type="button"
                  className="btn btn-xs btn-light"
                  data-dismiss="modal"
                >
                  <small>Close</small>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </>
    );
  };

  return (
    <>
      <div className="add-match container-fluid">
        <div className="row mb-0 mt-2">
          <p className="header">
            <i className="mdi mdi-soccer mr-1" /> Add Match
          </p>
          <button
            className="btn btn-xs primary-btn ml-auto"
            onClick={() => history.push("/matches")}
          >
            <i className="mdi mdi-arrow-left mr-1" />
            Back
          </button>
        </div>

        <div className="row mt-4 justify-content-center inner-content-wrapper">
          <div className="col-lg-6">
            {networkError !== null && status === STATUS.COMPLETED && (
              <div role="alert">
                <ul style={{ color: "red" }} key="password">
                  {networkError}
                </ul>
              </div>
            )}
            <form>
              <div className="form-group">
                <label>Choose Competition</label>
                <select
                  onChange={handleChange}
                  name="season_id"
                  id="season_id"
                  value={match.season_id}
                  className="form-control"
                >
                  <option>Select Competition</option>
                  {competitions?.map((competition) => {
                    return (
                      <>
                        {competition?.competition_name && (
                          <option key={competition._id} value={competition._id}>
                            {`${competition.competition_name} ${competition.season_name}`}
                          </option>
                        )}
                      </>
                    );
                  })}
                </select>
                {!isValid && status === STATUS.SUBMITTED && (
                  <div role="alert">
                    <ul style={{ color: "red" }} key="email">
                      {errors.season_id}
                    </ul>
                  </div>
                )}
              </div>

              <div className="form-group">
                <label>Choose Home Team</label>
                <select
                  onChange={handleChange}
                  name="team_A_id"
                  id="home_team"
                  value={match.home_team}
                  className="form-control"
                >
                  <option>Select Home Team</option>
                  {teams?.map((team) => {
                    return (
                      <>
                        {team?.team_name && (
                          <option
                            key={team._id}
                            value={team._id}
                            disabled={team._id === data.team_B_id}
                          >
                            {`${team.team_name} ${team.season_name}`}
                          </option>
                        )}
                      </>
                    );
                  })}
                </select>
                {!isValid && status === STATUS.SUBMITTED && (
                  <div role="alert">
                    <ul style={{ color: "red" }} key="email">
                      {errors.home_team}
                    </ul>
                  </div>
                )}
              </div>

              <div className="form-group">
                <label>Choose Away Team</label>
                <select
                  onChange={handleChange}
                  name="team_B_id"
                  id="away_team"
                  value={match.away_team}
                  className="form-control"
                >
                  <option>Select Away Team</option>
                  {teams?.map((team) => {
                    return (
                      <>
                        {team?.team_name && (
                          <option
                            key={team._id}
                            value={team._id}
                            disabled={team._id === data.team_A_id}
                          >
                            {`${team.team_name} ${team.season_name}`}
                          </option>
                        )}
                      </>
                    );
                  })}
                </select>
                {!isValid && status === STATUS.SUBMITTED && (
                  <div role="alert">
                    <ul style={{ color: "red" }} key="email">
                      {errors.away_team}
                    </ul>
                  </div>
                )}
              </div>

              <div className="form-group">
                <label>Location</label>
                <input
                  onChange={handleChange}
                  name="location"
                  id="location"
                  value={match.location}
                  className="form-control"
                  placeholder="Lagos State Stadium, Surulere"
                />
                {!isValid && status === STATUS.SUBMITTED && (
                  <div role="alert">
                    <ul style={{ color: "red" }} key="email">
                      {errors.location}
                    </ul>
                  </div>
                )}
              </div>

              <div className="form-group">
                <label>Date</label>
                <input
                  onChange={handleChange}
                  name="date"
                  id="date"
                  type="date"
                  value={match.date}
                  className="form-control"
                />
                {!isValid && status === STATUS.SUBMITTED && (
                  <div role="alert">
                    <ul style={{ color: "red" }} key="email">
                      {errors.date}
                    </ul>
                  </div>
                )}
              </div>

              <div className="form-group">
                <label>Time</label>
                <input
                  onChange={handleChange}
                  name="time"
                  id="time"
                  type="time"
                  value={match.time}
                  className="form-control"
                />
                {!isValid && status === STATUS.SUBMITTED && (
                  <div role="alert">
                    <ul style={{ color: "red" }} key="email">
                      {errors.time}
                    </ul>
                  </div>
                )}
              </div>

              <div className="col-lg-3 pl-0">
                <button
                  disabled={!button}
                  className="btn primary-btn col-md-4 mt-2"
                  onClick={handleSubmit}
                >
                  Add Match
                </button>
              </div>

              <div className="col-lg-3 pl-0">
                <button
                  disabled={button}
                  className="btn primary-btn col-md-4 mt-2"
                  onClick={handleSubmit}
                  data-toggle="modal"
                  data-target="#add_match"
                >
                  Start Match
                </button>
              </div>
            </form>
          </div>
        </div>

        <StartMatchModal />

        <CustomSpinner />
      </div>
    </>
  );
}
