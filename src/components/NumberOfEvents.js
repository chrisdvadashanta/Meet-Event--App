import React, { useState } from "react";

const NumberOfEvents = () => {
  const [numberOfEvents, setNumberOfEvents] = useState(32); 

  const handleChange = (event) => {
    const value = event.target.value;
    setNumberOfEvents(value);
  };

  return (
    <div id="number-of-events">
      <label htmlFor="number-of-events-textbox">Number of Events:</label>
      <input
        type="number"
        id="number-of-events-textbox"
        data-testid="number-of-events-textbox"
        value={numberOfEvents}
        onChange={handleChange}
      />
    </div>
  );
};

export default NumberOfEvents;
