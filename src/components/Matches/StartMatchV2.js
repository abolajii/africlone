import React, { useEffect, useState, useRef } from "react";
import "../../styles/start-match-v2.scss";
import "../../styles/modal.scss";
import Field from "../../assets/football_field.png";
import { useLocation } from "react-router-dom";
import players from "../../helpers/players";
import { useEvent } from "../../store/contexts/playerevent";
import {
  getMatch,
  PostMatchResult,
  GetFormationPositioning,
} from "../../services/match.service";
import ReactPlayer from "react-player";
import { MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";
import { ContextMenu, MenuItem } from "react-contextmenu";
import { FaRegCopy, FaList, FaEllipsisV, FaShareAlt } from "react-icons/fa";
import { RiSendPlaneFill, RiDeleteBin6Line } from "react-icons/ri";
import { Overlay } from "react-portal-overlay";
import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/core";
import Event from "./Event/Event";
import MatchTimer from "./MatchTimer";
import { Fab, Action } from "react-tiny-fab";
import "react-tiny-fab/dist/styles.css";
import { floatingStyle } from "../../styles/floating-action-btn.scss";
import DataBaseApi from "../../database/DataBaseApi";
import { Button, Container } from "@material-ui/core";
import { Col, Row, Form } from "react-bootstrap";

const chevDown = require("../../assets/chevDown.svg");
const x = require("../../assets/x.svg");

const override = css`
  display: block;
  margin: 0 auto;
  border-color: "red";
`;

const liverpool =
  "data:image/png;base64,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";
const burnley =
  "data:image/jpeg;base64,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";

export default function StartMatchV2() {
  const DBApi = new DataBaseApi();
  const time = new Date();
  time.setSeconds(time.getSeconds() + 300);
  const inputStartTime = useRef(null);
  const inputStopTime = useRef(null);

  const [matchState, setMatchState] = useState("stopped");
  const [loadingSpinner, setLoadingSpinner] = useState(false);
  const { dispatch } = useEvent();
  const location = useLocation();
  const [homePlayers, setHomePlayers] = useState({ first: [], second: [] });
  const [homeLineUp, setHomeLineUp] = useState([]);
  const [awayLineUp, setAwayLineUp] = useState([]);
  const [homeTeam, setHomeTeam] = useState(null);
  const [awayTeam, setAwayTeam] = useState(null);
  const [homeSubs, setHomeSubs] = useState([]);
  const [awaySubs, setAwaySubs] = useState([]);
  const [isActiveHome, setIsActiveHome] = useState(-1);
  const [isActiveAway, setIsActiveAway] = useState(-1);
  const [activePlayer, setActivePlayer] = useState({});
  const [startTime, setStartTime] = useState("");
  const [editModal, setEditModal] = useState({ value: false, event: {} });

  const [allPlayerz, setAllPlayerz] = useState([]);
  const [matchId, setMatchId] = useState();

  const [showDropDownPlayer, setShowDropDownPlayer] = useState(false);
  const [showDropDownEvent, setShowDropDownEvent] = useState(false);
  const [showDropDownOutcome, setShowDropDownOutcome] = useState(false);
  const [showDropDownType, setShowDropDownType] = useState(false);

  const [stopTime, setStopTime] = useState();
  const [statTime, setStatTime] = useState();

  const [timeLineData, setTimeLineData] = useState([]);
  const [lastThreeTimeLines, setLastThreeTimeLines] = useState([]);

  const [homeFormation, setHomeFormation] = useState();
  const [awayFormation, setAwayFormation] = useState();
  const [showDropDownFormationHome, setShowDropDownFormationHome] = useState();
  const [showDropDownFormationAway, setShowDropDownFormationAway] = useState();

  const [editingEventDetails, setEditingEventDetails] = useState(null);
  const [
    selectableEventsListBaseOnTypeSelection,
    setSelectableEventsListBaseOnTypeSelection,
  ] = useState([]);
  const [
    selectableOutComeListBaseOnEventSelection,
    setSelectableOutComeListBaseOnEventSelection,
  ] = useState([]);

  const possibleFormations = [
    "4-4-2",
    "4-3-3",
    "4-5-1",
    "4-3-4",
    "3-5-2",
    "5-4-1",
  ];

  const [formationPositioning, setFormationPositioning] = useState({
    field: [
      [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      ],
      [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      ],
      [
        0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      ],
      [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      ],
      [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      ],
      [
        0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      ],
      [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      ],
      [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      ],
      [
        0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      ],
      [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      ],
      [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      ],
      [
        0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      ],
      [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      ],
      [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      ],
    ],
    positions: undefined,
  });

  const [showAllTimeLines, setShowAllTimeLines] = useState(false);

  let timeElapsed = null;

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
        <ClipLoader
          css={override}
          size={50}
          color={"#123abc"}
          loading={true}
        />
      </Overlay>
    );
  };

  /**
   * Helper function to map timeline events
   */
  const mapTimeLineEventsAndOutComes = (mTimeline) =>
    mTimeline.map((mData, index) => ({
      id: index + 1,
      name: mData.playerName,
      event: mData.event,
      type: mData.type,
      outcome: mData.outcome,
      start: mData.start_time,
      stop: mData.stop_time,
      action: [
        <i
          key={index + "timeLine"}
          className="mdi mdi-pen text-primary"
          onClick={() => {
            editTimeline(mData);
            initEditables(mData);
          }}
        />,
        <i
          key={index + 1 + "timeLine"}
          className="mdi mdi-trash-can text-danger"
          onClick={() => {
            deleteTimeline(mData);
          }}
        />,
      ],
    }));

  const initialLastThreeTimelineData = {
    columns: [
      {
        label: "#",
        field: "sn",
        sort: "asc",
      },
      {
        label: "Player Name",
        field: "name",
        sort: "asc",
      },
      {
        label: "Event",
        field: "event",
        sort: "asc",
      },
      {
        label: "Type/Location",
        field: "type",
        sort: "asc",
      },
      {
        label: "Outcome",
        field: "outcome",
        sort: "asc",
      },
      {
        label: "Start Time",
        field: "start",
        sort: "asc",
      },
      {
        label: "Stop Time",
        field: "stop",
        sort: "asc",
      },
      {
        label: "Action",
        field: "action",
        sort: "asc",
      },
    ],
    rows: mapTimeLineEventsAndOutComes(lastThreeTimeLines),
  };

  const initialAllTimelineData = {
    columns: [
      {
        label: "#",
        field: "sn",
        sort: "asc",
      },
      {
        label: "Player Name",
        field: "name",
        sort: "asc",
      },
      {
        label: "Event",
        field: "event",
        sort: "asc",
      },
      {
        label: "Type/Location",
        field: "type",
        sort: "asc",
      },
      {
        label: "Outcome",
        field: "outcome",
        sort: "asc",
      },
      {
        label: "Start Time",
        field: "start",
        sort: "asc",
      },
      {
        label: "Stop Time",
        field: "stop",
        sort: "asc",
      },
      {
        label: "Action",
        field: "action",
        sort: "asc",
      },
    ],
    rows: mapTimeLineEventsAndOutComes(timeLineData),
  };

  useEffect(() => {
    setLoadingSpinner(true);

    let match = {
      match: `${location.state.match}`,
    };

    getMatch(match)
      .then((response) => response.json())
      .then((data) => {
        setLoadingSpinner(false);

        let status = data.status;
        if (status == 200) {
          dispatch({
            type: "add_player_event",
            name: "Nnamdi",
            _id: 1,
            shots: 15,
          });
          dispatch({ type: "add_match_event", _id: 66, offside: 2 });
          setHomeTeam(data.data.team_A.team_name);
          setAwayTeam(data.data.team_B.team_name);
          setHomeLineUp(data.data.team_A_line_up);
          setAwayLineUp(data.data.team_B_line_up);
          setHomeSubs(data.data.team_A_subs);
          setAwaySubs(data.data.team_B_subs);
          setAwaySubs(data.data.team_B_subs);
        }

        const allPlayers = {
          teamA: data.data.team_A_line_up,
          teamB: data.data.team_B_line_up,
        };
        const _matchId = data.data._id;

        prefillDataBase(allPlayers, _matchId);
      })
      .catch((reason) => {
        setLoadingSpinner(false);
        console.log("Reason", reason);
      });

    setHomePlayers({
      first: [...players.slice(0, players.length / 2)],
      second: [
        ...players
          .sort((a, b) => a.number - b.number)
          .slice(players.length / 2, players.length),
      ],
    });
  }, []);

  const prefillDataBase = (allPlayers, _matchId) => {
    const persableAllPlayerz = [];
    allPlayers.teamA.forEach((playerA) => {
      persableAllPlayerz.push({ ...playerA, team: "A" });
    });

    allPlayers.teamB.forEach((playerB) => {
      persableAllPlayerz.push({ ...playerB, team: "B" });
    });

    setAllPlayerz(persableAllPlayerz);
    setMatchId(_matchId);

    persableAllPlayerz.forEach((element) => {
      DBApi.addNewPlayerMatchEvent(_matchId, element);
    });

    DBApi.getAllTimeLines().then((timelinesData) => {
      addToTimeLine(timelinesData);
    });
  };

  const deleteTimeline = (src) => {
    console.log("@src", src);
    DBApi.deleteEventById(src).then((_) => {
      DBApi.getAllTimeLines().then((timelinesData) => {
        addToTimeLine(timelinesData);
      });
    });
  };

  const editTimeline = (src) => {
    setEditModal({ value: true, event: src });
    setEditingEventDetails({ ...src });
    setStatTime(src.start_time);
    setStopTime(src.stop_time);
  };

  const initEditables = (_editingEventDetails) => {
    const __editingEventDetails = { ..._editingEventDetails };
    eventList.forEach((element) => {
      if (element.type === __editingEventDetails.type) {
        const events = element.events;

        __editingEventDetails.event = events[0];
        setSelectableEventsListBaseOnTypeSelection(events);

        if (element.outcomes.length !== 0) {
          __editingEventDetails.outcome = element.outcomes[0];
          setSelectableOutComeListBaseOnEventSelection(element.outcomes);
        } else {
          setSelectableOutComeListBaseOnEventSelection([]);
        }
      }
    });
  };

  const eventList = [
    {
      type: "Goal",
      events: ["Header", "Inside box", "1 V 1", "Outside box"],
      outcomes: [],
    },
    { type: "Pass", events: ["Long", "Line break", "Short"], outcomes: [] },
    {
      type: "Saves",
      events: ["Inside box", "Outside box", "1 V 1"],
      outcomes: [],
    },
    {
      type: "Shot",
      events: ["Long range", "Short range"],
      outcomes: ["Successful", "Unsuccessful"],
    },
    { type: "Duel", events: ["Aerial", "Ground"], outcomes: [] },
    {
      type: "Dribble",
      events: ["Nutmeg", "Skill move"],
      outcomes: ["Successful", "Unsuccessful"],
    },
    { type: "Cards", events: ["Dissent", "Foul"], outcomes: ["Red", "Yellow"] },
    {
      type: "Ball Progression",
      events: ["Ownhalf", "Opponents half"],
      outcomes: [],
    },
    {
      type: "Foul",
      events: ["Ownhalf", "Opponents half"],
      outcomes: ["Successful", "Unsuccessful"],
    },
    {
      type: "Clearance",
      events: ["Goal line", "Under pressure"],
      outcomes: [],
    },
    { type: "Assist", events: ["Assist"], outcomes: [] },
    { type: "Penalty", events: ["Missed", "Score"], outcomes: [] },
    { type: "Freekick", events: ["On Target", "Off Target"], outcomes: [] },
    { type: "Catch", events: ["Simple", "Complex"], outcomes: [] },
    { type: "Block", events: ["Block"], outcomes: [] },
    { type: "Tackle", events: ["Tackle"], outcomes: [] },
    { type: "Cross", events: ["Cross"], outcomes: [] },
    { type: "Chances created", events: ["Chances created"], outcomes: [] },
  ];

  const Events = () => {
    return eventList.map((event) => {
      return (
        <Event
          title={event.type}
          listOfEvents={event.events}
          listOfPossibleEventsOutComes={event.outcomes}
          callBack={(marshalledEventOutCome) => {
            handleMarshalledEventOutCome(marshalledEventOutCome);
          }}
        />
      );
    });
  };

  const handleOnActiveLineUpHome = (item, index) => {
    setIsActiveAway(-1);
    if (isActiveHome === index) {
      setIsActiveHome(-1);
      setActivePlayer({});
      setStartTime("");
    } else {
      setIsActiveHome(index);
      setActivePlayer(item);
      setStartTime(timeElapsed);
    }
  };

  const handleOnActiveLineUpAway = (item, index) => {
    setIsActiveHome(-1);
    if (isActiveAway === index) {
      setIsActiveAway(-1);
      setActivePlayer({});
      setStartTime("");
    } else {
      setIsActiveAway(index);
      setActivePlayer(item);
      setStartTime(timeElapsed);
    }
  };

  const handleMarshalledEventOutCome = (marshalledEventOutCome) => {
    if (matchState === "stopped") {
      alert("Start Match First.");
      return;
    }

    if (activePlayer && Object.keys(activePlayer).length === 0) {
      alert("Select At Least One Player");
    } else {
      const timeLine = {
        playerId: activePlayer._id,
        playerName: activePlayer.name,
        type: marshalledEventOutCome.type,
        event: marshalledEventOutCome.event,
        outcome: marshalledEventOutCome.outcome,
        start_time: startTime,
        stop_time: timeElapsed,
      };

      const timeLineObj = { start_time: startTime, stop_time: timeElapsed };

      DBApi.addEvent(activePlayer, timeLineObj, timeLine)
        .then((eventResult) => {
          DBApi.getAllTimeLines().then((timelinesData) => {
            addToTimeLine(timelinesData);
          });
        })
        .catch((exception) => {
          console.log("NEW GOAL Exception", exception);
        });

      setIsActiveAway(-1);
      setActivePlayer({});
      setStartTime("");

      setIsActiveHome(-1);
      setActivePlayer({});
      setStartTime("");
    }
  };

  const handleTimeElapsed = (_timeElapsed) => {
    timeElapsed = _timeElapsed;
  };

  const SetLineUpHome = ({ lineUps }) => {
    return lineUps.slice(0, 11).map((item, index) => {
      return (
        <span
          key={index + "lineUpsHome"}
          onClick={() => {
            handleOnActiveLineUpHome(item, index);
          }}
          className={
            isActiveHome == index ? `_${index}_active` : `btn _${index}`
          }
        >
          {item?.number}
        </span>
      );
    });
  };

  const SetLineUpAway = ({ lineUps }) => {
    return lineUps.slice(0, 11).map((item, index) => {
      return (
        <span
          key={index + "lineUpsAway"}
          onClick={() => {
            handleOnActiveLineUpAway(item, index);
          }}
          className={
            isActiveAway == index ? `_${index}_active` : `btn _${index}`
          }
        >
          {item?.number}
        </span>
      );
    });
  };

  // ===================||==================
  const PlayersView = () => {
    return (
      <div className={"editWrap"}>
        <p className={"formLabel"}>Players</p>

        <div
          className={"inputGpWrap"}
          onClick={() => {
            setShowDropDownPlayer(!showDropDownPlayer);
          }}
        >
          <input
            className={"inputName"}
            placeholder="Select Player"
            disabled={true}
            value={editingEventDetails.playerName}
            readOnly={true}
          />
          <img src={chevDown} alt="" className={"chev"} />{" "}
          {showDropDownPlayer ? (
            <div className={"dropWrap"}>
              <PlayersListView />
            </div>
          ) : null}
        </div>
      </div>
    );
  };

  const PlayersListView = () => {
    return allPlayerz.map((item) => {
      return (
        <p
          style={{
            position: "relative",
            top: 0,
            left: 0,
            width: "100%",
            cursor: "pointer",
          }}
          onClick={() => {
            editingEventDetails.playerName = item.name;
            editingEventDetails.playerId = item._id;
          }}
        >
          {item.name}
        </p>
      );
    });
  };
  // ===================||==================

  // ===================||==================
  const EventsTypeView = () => {
    const types = [];

    eventList.forEach((element) => {
      types.push(element.type);
    });

    return (
      <div className={"editWrap"}>
        <p className={"formLabel"}>Type</p>

        <div
          className={"inputGpWrapInActive"}
          onClick={() => {
            // setShowDropDownEvent(!showDropDownEvent); not editable for now, will be on the next version.
          }}
        >
          <input
            className={"inputName"}
            placeholder="Select Event"
            disabled={true}
            value={editingEventDetails.type}
            readOnly={true}
          />

          {/* <img src={chevDown} alt="" className={"chev"} />{' '} */}
          {showDropDownEvent ? (
            <div className={"dropWrap"}>
              <EventsTypeListView mEventList={types} />
            </div>
          ) : null}
        </div>
      </div>
    );
  };

  const EventsTypeListView = ({ mEventList }) => {
    return mEventList.map((item) => {
      return (
        <p
          style={{
            position: "relative",
            top: 0,
            left: 0,
            width: "100%",
            cursor: "pointer",
          }}
          onClick={() => {
            editingEventDetails.type = item;
          }}
        >
          {item}
        </p>
      );
    });
  };
  // ===================||==================

  // ===================||==================
  const EventsView = () => {
    return selectableEventsListBaseOnTypeSelection.length === 0 ? null : (
      <div className={"editWrap"}>
        <p className={"formLabel"}>Event</p>

        <div
          className={"inputGpWrap"}
          onClick={() => {
            setShowDropDownType(!showDropDownType);
          }}
        >
          <input
            className={"inputName"}
            placeholder="Select Type"
            disabled={true}
            value={editingEventDetails.event}
            readOnly={true}
          />
          <img src={chevDown} alt="" className={"chev"} />{" "}
          {showDropDownType ? (
            <div className={"dropWrap"}>
              <EventsListView />
            </div>
          ) : null}
        </div>
      </div>
    );
  };

  const EventsListView = () => {
    return selectableEventsListBaseOnTypeSelection.length === 0
      ? null
      : selectableEventsListBaseOnTypeSelection.map((item) => {
          return (
            <p
              style={{
                position: "relative",
                top: 0,
                left: 0,
                width: "100%",
                cursor: "pointer",
              }}
              onClick={() => {
                editingEventDetails.event = item;

                eventList.forEach((element) => {
                  if (element.type === editingEventDetails.type) {
                    if (element.outcomes.length !== 0) {
                      editingEventDetails.outcome = element.outcomes[0];
                      setSelectableOutComeListBaseOnEventSelection(
                        element.outcomes
                      );
                    } else {
                      setSelectableOutComeListBaseOnEventSelection([]);
                    }
                  }
                });
              }}
            >
              {item}
            </p>
          );
        });
  };
  // ===================||==================

  // ===================||==================
  const OutComesView = () => {
    return selectableOutComeListBaseOnEventSelection.length === 0 ? null : (
      <div className={"editWrap"}>
        <p className={"formLabel"}>Outcomes</p>

        <div
          className={"inputGpWrap"}
          onClick={() => {
            setShowDropDownOutcome(!showDropDownOutcome);
          }}
        >
          <input
            className={"inputName"}
            placeholder="Select Outcome"
            disabled={true}
            value={editingEventDetails.outcome}
            readOnly={true}
          />
          <img src={chevDown} alt="" className={"chev"} />{" "}
          {showDropDownOutcome ? (
            <div className={"dropWrap"}>
              <OutcomeListView />
            </div>
          ) : null}
        </div>
      </div>
    );
  };

  const OutcomeListView = () => {
    return selectableOutComeListBaseOnEventSelection.length === 0
      ? null
      : selectableOutComeListBaseOnEventSelection.map((item) => {
          return (
            <p
              style={{
                position: "relative",
                top: 0,
                left: 0,
                width: "100%",
                cursor: "pointer",
              }}
              onClick={() => {
                editingEventDetails.outcome = item;
              }}
            >
              {item}
            </p>
          );
        });
  };
  // ===================||==================

  // ===================||==================
  const handleStartTimeChange = (event) => {
    editingEventDetails.start_time = event.target.value;
    setStatTime(event.target.value);
  };

  const handleStopTimeChange = (event) => {
    editingEventDetails.stop_time = event.target.value;
    setStopTime(event.target.value);

    // this.nameInput.focus();
  };

  const StartStopTimeView = () => {
    return (
      <div className={"editWrap"}>
        <p className={"formLabel"}>Start Time</p>

        <input
          onKeyDown={() => {
            regainInputFocus(inputStartTime);
          }}
          ref={inputStartTime}
          key={"start_time"}
          className={"inputName"}
          placeholder="Start Time"
          value={statTime}
          onChange={(event) => {
            handleStartTimeChange(event);
          }}
        />

        <input
          onKeyDown={() => {
            regainInputFocus(inputStopTime);
          }}
          ref={inputStopTime}
          key={"stop_time"}
          className={"inputName"}
          placeholder="Stop Time"
          value={stopTime}
          onChange={(event) => {
            handleStopTimeChange(event);
          }}
        />
      </div>
    );
  };
  // ===================||==================

  /**
   * Helper function to regain input field focus
   *
   */
  const regainInputFocus = (ref) => {
    setTimeout(() => {
      ref.current.focus();
    }, 500);
  };

  // ===================||==================
  const EditRecordView = () => {
    return (
      <Overlay className={"modal"} closeOnClick={true} open={editModal.value}>
        <div className={"modal_paper"}>
          <div className={"modalTop2"}>
            <p className={"appTitle"}>{"Edit Event"}</p>
            <img
              src={x}
              alt="cancel"
              onClick={() => {
                setEditModal({ value: false, event: editModal.event });
                setEditingEventDetails(editModal.event);
              }}
            />
          </div>

          <PlayersView />
          <EventsTypeView />
          <EventsView />
          <OutComesView />
          <StartStopTimeView />

          <Button
            style={{
              backgroundColor: "green",
              marginTop: "20px",
              color: "white",
            }}
            onClick={() => {
              if (selectableOutComeListBaseOnEventSelection.length === 0) {
                editingEventDetails.outcome = editingEventDetails.event;
              }

              hendleModifyOnSave(editingEventDetails);
            }}
            variant="success"
          >
            Submit
          </Button>
        </div>
      </Overlay>
    );
  };
  // ===================||==================

  /**
   * Persists the modified details of an event to the indexDb and updates the timeLine
   * @param modifiedEventDetails is the modified details to the put in place of old details
   */
  const hendleModifyOnSave = (modifiedEventDetails) => {
    setEditModal({ value: false, event: editModal.event });

    const previous = { ...editModal.event };
    const modified = { ...modifiedEventDetails };

    DBApi.updateEvent(previous, modified)
      .then((res) => {
        console.log("@success", res);
        DBApi.getAllTimeLines().then((timelinesData) => {
          addToTimeLine(timelinesData);
        });
      })
      .catch((error) => {
        console.log("@error", error);
      });
  };

  /**
   * Add to timeline helper function
   */
  const addToTimeLine = (timelinesData) => {
    const timeLines = timelinesData;
    const mLastThreeTimeLines = timelinesData.reverse().slice(0, 3);
    setTimeLineData(timeLines);
    setLastThreeTimeLines(mLastThreeTimeLines);
  };

  const detailStyle = {
    display: "flex",
    flexDirection: "column",
  };

  const scoreStyle = {
    backgroundColor: "#2B52BA",
    width: 100.29,
    height: 48.1,
  };

  const lineUpStyle = {
    width: "17px",
    backgroundColor: "#FE4302",
    borderRadius: "2px",
    height: "13px",
  };

  const lineUpAwayStyle = {
    width: "17px",
    backgroundColor: "#2B52BA",
    borderRadius: "2px",
    height: "13px",
  };
  const ClubsMatchDetails = () => (
    <Row>
      <Col>
        <div style={detailStyle}>
          <span>
            <img
              src={liverpool}
              alt={"club-logo"}
              width={70.61}
              height={70.61}
            />
          </span>
          <p
            className="text-center pt-4"
            style={{ fontSize: "10px", lineHeight: "8px", fontWeight: "600" }}
          >
            LiverPool FC
          </p>
        </div>
      </Col>
      <Col>
        <div className="d-flex flex-column">
          <div style={scoreStyle}>
            <div className="d-flex justify-content-around align-middle mt-2 ">
              <div>
                <h2 style={{ color: "#fff" }}>2</h2>
              </div>
              <div>
                <div
                  className="mt-1"
                  style={{
                    borderLeft: "2px solid #FFFFFF",
                    height: "24.56px",
                    opacity: "40%",
                  }}
                />
              </div>
              <div>
                <h2 style={{ color: "#fff" }}>0</h2>
              </div>
            </div>
          </div>
          <div>
            <p style={{ fontSize: "6px" }} className="text-center">
              Match Date
            </p>
            <p
              style={{ fontSize: "9px", fontWeight: "500" }}
              className="text-center"
            >
              10-08-2021
            </p>
            <p style={{ fontSize: "6px" }} className="text-center">
              League
            </p>
            <p
              style={{ fontSize: "8px", fontWeight: "500" }}
              className="text-center"
            >
              English Premier League
            </p>
          </div>
        </div>
      </Col>
      <Col>
        <div style={detailStyle}>
          <span>
            <img src={burnley} alt={"club-logo"} width={70.61} height={70.61} />
          </span>
          <p
            className="text-center pt-4"
            style={{ fontSize: "10px", lineHeight: "8px", fontWeight: "600" }}
          >
            Burnley
          </p>
        </div>
      </Col>
    </Row>
  );

  const FormationHome = () => (
    <div style={{ display: "flex" }}>
      <div className="d-flex flex-column pr-2">
        <span style={{ color: "#FE4302", fontSize: "5px", fontWeight: "500" }}>
          Home Team
        </span>
        <span style={{ color: "#FE4302", fontSize: "7px", fontWeight: "500" }}>
          Formation
        </span>
      </div>

      <div style={{ width: "7em" }}>
        <Form.Control as="select">
          {possibleFormations.map((e) => (
            <option value={e}>{e}</option>
          ))}
        </Form.Control>
      </div>
    </div>
  );

  // ===================||==================
  const FormationHomeDropDown = () => (
    <div>
      <p className={"formLabel"}>Formation(Home)</p>

      <div
        className={"inputGpWrapHome"}
        onClick={() => {
          setShowDropDownFormationHome(!showDropDownFormationHome);
        }}
      >
        <input
          className={"inputNameHome"}
          placeholder="Select Formation(Home)"
          disabled={true}
          value={homeFormation}
          readOnly={true}
        />

        <img
          style={{ width: "10px" }}
          src={chevDown}
          alt="drop down"
          className={"chev"}
        />
        {showDropDownFormationHome ? (
          <div className={"dropWrap"}>
            {possibleFormations.map((item, index) => (
              <p
                key={`id${index}home`}
                style={{
                  position: "relative",
                  top: 0,
                  left: 0,
                  width: "100%",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setHomeFormation(item);
                  GetFormationPositioning({
                    formation: item,
                    row: 25,
                    col: 60,
                  }).then((response) => {
                    response.json().then((res) => {
                      const positions = res.positions
                        .slice(1, res.positions.length - 1)
                        .replaceAll(" ", "");
                      const mPositions = positions.split(",");
                      const matrices = new Array(res.row).fill(
                        new Array(res.column).fill(0)
                      );
                      const finalFieldFormationComposition = {
                        field: matrices,
                        positions: mPositions,
                      };

                      setFormationPositioning(finalFieldFormationComposition);
                      console.log("@matrices", finalFieldFormationComposition);
                    });
                  });
                }}
              >
                {item}
              </p>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );

  const FormationAway = () => (
    <div style={{ display: "flex" }}>
      <div className="d-flex flex-column pr-2 pl-5">
        <span style={{ color: "#2B52BA", fontSize: "5px", fontWeight: "500" }}>
          Away Team
        </span>
        <span style={{ color: "#2B52BA", fontSize: "7px", fontWeight: "500" }}>
          Formation
        </span>
      </div>

      <div>
        <div style={{ width: "7em" }}>
          <Form.Control as="select">
            {possibleFormations.map((e) => (
              <option value={e}>{e}</option>
            ))}
          </Form.Control>
        </div>
      </div>
    </div>
  );

  const FormationAwayDropDown = () => (
    <div className={"editWrap"}>
      <p className={"formLabel"}>Formation(Away)</p>

      <div
        className={"inputGpWrapAway"}
        onClick={() => {
          setShowDropDownFormationAway(!showDropDownFormationAway);
        }}
      >
        <input
          className={"inputNameAway"}
          placeholder="Select Formation(Home)"
          disabled={true}
          value={awayFormation}
          readOnly={true}
        />
        <img
          style={{ width: "10px" }}
          src={chevDown}
          alt="drop down"
          className={"chev"}
        />{" "}
        {showDropDownFormationAway ? (
          <div className={"dropWrap"}>
            {possibleFormations.map((item, index) => (
              <p
                key={`id${index}away`}
                style={{
                  position: "relative",
                  top: 0,
                  left: 0,
                  width: "100%",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setAwayFormation(item);
                }}
              >
                {item}
              </p>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );

  const DemoFormationField = () => {
    return formationPositioning.field.map((XAxis, r_index) => {
      return (
        <div
          className={"container"}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(40, 1fr)",
            gridGap: 2,
            backgroundColor: "green",
          }}
        >
          <div style={{ color: "transparent" }}>{"."}</div>
          {XAxis.map((YAxis, c_index) => {
            const currentPosition = `${r_index}:${c_index}`;
            return formationPositioning.positions &&
              FoundAposition(
                formationPositioning.positions,
                currentPosition
              ) ? (
              <div
                style={{
                  width: "30px",
                  height: "30px",
                  borderRadius: "50%",
                  backgroundColor: "red",
                }}
              />
            ) : (
              <div
                style={{
                  width: "10px",
                  height: "10px",
                  backgroundColor: "green",
                  color: "transparent",
                }}
                className={"item"}
              >
                <p>.</p>
              </div>
            );
          })}
        </div>
      );
    });
  };

  const FoundAposition = (positionsArrayList, position) => {
    for (let i = 0; i < positionsArrayList.length; i++) {
      const iPosition = positionsArrayList[i];
      if (iPosition === position) {
        return true;
      }

      if (i === positionsArrayList.length - 1) {
        return false;
      }
    }
  };

  const DemoItemPositioned = ({ colStart, colEnd, rowStart, rowEnd }) => {
    return (
      <div
        className={"item"}
        style={{
          gridColumnStart: colStart,
          gridColumnEnd: colEnd,
          gridRowStart: rowStart,
          gridRowEnd: rowEnd,
        }}
      />
    );
  };
  // ===================||==================

  const handleDone = () => {
    if (matchState !== "stopped") {
      alert("Stop match first.");
      return;
    }

    DBApi.marshallPostableObject()
      .then((marshalData) => {
        console.log("=== marshalData === ", marshalData);
        setLoadingSpinner(true);

        PostMatchResult(marshalData)
          .then((response) => {
            setLoadingSpinner(false);

            console.log("response.json() 0", response.json);
            if (response.statusText === "OK") {
              alert("Done");
            }
          })
          .then((res) => {
            console.log("@THEN", res);
          })
          .catch((reason) => {
            setLoadingSpinner(false);

            console.log("reason @marshallPostableObject ", reason);
          });
      })
      .catch((error) => {
        console.log("ERROR @marshallPostableObject ", error);
      });
  };

  const handleDelete = () => {
    prefillDataBase(allPlayerz, matchId);
  };

  const MFab = () => <p>{"Finish"}</p>;

  const TimeLineView = () => {
    return (
      <div className="timeline mt-2">
        <div className="header">
          <MDBTable hover fixed scrollY>
            <MDBTableHead columns={initialLastThreeTimelineData.columns} />
            <MDBTableBody rows={initialLastThreeTimelineData.rows} />
          </MDBTable>
        </div>
        {timeLineData.length > 3 ? (
          <div
            onClick={() => {
              setShowAllTimeLines(true);
            }}
            style={{
              textAlign: "center",
              justifyItems: "center",
              backgroundColor: "green",
              color: "white",
            }}
            className="mb-1 MuiChip-clickable"
          >
            <p className="pl-4">View All</p>
          </div>
        ) : null}
      </div>
    );
  };

  const AllTimeLineView = () => {
    return (
      <Overlay
        className={"modal_0"}
        closeOnClick={true}
        open={showAllTimeLines}
      >
        <div className={"modal_paper"}>
          <div className={"modalTop2"}>
            <p className={"appTitle"}>{"All Timeline"}</p>
            <img
              src={x}
              alt="cancel"
              onClick={() => {
                setShowAllTimeLines(false);
              }}
            />
          </div>

          <div className="timeline mt-2">
            <div className="header">
              <MDBTable hover fixed scrollY>
                <MDBTableHead columns={initialAllTimelineData.columns} />
                <MDBTableBody rows={initialAllTimelineData.rows} />
              </MDBTable>
            </div>
          </div>
        </div>
      </Overlay>
    );
  };

  const mainButtonStyles = {
    borderColor: "#00f",
    backgroundColor: "#28a745",
  };

  return (
    <>
      <ContextMenu id="contextmenu">
        <MenuItem data={{ copy: "MI50" }}>
          <FaRegCopy className="copy" />
          <span>Copy</span>
        </MenuItem>
        <MenuItem>
          <FaEllipsisV className="openwith" />
          <span>Open with</span>
        </MenuItem>
        <MenuItem>
          <FaList className="watchlist" />
          <span>Add to watchlist</span>
        </MenuItem>
        <MenuItem>
          <RiSendPlaneFill className="send" />
          <span>Send</span>
        </MenuItem>
        <MenuItem>
          <RiDeleteBin6Line className="delete" />
          <span>Delete</span>
        </MenuItem>
        <MenuItem>
          <FaShareAlt className="share" />
          <span>Share</span>
        </MenuItem>
      </ContextMenu>

      <div className="container-fluid start-match">
        <div className="row pt-2">
          <div className="col-12 mt-5 row px-1">
            <div className="col-lg-3">
              <div style={{ display: "flex", flexDirection: "column" }}>
                <ClubsMatchDetails />
                <div className="d-flex justify-content-between mt-5">
                  <FormationHome />
                  <FormationAway />
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <p
                    className="mb-1 mt-3 text-muted"
                    style={{
                      fontSize: "8px",
                      textAlign: "center",
                      color: "#393B3D",
                      fontWeight: "500",
                    }}
                  >
                    Starting Line-up
                  </p>
                  <ul>
                    {homeLineUp.map((player, index) => (
                      <li
                        key={`${player.number}${index + 1}`}
                        className="players"
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-evenly",
                            alignItems: "center",
                          }}
                        >
                          <div style={lineUpStyle}>
                            <p
                              className="text-center pt-1"
                              style={{ fontSize: "6px" }}
                            >
                              GK
                            </p>
                          </div>

                          <span>{player.number}</span>
                          <span>
                            {player.name.length > 5
                              ? player.name.slice(0, 6) + "..."
                              : player.name}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p
                    className="mb-1 mt-3 text-muted"
                    style={{
                      fontSize: "8px",
                      textAlign: "center",
                      color: "#393B3D",
                      fontWeight: "500",
                    }}
                  >
                    Starting Line-up
                  </p>
                  <ul>
                    {homeLineUp.map((player, index) => (
                      <li
                        key={`${player.number}${index + 1}`}
                        className="players"
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-evenly",
                            alignItems: "center",
                          }}
                        >
                          <div style={lineUpAwayStyle}>
                            <p
                              className="text-center pt-1"
                              style={{ fontSize: "6px", color: "#ffff" }}
                            >
                              GK
                            </p>
                          </div>

                          <span>{player.number}</span>
                          <span>
                            {player.name.length > 5
                              ? player.name.slice(0, 6) + "..."
                              : player.name}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="d-flex justify-content-between">
                <div>
                  <p
                    className="mb-1 mt-2 text-muted text-center"
                    style={{
                      fontSize: "8px",
                      color: "#393B3D",
                      fontWeight: "500",
                    }}
                  >
                    Substitutions
                  </p>
                  <ul>
                    {homeLineUp.map((player, index) => (
                      <li
                        key={`${player.number}${index + 1}`}
                        className="players"
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-evenly",
                            alignItems: "center",
                          }}
                        >
                          <div style={lineUpStyle}>
                            <p
                              className="text-center pt-1"
                              style={{
                                fontSize: "6px",
                              }}
                            >
                              GK
                            </p>
                          </div>

                          <span>{player.number}</span>
                          <span>
                            {player.name.length > 5
                              ? player.name.slice(0, 6) + "..."
                              : player.name}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p
                    className="mb-1 mt-2 text-muted text-center"
                    style={{
                      fontSize: "8px",
                      color: "#393B3D",
                      fontWeight: "500",
                    }}
                  >
                    Substitutions
                  </p>
                  <ul>
                    {homeLineUp.map((player, index) => (
                      <li
                        key={`${player.number}${index + 1}`}
                        className="players"
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-evenly",
                            alignItems: "center",
                          }}
                        >
                          <div style={lineUpAwayStyle}>
                            <p
                              className="text-center pt-1"
                              style={{
                                fontSize: "6px",
                                color: "#ffff",
                              }}
                            >
                              GK
                            </p>
                          </div>

                          <span>{player.number}</span>
                          <span>
                            {player.name.length > 5
                              ? player.name.slice(0, 6) + "..."
                              : player.name}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-lg-9">
              <div className="col-12 field">
                <div className="row">
                  <div className="flex hidden-overflow col-7">
                    <div>
                      <img src={Field} alt="field" />
                    </div>

                    <div>
                      <img src={Field} alt="field" />
                    </div>
                  </div>

                  <div className="col-5">
                    <div className="pl-1">
                      <Row>
                        <Col lg="8" md="8">
                          <div
                            style={{
                              width: "242px",
                              borderRadius: "2px",
                              height: "79px",
                              border: "1px solid #D8D8D8",
                              textAlign: "center",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              <div>
                                <p
                                  className="text-muted"
                                  style={{ fontSize: "10px" }}
                                >
                                  <i
                                    className="mdi mdi-timer-outline mr-2"
                                    style={{ width: "10px", height: "12px" }}
                                  />{" "}
                                  Match Timer
                                </p>
                              </div>
                              <div>
                                <p
                                  style={{
                                    fontSize: "50px",
                                    textAlign: "center",
                                    fontWeight: "500",
                                  }}
                                >
                                  01:09:12
                                </p>
                              </div>
                            </div>
                          </div>
                        </Col>

                        <Col lg="4" md="4">
                          <div className="d-flex flex-column justify-content-between">
                            <div
                              className="mb-3"
                              style={{
                                width: "128px",
                                height: "38px",
                                backgroundColor: "#2B52BA",
                              }}
                            >
                              <div
                                style={{
                                  color: "#fff",
                                  textAlign: "center",
                                  margin: "auto",
                                  fontSize: "13px",
                                  padding: "8px 0",
                                }}
                              >
                                FINISH
                              </div>
                            </div>

                            <div
                              style={{
                                width: "128px",
                                backgroundColor: "#FF6D55",
                                height: "27px",
                              }}
                            >
                              <div
                                style={{
                                  color: "#fff",
                                  textAlign: "center",
                                  margin: "auto",
                                  fontSize: "10px",
                                  padding: "3px 0",
                                }}
                              >
                                Delete Tagging
                              </div>
                            </div>
                          </div>
                        </Col>
                      </Row>
                      {/*this is the div space for the video player*/}

                      <div
                        style={{
                          height: "242px",
                          width: "375px",
                          backgroundColor: "green",
                          marginTop: "10px",
                        }}
                      />
                      <ReactPlayer url="https://www.youtube.com/watch?v=ysz5S6PUM-U" />
                    </div>

                    <div className="text-center ">
                      <MatchTimer
                        expiryTimestamp={time}
                        onStart={() => {
                          setMatchState("started");
                        }}
                        onPause={() => {
                          setMatchState("paused");
                        }}
                        onResume={() => {
                          setMatchState("resumed");
                        }}
                        onStop={() => {
                          setMatchState("stopped");
                        }}
                        onRestart={() => {}}
                        onAlreadyStarted={() => {}}
                        timeElapsed={(timeObj) => {
                          handleTimeElapsed(timeObj);
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <h6>
                    <i className="mdi mdi-timeline-outline mdi-18px mr-2" />
                    Timeline
                  </h6>
                  <TimeLineView />
                </div>
              </div>
            </div>
          </div>

          <Fab
            mainButtonStyles={mainButtonStyles}
            style={floatingStyle}
            icon={<MFab />}
            alwaysShowTitle={true}
          >
            <Action
              style={{ backgroundColor: "green" }}
              text="Done"
              onClick={() => {
                handleDone();
              }}
            />

            <Action
              style={{ backgroundColor: "red" }}
              text="Delete"
              onClick={() => {
                handleDelete();
              }}
            />
          </Fab>
        </div>

        <EditRecordView />

        <AllTimeLineView />
      </div>

      <CustomSpinner />
    </>
  );
}
