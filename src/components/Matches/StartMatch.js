import React, { useEffect, useState } from "react";
import "../../styles/start-match.scss";
import Field from "../../assets/football_field.png";
import { useLocation } from "react-router-dom";
import players from "../../helpers/players";
import { useEvent } from "../../store/contexts/playerevent";
import { getMatch } from "../../services/match.service";
import { MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import {FaRegCopy, FaList,FaEllipsisV, FaShareAlt} from 'react-icons/fa'
import {RiSendPlaneFill, RiDeleteBin6Line} from 'react-icons/ri'

import Event from './Event/Event';
import MatchTimer from './MatchTimer';

export default function StartMatch() {
  const time = new Date();
  time.setSeconds(time.getSeconds() + 300);

  const { dispatch } = useEvent();
  const location = useLocation();
  const [homePlayers, setHomePlayers] = useState({ first: [], second: [] });
  const [homeLineUp, setHomeLineUp] = useState([]);
  const [awayLineUp, setAwayLineUp] = useState([]);
  const [homeTeam, setHomeTeam] = useState(null);
  const [awayTeam, setAwayTeam] = useState(null);
  const [homeSubs, setHomeSubs] = useState([]);
  const [awaySubs, setAwaySubs] = useState([]);
  
  const data = [
    {
      id: 1,
      name: "Iwu Winifred",
      event: "Pass",
      type: "Short",
      outcome: "Successful",
      start_time: "0:01",
      stop_time: "0:02",
    },
    {
      id: 2,
      name: "Temi Collins",
      event: "Dribble",
      type: "Nutmeg",
      outcome: "Successful",
      start_time: "0:04",
      stop_time: "0:05",
    },
    {
      id: 8,
      name: "Temi Collins",
      event: "Dribble",
      type: "Nutmeg",
      outcome: "Successful",
      start_time: "0:04",
      stop_time: "0:05",
    },
  ];

  const data_icons = {
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
    rows: 
      data.map((data, index) => {
        return {
          id: index + 1,
          name: data.name,
          event: data.event,
          type: data.type,
          outcome: data.outcome,
          start: data.start_time,
          stop: data.stop_time,
          action: [
            <i className="mdi mdi-pen text-primary" onClick={()=>{editTimeline(data)}}/>,
            <i className="mdi mdi-trash-can text-danger" onClick={()=>{deleteTimeline(data)}}/>,
          ],
        };
      })
  };

  useEffect(() => {
    let match = {
      match: `${location.state.match}`
    }
    getMatch(match)
      .then(response => response.json())
      .then(data => {
        let status = data.status;
        if (status == 200) {
          console.log('hereee')
          dispatch({ type: 'add_player_event', name: "Nnamdi", _id: 1, shots: 15  } );
          dispatch({ type: 'add_match_event', _id: 66, offside: 2 })
          console.log(data)
          setHomeTeam(data.data.team_A.team_name);
          setAwayTeam(data.data.team_B.team_name);
          setHomeLineUp(data.data.team_A_line_up);
          setAwayLineUp(data.data.team_B_line_up);
          setHomeSubs(data.data.team_A_subs);
          setAwaySubs(data.data.team_B_subs);
        }
      })
      .catch(reason => {

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

  const deleteTimeline = (src) =>{
      console.log("Deleting ...", src);
  }

  const editTimeline = (src) =>{
    console.log("Editing ...", src);
  }

  const eventList = [{'type':'Goal', 'events':['Header', 'Inside box', 'Outside box'], 'outcomes':[]},
  {'type':'Pass', 'events':['Long', 'Line break', 'Short'], 'outcomes':['Successful', 'Unsuccessful']},
  {'type':'Saves', 'events':['Inside box', 'Outside box', '1 V 1'], 'outcomes':[]},
  {'type':'Shot', 'events':['Long range', 'Short range'], 'outcomes':['Successful', 'Unsuccessful']},
  {'type':'Duel', 'events':['Aerial', 'Ground'], 'outcomes':['Won']},
  {'type':'Dribble', 'events':['Nutmeg', 'Skill move'], 'outcomes':['Successful', 'Unsuccessful']},
  {'type':'Cards', 'events':['Dissent', 'Foul'], 'outcomes':['Red', 'Yellow']},
  {'type':'Ball Progression', 'events':['Ownhalf', 'Opponents half'], 'outcomes':[]},
  {'type':'Clearance', 'events':['Goal line', 'Under pressure'], 'outcomes':[]},
  {'type':'Others', 'events':['Assist', 'Penalty', 'Freekick', 'Tackle', 'Block', 'Cross'], 'outcomes':[]}];

  const Events = () =>{
    return eventList.map(event => {
      return <Event title={event.type} listOfEvents={event.events} listOfPossibleEventsOutComes={event.outcomes} callBack={(marshalledEventOutCome)=>{console.log(marshalledEventOutCome)}}/>
    });
  }

  return (
    <>
       <ContextMenu id="contextmenu">
        <MenuItem data={{copy: 'MI50'}} >
          <FaRegCopy className="copy"/>
          <span>Copy</span>
        </MenuItem>
        <MenuItem >
          <FaEllipsisV className="openwith"/>
          <span>Open with</span>
        </MenuItem>
        <MenuItem >
          <FaList className="watchlist"/>
          <span>Add to watchlist</span>
        </MenuItem>
        <MenuItem>
          <RiSendPlaneFill className="send"/>
          <span>Send</span>
        </MenuItem>
        <MenuItem>
          <RiDeleteBin6Line className="delete"/>
          <span>Delete</span>
        </MenuItem>
        <MenuItem>
          <FaShareAlt className="share"/>
          <span>Share</span>
        </MenuItem>
      </ContextMenu>
    
    <div className="container-fluid start-match">
      <div className="row pt-2">
        <div className="col-4 pl-5">
          <p className="text-muted mb-0">08/10/20</p>
          <p className="text-muted">Nigeria Professional Premier League</p>
          <h6>
            {homeTeam} vs {awayTeam}
          </h6>
        </div>
        <div className="col-4 text-center">
          <p className="text-muted">
            <i className="mdi mdi-timer-outline mr-2" /> Timer </p>
            <MatchTimer expiryTimestamp={time} onStart={()=>{}} onPause={()=>{}} onResume={()=>{}} onStop={()=>{}} onRestart={()=>{}} onAlreadyStarted={()=>{}} />
        </div>
        
        <div className="col-12 mt-5 row px-5">
          <div className="col-lg-2">
            <h6>
              <i className="mdi mdi-strategy mr-2" />
              {homeTeam}
            </h6>
            <p className="mb-1 mt-3 text-muted">Starting line-up</p>
            <ul>
              {homeLineUp.map((player) => (
                <li className="players">
                  <span>{player.number}</span> {player.name}
                </li>
              ))}
            </ul>
            <p className="mb-1 mt-2 text-muted">Substitutions</p>
            <ul>
              {homeSubs.map((player) => (
                <li className="players">
                  <span>{player.number}</span> {player.name}
                </li>
              ))}
            </ul>
          </div>

          <div className="col-lg-8">
            <div className="col-12 field">
            
              <div className="row">
                <div className="col-6">
                  <img src={Field} alt="field" />
                  <div className="field-players">
                    <div className="board">
                      <div className="home">
                      <ContextMenuTrigger id="contextmenu">
                        <span className="btn gk">
                          {homeLineUp[0]?.number}
                        </span>
                        </ContextMenuTrigger>
                        <ContextMenuTrigger id="contextmenu">
                        <span className="btn lb">
                          {homeLineUp[1]?.number}
                        </span>
                        </ContextMenuTrigger>
                        <span className="btn cb1">
                          {homeLineUp[2]?.number}
                        </span>
                        <span className="btn cb2">
                          {homeLineUp[3]?.number}
                        </span>
                        <span className="btn rb">
                          {homeLineUp[4]?.number}
                        </span>
                        <span className="btn lm">
                          {homeLineUp[5]?.number}
                        </span>
                        <span className="btn cm">
                          {homeLineUp[6]?.number}
                        </span>
                        <span className="btn rm">
                          {homeLineUp[7]?.number}
                        </span>
                        <span className="btn lf">
                          {homeLineUp[8]?.number}
                        </span>
                        <span className="btn rf">
                          {homeLineUp[9]?.number}
                        </span>
                        <span className="btn cf">
                          {homeLineUp[10]?.number}
                        </span>
                        {/* </ContextMenuTrigger> */}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-6">
                  <img src={Field} alt="field" />
                  <div className="field-players">
                    <div className="board">
                      <div className="away">
                        <span className="btn gk">
                          {awayLineUp[0]?.number}
                        </span>
                        <span className="btn lb">
                          {awayLineUp[1]?.number}
                        </span>
                        <span className="btn cb1">
                          {awayLineUp[2]?.number}
                        </span>
                        <span className="btn cb2">
                          {awayLineUp[3]?.number}
                        </span>
                        <span className="btn rb">
                          {awayLineUp[4]?.number}
                        </span>
                        <span className="btn lm">
                          {awayLineUp[5]?.number}
                        </span>
                        <span className="btn cm">
                          {awayLineUp[6]?.number}
                        </span>
                        <span className="btn rm">
                          {awayLineUp[7]?.number}
                        </span>
                        <span className="btn lf">
                          {awayLineUp[8]?.number}
                        </span>
                        <span className="btn rf">
                          {awayLineUp[9]?.number}
                        </span>
                        <span className="btn cf">
                          {awayLineUp[10]?.number}
                        </span>
                      </div>
                    </div>

                    {/* 
                  <div className="away">
                    <span className="btn gk">
                      {homePlayers?.second[0]?.number}
                    </span>
                    <span className="btn lb">
                      {homePlayers?.second[1]?.number}
                    </span>
                    <span className="btn cb1">
                      {homePlayers?.second[2]?.number}
                    </span>
                    <span className="btn cb2">
                      {homePlayers?.second[3]?.number}
                    </span>
                    <span className="btn rb">
                      {homePlayers?.second[4]?.number}
                    </span>
                    <span className="btn lm">
                      {homePlayers?.second[5]?.number}
                    </span>
                    <span className="btn cm">
                      {homePlayers?.second[6]?.number}
                    </span>
                    <span className="btn rm">
                      {homePlayers?.second[7]?.number}
                    </span>
                    <span className="btn lf">
                      {homePlayers?.second[8]?.number}
                    </span>
                    <span className="btn rf">
                      {homePlayers?.second[9]?.number}
                    </span>
                    <span className="btn cf">
                      {homePlayers?.second[10]?.number}
                    </span>
                  </div> */}
                  </div>
                </div>
              </div>
        
              <div className="mt-4">
                <h6 className="mb-1">
                  <i className="mdi mdi-shoe-print mdi-18px mr-2" />
                  Events
                </h6>
                <div className="events mt-2 px-2 pt-2">
                  <div className="row mb-3">
                    <Events/>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <h6>
                  <i className="mdi mdi-timeline-outline mdi-18px mr-2" />
                  Timeline
                </h6>
                <div className="timeline mt-2">
                  <div className="header">
                    <MDBTable hover fixed scrollY>
                      <MDBTableHead columns={data_icons.columns} />
                      <MDBTableBody rows={data_icons.rows} />
                    </MDBTable>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-2 text-right">
            <h6>
              <i className="mdi mdi-strategy mr-2" />
              {awayTeam}
            </h6>
            <p className="mb-1 mt-3 text-muted">Starting line-up</p>
            <ul>
              {awayLineUp.map((player) => (
                <li className="players">
                  {player.name} <span>{player.number}</span>
                </li>
              ))}
            </ul>
            <p className="mb-1 mt-2 text-muted">Substitutions</p>
            <ul>
              {awaySubs.map((player) => (
                <li className="players">
                  {player.name} <span>{player.number}</span>
                </li>
              ))}
            </ul>
          </div>
        
        </div>

      </div>
    </div>

    </>
  );
 
}