import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import "../../../styles/starting-line-up.scss";
import { getLineUps, addSubs } from "../../../services/match.service";
import { Checkbox } from "@material-ui/core";

const STATUS = {
    IDLE: "IDLE",
    SUBMITTED: "SUBMITTED",
    SUBMITTING: "SUBMITTING",
    COMPLETED: "COMPLETED"
};

export default function StartingSubs() {
    const location = useLocation();
    const history = useHistory();
    const [homeTeam, setHomeTeam] = useState(null);
    const [awayTeam, setAwayTeam] = useState(null);
    const [status, setStatus] = useState(STATUS.IDLE);
    const [homePlayers, setHomePlayers] = useState([]);
    const [awayPlayers, setAwayPlayers] = useState([]);
    const [homeSubs, setHomeSubs] = useState([]);
    const [awaySubs, setAwaySubs] = useState([]);
    const [valid, setValid] = useState(true);
    const [able, setAble] = useState(true);
    const [networkError, setNetworkError] = useState(null);

    useEffect(() => {
        getLineUps(location.state.home_team_id)
            .then(response => response.json())
            .then(data => {
                const mStatus = data.status;
                if (mStatus === 200 || mStatus === 'Success') {
                    setHomeTeam(data.data.team_name);
                    let availableHomePlayers = data.data.squad.filter(function (player) {
                        if (location.state.home_team.includes(player._id) === false) {
                            return player
                        }
                    });
                    setHomePlayers(availableHomePlayers);
                } else {
                    setNetworkError(`${data.message}`)
                }
            })
            .catch(reason => {
                setNetworkError(`${reason}`)
            });

        getLineUps(location.state.away_team_id)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                const mStatus = data.status;
                if (mStatus === 200 || mStatus === 'Success') {
                    setAwayTeam(data.data.team_name);
                    let availableAwayPlayers = data.data.squad.filter(function (player) {
                        if (location.state.away_team.includes(player._id) === false) {
                            return player
                        }
                    })
                    setAwayPlayers(availableAwayPlayers);
                } else {
                    setNetworkError(`${data.message}`)
                }
            })
            .catch(reason => {
                setNetworkError(`${reason}`)
            });

    }, [location]);

    function handleHomeChange(e, index) {
        const { value, checked } = e.target;

        setHomeSubs((current) => {
            if (checked === true) {
                if (homeSubs.includes(value) === false) {
                    return [...current, value]
                } else {
                    return [...current]
                }
            } else {
                if (homeSubs.includes(value) === false) {
                    return [...current]
                } else {
                    return [...current.filter(id => id !== value)]
                }
            }
        });

        console.log(homeSubs.length > 1 && awaySubs.length > 1);
        if (homeSubs.length > 1 && awaySubs.length > 1) {
            setValid(false);
        }

    }

    function handleAwayChange(e, index) {
        const { value, checked } = e.target;

        setAwaySubs((current) => {
            if (checked === true) {
                if (awaySubs.includes(value) === false) {
                    return [...current, value]
                } else {
                    return [...current]
                }
            } else {
                if (awaySubs.includes(value) === false) {
                    return [...current]
                } else {
                    return [...current.filter(id => id !== value)]
                }
            }
        })
        console.log(homeSubs.length > 1 && awaySubs.length > 1);
        if (homeSubs.length > 3 && awaySubs.length > 3) {
            setValid(false);
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        setStatus(STATUS.SUBMITTING);
        addSubs({ matchId: `${location.state.match}`, teamASubs: homeSubs, teamBSubs: awaySubs, teamA: location.state.home_team, teamB: location.state.away_team })
            .then(response => response.json())
            .then(data => {
                if (data.status === 200) {
                    console.log(data);
                    setValid(true);
                    setAble(false);
                }
            })
            .catch(reason => {
                setNetworkError(`${reason}`)
            })

    }

    function proceed(e) {
        history.push({
            pathname: `/match/start-match/${location.state.match}`,
            state: {
                match: location.state.match
            }
        });
    }

    return (
        <div className="starting-line-up container-fluid pt-3">
            {networkError !== null && status === STATUS.COMPLETED && (
                <div role="alert">
                    <ul style={{ color: "red" }} key="password">{networkError}</ul>
                </div>
            )}
            <div className="row">
                <div className="col-lg-6">
                    <p className="header mb-2">
                        Select Team Substitutes for {homeTeam}
                    </p>
                    <div className="players-list">
                        <div className="row pl-0 pr-lg-5">
                            <div className="col-lg-6">
                                <ul>
                                    {homePlayers?.map((player, index) => (
                                        <li key={player._id} >
                                            <Checkbox che onChange={(e) => handleHomeChange(e, index)} key={player._id} value={player._id} color="primary" />
                                            <span className="text-muted">{player.number}.</span>
                                            {player.name}
                                            <small>{player.position}</small>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="col-lg-6">
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6">
                    <p className="header mb-2">
                        Select Team Substitutes for {awayTeam}
                    </p>
                    <div className="players-list">
                        <div className="row">
                            <div className="col-lg-6">
                                <ul>
                                    {awayPlayers?.map((player, index) => (
                                        <li key={player._id} >
                                            <Checkbox onChange={(e) => handleAwayChange(e, index)} key={player._id} value={player._id} color="primary" />
                                            <span className="text-muted">{player.number}.</span>

                                            {player.name}
                                            <small>{player.position}</small>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="col-lg-6">
                            </div>
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
                        Save <i className="ml-6"/>
                    </button>
                </div>

                <div className="col-lg-2">
                    <button
                        disabled={able}
                        className="btn primary-btn btn-sm"
                        onClick={proceed}
                    >
                        Proceed <i className="mdi mdi-arrow-right ml-1"/>
                    </button>
                </div>
            </div>
        </div>
    );
}

