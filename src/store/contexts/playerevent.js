import React, { useReducer, useEffect, useContext } from "react";
import eventReducer from "../reducers/playerevent";

const EventContext = React.createContext(null);
let initialEvent;

try {
    initialEvent = JSON.parse(localStorage.getItem('event')) ?? {
        match: {

        },
        players: []
    }
    //initialEvent = JSON.parse(localStorage.getItem("event")) ?? []
} catch {
    console.error("The cart could not be parsed into JSON.");
    initialEvent = [];
}

export function EventProvider(props) {
    const [event, dispatch] = useReducer(eventReducer, initialEvent);
    console.log('made it ' + event);
    useEffect(() => localStorage.setItem("event", JSON.stringify(event)), [event] );
    const contextValue = {
        event,
        dispatch
    };
    return (
        <EventContext.Provider value={contextValue}>
            {props.children}
        </EventContext.Provider>
    )
}

export function useEvent() {
    const context = useContext(EventContext);
    if (!context) {
        throw new Error("use cart must be used within a provider")
    }
    return context;  
} 