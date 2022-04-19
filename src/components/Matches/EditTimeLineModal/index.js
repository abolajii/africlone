
import React, { useState } from "react";
import { Modal, Button } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import { Dropdown } from "react-bootstrap";

export default function EditTimeLineModal({players, eventList, modalState, editableEventObject, close, onClose, onSave}) {

    const useStyles = makeStyles((theme) => ({
        modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        paper: {
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        },
    }));
    const classes = useStyles();

    const [selectedPlayer, setSelectedPlayer] = useState(null);
    const [selectedEventType, setSelectedEventType] = useState(null);
    let events = [];

    console.log("@selectedPlayer ", selectedPlayer);
    console.log("@editableEventObject ", editableEventObject);

    const handleSelectedPlayerClick = (item, index) =>{
        setSelectedPlayer(item);
    };

    const handleSelectedEventTypeClick = (item, index) =>{
        handleSetEvents(item.type);
        setSelectedEventType(item);
    };

    const PlayersListViewItem = () =>{
        console.log("@item", item);

        return players.map((item, index)=>{
            return <Dropdown.Item key={index+"#"} onClick={()=>{handleSelectedPlayerClick(item, index)}}>{item.name}</Dropdown.Item>
        })
    };

    const EventTypesListViewItem = () =>{
        return eventList.map((item, index)=>{
            return <Dropdown.Item key={index+"#"} onClick={()=>{handleSelectedEventTypeClick(item, index)}}>{item.type}</Dropdown.Item>
        })
    };

    const EventsListViewItem = () =>{
        return events.map((item, index)=>{
            return <Dropdown.Item key={index+"#"} onClick={()=>{handleSelectedPlayerClick(item, index)}}>{item}</Dropdown.Item>
        })
    };

    const handleSetEvents =(type)=>{
        eventList.forEach(element => {
            if(element.type === type){
                events = element.events;
                console.log("Monitor...", events);
            }
        });
    };

    const PlayersListView = () =>{
        console.log("@editableEventObject", editableEventObject);
        return <div>
            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    {editableEventObject}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <PlayersListViewItem/>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    };

    const EventTypesListView = () =>{
        return <div>
            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    {editableEventObject.type}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <EventTypesListViewItem/>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    };

    const EventsListView = () =>{
        return <div>
            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    {editableEventObject.event}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <EventsListViewItem/>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    };

    handleSetEvents(editableEventObject.type);

    return <div>
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={modalState}
            onClose={onClose()}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={modalState}>
                <div style={{width:'50%'}} className={classes.paper}>
                    <h2 id="transition-modal-title">{editableEventObject.playerName}</h2>
                    <p style={{color:'red'}} onClick={()=>{close()}}>X</p>
                    <PlayersListView/>
                    <EventTypesListView/>
                    <EventsListView/>
                    <Button onClick={()=>{onSave(editableEventObject)}}>Save</Button>
                </div>
            </Fade>
        </Modal>
    </div>
}