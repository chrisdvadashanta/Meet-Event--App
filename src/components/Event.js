import React from "react";
import { useState } from "react";

const Event = ( {event} ) => {
    const [showDetails, setShowDetails] = useState (false);
    const toggleDetails = () => {
        setShowDetails(!showDetails);
    }

    return (
        <li >
            <div className="event-box">
                <h1 className="event-title">{event.summary} </h1>    
                <p>{event.start.dateTime}</p>
                <p className="event-location"> {event.location} </p>
                {showDetails && <div className="event-desciption">
                    <h2> About this Event</h2>
                    <p className="event-desciption-text">{event.description} </p>
                </div>}
                <button className="event-details-button" onClick={toggleDetails}> 
                {showDetails ? "Hide Details" : "Show Details"}
                </button>
            </div>  
        </li>
    );
};

export default Event;
