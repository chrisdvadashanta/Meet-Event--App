import React from "react";

const NumberOfEvents = ({ setErrorAlert =()=>{}, eventNumber, onEventNumberChange }) => {

  const handleInputChanged = (value) => {
    const numberValue = parseInt(value); // Convert the input value to a number
    if (!isNaN(numberValue)) {
      onEventNumberChange(numberValue);
    } else {
      onEventNumberChange(0);
    };
    let errorText = "";
    if (isNaN(numberValue)) {
      errorText = "Please type in a number";
    } else if (numberValue <= 0 ) {
      errorText = "Only positive numbers are allowed";
    } else {
      // this assumes eventNumber is a variable in the outer scope
      eventNumber = numberValue; 
    };

    setErrorAlert(errorText);
  };

  return (
    <div id="number-of-events">
      <input
        type="text"
        className="textbox"
        placeholder="Enter a number"
        value={eventNumber}
        onChange={(e) => handleInputChanged(e.target.value)}
      />
    </div>
  );
};
export default NumberOfEvents;