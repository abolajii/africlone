import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "../../../styles/create-team.scss";

const STATUS = {
    IDLE: "IDLE",
    SUBMITTED: "SUBMITTED",
    SUBMITTING: "SUBMITTING",
    COMPLETED: "COMPLETED"
};

const teamDetails = {
    team_name: "",
    nick_name: "",
    season: "",
    country: ""
};

export default function CreateTeam() {
    const history = useHistory();
    const [data, setData] = useState(teamDetails);
    const [status, setStatus] = useState(STATUS.IDLE);

    // DERIVED STATE
    const errors = getErrors(data);
    const isValid = Object.keys(errors).length === 0;

    function handleSubmit(e) {
        e.preventDefault();
        setStatus(STATUS.SUBMITTING);
        if (isValid) {
            history.push({
                pathname: "/add-players",
                state: data,
            });
            setStatus(STATUS.COMPLETED);
        } else {
            setStatus(STATUS.SUBMITTED);
        }

    }

    function handleChange(e) {
        const { id, value } = e.target;
        setData((curr) => {
            return {
                ...curr,
                [id]: value
            }
        })
    }

    function getErrors(data) {
        const result = {};
        if (!data.team_name) result.name = "Team name is required";
        if (!data.nick_name) result.nick_name = "Nick-name is required";
        if (!data.season) result.season = "Season is required";
        if (!data.country) result.country = "Country is required";
        return result;
    }

    return (
        <div className="create-team container-fluid">
            <div className="row">
                <p className="header">
                    <i className="mdi mdi-vlc mr-1"/> Add Team
                </p>
                <button
                    className="btn btn-xs primary-btn ml-auto"
                    onClick={() => history.push("/teams")}
                >
                    <i className="mdi mdi-arrow-left mr-1" />
                    Back
                </button>
            </div>
            <div className="row mt-3 justify-content-center inner-content-wrapper">
                <div className="col-6">
                    <form autoComplete="on" onSubmit={handleSubmit} >
                        <div className="form-group">
                            <label>Team Name</label>
                            <input
                                className="form-control"
                                type="text"
                                name="team_name"
                                id="team_name"
                                value={data.team_name}
                                placeholder="Enymiba Football Club"
                                onChange={handleChange}
                            />
                            {!isValid && status === STATUS.SUBMITTED && (
                                <div role="alert">
                                    <ul style={{ color: "red" }} key="email">{errors.name}</ul>
                                </div>
                            )}
                        </div>

                        <div className="form-group">
                            <label>Nick Name</label>
                            <input
                                className="form-control"
                                type="text"
                                name="nick_name"
                                id="nick_name"
                                value={data.nick_name}
                                placeholder="EFC"
                                onChange={handleChange}
                            />
                            {!isValid && status === STATUS.SUBMITTED && (
                                <div role="alert">
                                    <ul style={{ color: "red" }} key="email">{errors.nick_name}</ul>
                                </div>
                            )}
                        </div>

                        <div className="form-group">
                            <label>Country</label>
                            <input
                                className="form-control"
                                type="text"
                                name="country"
                                id="country"
                                placeholder="Nigeria"
                                onChange={handleChange}
                            />
                            {!isValid && status === STATUS.SUBMITTED && (
                                <div role="alert">
                                    <ul style={{ color: "red" }} key="email">{errors.country}</ul>
                                </div>
                            )}
                        </div>

                        <div className="form-group">
                            <label>Season</label>
                            <input
                                className="form-control"
                                type="text"
                                name="season"
                                id="season"
                                placeholder="2020/2021"
                                onChange={handleChange}
                            />
                            {!isValid && status === STATUS.SUBMITTED && (
                                <div role="alert">
                                    <ul style={{ color: "red" }} key="email">{errors.season}</ul>
                                </div>
                            )}
                        </div>
                        <div className="form-group">
                            <label>Club Image</label>
                            <input className="form-control" type="file" name={data.img} />
                        </div>
                        <button disabled={status === STATUS.SUBMITTING} className="btn primary-btn mt-2">
                            Add Team
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
