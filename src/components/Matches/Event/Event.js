import React from "react";
import EventsOutCome from './EventsOutCome';

export default function Event({title, listOfEvents, listOfPossibleEventsOutComes, callBack}) {
    const defaultEvents = listOfEvents.length == 0 ? [] : listOfEvents;
    return <>
        <div key={title+"div"} className="pl-4">
        <p key={title+"p"} className="mb-1">{title}</p>
        {defaultEvents.map((event) =>  <EventsOutCome event={event} possibleEventsOutCome={listOfPossibleEventsOutComes} callBack={(data)=>{callBack({...data, type:title})}}/> )}
        </div>
    </>
}