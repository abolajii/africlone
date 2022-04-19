import React from "react";
import Chip from "@material-ui/core/Chip";
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import { random } from "gsap/all";

export default function EventsOutCome({event, possibleEventsOutCome, callBack}) {
    const defaultPossibleEventsOutCome = possibleEventsOutCome.length === 0 ? [] : possibleEventsOutCome;

    return <>
    {defaultPossibleEventsOutCome.length===0 ? <div style={{display:'inline-flex', alignItems:'center', whiteSpace:'nowrap', justifyContent:'center', verticalAlign:'middle'}}>
            <Chip className="mb-1" key={event} label={event} clickable onClick={()=>{callBack({"event":event, "outcome":event})}} />
            </div>:
       <div style={{display:'inline-flex', alignItems:'center', whiteSpace:'nowrap', justifyContent:'center', verticalAlign:'middle'}}>
                <ContextMenuTrigger holdToDisplay={1} id={event}>
                    <Chip className="mb-1" label={event} clickable/>
                </ContextMenuTrigger>

                <ContextMenu id={event}>
                    {defaultPossibleEventsOutCome.map((item, index) =>
                        <MenuItem key={index} data={{event: item}} onClick={(e, data)=>{callBack({"event":event, "outcome":data.event})}}>
                            <span>{item}</span>
                        </MenuItem>
                    )}
                </ContextMenu>
            </div>}
    </>
}