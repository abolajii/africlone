import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { RiTShirt2Line } from "react-icons/ri";
import { CreateTeam } from "../../../services/team.service";
import "../../../styles/add-players.scss";

const players = {
    name: "", dob: "", position: "", number: ""
};

const STATUS = {
    IDLE: "IDLE",
    SUBMITTED: "SUBMITTED",
    SUBMITTING: "SUBMITTING",
    COMPLETED: "COMPLETED"
};

export default function AddPlayers(props) {
    const history = useHistory();
    const location = useLocation();

    const [fields, setfields] = useState([players]);
    const [status, setStatus] = useState(STATUS.IDLE);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    async function handleSubmit(e) {
        e.preventDefault();
        setError(null);
        setSuccess(null);
        setStatus(STATUS.SUBMITTING);
        const data = { ...location?.state, players: [...fields] };
        // send data over the internet
        console.log('data: ' + data.players[0].name)
        CreateTeam(data)
            .then(response => response.json())
            .then(data => {
                let status = data.status;
                let message = data.message;
                console.log(data)
                console.log(status);
                if (status === 200) {
                    setSuccess(message)
                } else {
                    setError(message)
                }

            })
            .catch(reason => {
                console.log('re ' + reason)
                setError(`${reason}`)
            })
        setStatus(STATUS.COMPLETED);
        // dispatch(addTeam({ data, history: props.history }));
    }

    function handleRemove(index) {
        const newFields = [...fields];
        newFields.splice(index, 1);
        setfields([...newFields]);
    }

    function handleChange(e, index) {
        const { name, value } = e.target;
        const list = [...fields];
        list[index][name] = value;
        setfields([...list]);
    }

    function handleAddField(e) {
        e.preventDefault();
        setfields([...fields, { name: "", dob: "", position: "", number: "" }]);
    };

    useEffect(() => {
        console.log(location.state);
        console.log(fields)
    }, [fields, location.state]);

    return (
        <div className="container-fluid add-players">
            <div className="row my-2">
                <p className="header">
                    <RiTShirt2Line /> Add Players
                </p>
                <button
                    className="btn btn-xs primary-btn ml-auto"
                    onClick={() => history.push("/teams")}
                >
                    <i className="mdi mdi-arrow-left mr-1" />
                    Back
                </button>
            </div>
            <div className="row justify-content-center mt-3 inner-content-wrapper">
                <div className="col-11">
                    {error !== null && status ===  STATUS.COMPLETED  && (
                        <div role="alert">
                            <ul style={{ color: "red" }} key="error">{error}</ul>
                        </div>
                    )}

                    {success !== null && status ===  STATUS.COMPLETED && (
                        <div role="alert">
                            <ul style={{ color: "blue" }} key="success">{success}</ul>
                        </div>
                    )}
                    <form>
                        {fields.map((data, index) => {
                            return (
                                <Field
                                    status={status}
                                    error={error}
                                    success={success}
                                    key={index}
                                    data={data}
                                    index={index}
                                    handleChange={handleChange}
                                    handleRemove={handleRemove}
                                />
                            );
                        })}

                        <div className="row pl-0 mt-3">
                            <div className="col-lg-3 pl-0">
                                <button
                                    className="btn form-control primary-btn"
                                    onClick={handleSubmit}
                                >
                                    Submit Players
                                </button>
                            </div>
                            <div className="col-lg-3 pl-0">
                                <button
                                    className="btn form-control primary-btn"
                                    onClick={handleAddField}
                                >
                                    Add New Player
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

const Field = ({ index, data, handleChange, handleRemove, error, success, status }) => {
    return (
        <>
            <div className="form-row">




                {/* <div className="form-group col">
          <label>Player Image</label>
          <input
            className="form-control"
            type="file"
            name="name"
            placeholder="Obi Femi"
            onChange={(e) => handleChange(e, index)}
          />
        </div> */}

                <div className="form-group col">
                    <label>Full Name</label>
                    <input
                        className="form-control"
                        type="text"
                        name="name"
                        onChange={(e) => handleChange(e, index)}
                        placeholder="Obi Femi"
                    />
                </div>
                <div className="form-group col">
                    <label>Date Of Birth</label>
                    <input
                        className="form-control"
                        type="date"
                        name="dob"
                        placeholder="18"
                        onChange={(e) => handleChange(e, index)}
                    />
                </div>
                <div className="form-group col">
                    <label>Position</label>
                    <input
                        className="form-control"
                        type="text"
                        name="position"
                        placeholder="Forward"
                        onChange={(e) => handleChange(e, index)}
                    />
                </div>
                <div className="form-group col">
                    <label>Shirt Number</label>
                    <input
                        className="form-control"
                        type="number"
                        name="number"
                        placeholder="20"
                        onChange={(e) => handleChange(e, index)}
                    />
                </div>
                <div className="remove-div">
                    <i
                        className="mdi mdi-delete-outline"
                        onClick={() => handleRemove(index)}
                    />
                </div>
            </div>
        </>
    );
};
