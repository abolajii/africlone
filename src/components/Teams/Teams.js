import React, { useEffect, useState } from "react";
import Table from "./Table";
import { Helmet } from "react-helmet";
import { useHistory } from "react-router-dom";
import { getTeams } from "../../services/team.service";
import "../../styles/teams.scss";

export default function Teams() {
  const history = useHistory();
  const [teams, setTeams] = useState([]);

  useEffect(() => {

    getTeams()
      .then(response => response.json())
      .then(data => {
        console.log("@LOGGER", data.status);

        if (data.status === 'Success' || data.status === 200) {
          setTeams(data.data)
        }
      })
      .catch(reason => {})

  }, []);


  return (
    <div className="teams container-fluid">
      <Helmet>
        <title>Afriskaut - Teams</title>
      </Helmet>

      <div className="row my-4">
        <div className="col-12 d-flex align-items-center justify-content-between">
          <p className="header">
            <i className="mdi mdi-vlc mr-2" />
            All Teams
          </p>

          <button
            className="btn btn-xs primary-btn ml-auto"
            onClick={() => history.push("/add-team")}
          >
            <i className="mdi mdi-plus mr-1" />
            Add Team
          </button>
        </div>
      </div>
      <div className="inner-content-wrapper px-3 py-4">
        <Table teams={teams} />
      </div>
    </div>
  );
}
