import React from "react";
import Event from "../components/Event";

const EventList = ({ events }) => {
 return (
   <ul id="event-list">
     {events ?
       events.map(event => <Event key={event.id}  event={event} id={event.id} />) :
       null}
   </ul>
 );
}

export default EventList;
