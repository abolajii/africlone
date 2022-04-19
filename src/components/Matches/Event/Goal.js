import React from "react";
import EventsOutCome from './EventsOutCome';

export default function Goal({title, listOfEvents, listOfPossibleEventsOutComes, callBack}) {
    const defaultEvents = listOfEvents.length == 0 ? ['Event 0', 'Event 1', 'Event 2'] : listOfEvents;

    const Events = () => {
        return defaultEvents.map(event => {
            return <EventsOutCome event={event} possibleEventsOutCome={listOfPossibleEventsOutComes} callBack={(data)=>{callBack(data)}}/>
        });
    }

    return <>
        <div className="pl-4">
        <p className="mb-1">{title}</p>
         <Events/>
        </div>
    </>
}