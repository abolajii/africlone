/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Table from "./Table";
import "../../styles/competition.scss";
import { useHistory } from "react-router-dom";
import { getCompetitions } from "../../services/competition.service";

export default function Seasons() {
  const history = useHistory();

  // const { competitions } = useSelector((state) => state.competition);

  // const dispatch = useDispatch();

  const [competitions, setCompetitions] = useState([]);

  useEffect(() => {
    // dispatch(fetchCompetitions());
    getCompetitions()
      .then(response => response.json())
      .then(data => {
        if (data.status === 200) {
          let comps = data.data;
          setCompetitions(comps);
        }
      })
      .catch(reason => {
        console.log(`reason is ${reason}`)
      })
  }, []);

  return (
    <div className="competitions container-fluid">
      <div className="row my-4">
        <div className="col-12 d-flex align-items-center justify-content-between">
          <p className="header">
            <i className="mdi mdi-trophy-outline mr-2" />
            Competitions
          </p>

          <button
            className="btn btn-xs primary-btn ml-auto"
            onClick={() => history.push("/add-competition")}
          >
            <i className="mdi mdi-plus mr-1" />
            Create Competition
          </button>
        </div>
      </div>
      <div className=" inner-content-wrapper py-4 px-3">
        {console.log(competitions)}
        <Table competitions={competitions || []} />
      </div>
    </div>
  );
}
