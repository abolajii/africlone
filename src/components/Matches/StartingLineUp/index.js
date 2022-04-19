import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import "../../../styles/starting-line-up.scss";
import { getLineUps } from "../../../services/match.service";
import { Checkbox } from "@material-ui/core";

const STATUS = {
  IDLE: "IDLE",
  SUBMITTED: "SUBMITTED",
  SUBMITTING: "SUBMITTING",
  COMPLETED: "COMPLETED",
};

export default function StartingLineUp({ route }) {
  const location = useLocation();
  const history = useHistory();
  const [homeTeam, setHomeTeam] = useState(null);
  const [awayTeam, setAwayTeam] = useState(null);
  const [homeTeamId, setHomeTeamId] = useState(null);
  const [awayTeamId, setAwayTeamId] = useState(null);
  const [status, setStatus] = useState(STATUS.IDLE);
  const [homePlayers, setHomePlayers] = useState([]);
  const [awayPlayers, setAwayPlayers] = useState([]);
  const [homeLineUp, setHomeLineUp] = useState([]);
  const [awayLineUp, setAwayLineUp] = useState([]);
  const [valid, setValid] = useState(true);
  const [able, setAble] = useState(true);
  const [networkError, setNetworkError] = useState(null);

  useEffect(() => {
    getLineUps(location.state.home_team.id)
      .then((response) => response.json())
      .then((data) => {
        const mStatus = data.status;
        if (mStatus === 200 || mStatus === "Success") {
          setHomeTeamId(data.data._id);
          setHomeTeam("data.data.team_name");
          setHomePlayers(data.data.squad);
        } else {
          setNetworkError(`${data.message}`);
        }
      })
      .catch((reason) => {
        setNetworkError(`${reason}`);
      });

    getLineUps(location.state.away_team.id)
      .then((response) => response.json())
      .then((data) => {
        const mStatus = data.status;
        if (mStatus === 200 || mStatus === "Success") {
          setAwayTeamId(data.data._id);
          setAwayTeam("data.data.team_name");
          setAwayPlayers(data.data.squad);
        } else {
          setNetworkError(`${data.message}`);
        }
      })
      .catch((reason) => {
        setNetworkError(`${reason}`);
      });
  }, [location]);

  const handlePlayerSection = (e, previouslySelectedPlayerList, home) => {
    const { value, checked } = e.target;

    let updatedSelectedPlayerList = [...previouslySelectedPlayerList];

    if (checked && !updatedSelectedPlayerList.includes(value)) {
      updatedSelectedPlayerList.push(value);
    }

    if (home) setHomeLineUp(updatedSelectedPlayerList);
    else setAwayLineUp(updatedSelectedPlayerList);
  };

  const checkFirstElevenSelected = () => {
    if (homeLineUp.length === 11 && awayLineUp.length === 11) {
      setValid(false);
    } else {
      setValid(true);
    }
  };

  useEffect(() => {
    checkFirstElevenSelected();
  }, [homeLineUp, awayLineUp]);

  function handleSubmit(e) {
    e.preventDefault();
    setStatus(STATUS.SUBMITTING);

    setValid(true);
    setAble(false);
  }

  function proceed(e) {
    console.log("STATE", location.state);
    history.push({
      pathname: `/match/subs/${location.state.match}`,
      state: {
        match: location.state.match,
        home_team_id: homeTeamId,
        away_team_id: awayTeamId,
        home_team: homeLineUp,
        away_team: awayLineUp,
      },
    });
  }

  return (
    <div className="starting-line-up container-fluid pt-3">
      {networkError !== null && status === STATUS.COMPLETED && (
        <div role="alert">
          <ul style={{ color: "red" }} key="password">
            {networkError}
          </ul>
        </div>
      )}
      <div className="row">
        <div className="col-lg-6">
          <p className="header mb-2">Select Team lineup for {homeTeam}</p>
          <div className="players-list">
            <div className="row pl-0 pr-lg-5">
              <div className="col-lg-6">
                <ul>
                  {homePlayers?.map((player, index) => (
                    <li key={`${player._id}${index}li`}>
                      <Checkbox
                        disabled={!homeLineUp.includes(player._id) && !valid}
                        onChange={(e) =>
                          handlePlayerSection(e, homeLineUp, true)
                        }
                        key={`${player._id}${index}`}
                        value={player._id}
                        color="primary"
                      />
                      <span className="text-muted">{player.number}.</span>
                      {player.name}
                      <small>{player.position}</small>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="col-lg-6"></div>
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <p className="header mb-2">Select Team lineup for {awayTeam}</p>
          <div className="players-list">
            <div className="row">
              <div className="col-lg-6">
                <ul>
                  {awayPlayers?.map((player, index) => (
                    <li key={`${player._id}${index}li`}>
                      <Checkbox
                        disabled={!awayLineUp.includes(player._id) && !valid}
                        onChange={(e) =>
                          handlePlayerSection(e, awayLineUp, false)
                        }
                        key={`${player._id}${index}`}
                        value={player._id}
                        color="primary"
                      />
                      <span className="text-muted">{player.number}.</span>
                      {player.name}
                      <small>{player.position}</small>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="col-lg-6"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="row justify-content-end mt-3">
        <div className="col-lg-2">
          <button
            disabled={valid}
            className="btn primary-btn btn-sm"
            onClick={handleSubmit}
          >
            Save <i className="ml-6" />
          </button>
        </div>

        <div className="col-lg-2">
          <button
            disabled={able}
            className="btn primary-btn btn-sm"
            onClick={proceed}
          >
            Proceed <i className="mdi mdi-arrow-right ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
}
