import React from 'react';
import { useState, useEffect } from "react";


const CitySearch = ({ setInfoAlert=()=>{}, 
  allLocations, handleCitySelected =()=>{}, 
  setSelectedCity =()=>{},
  }) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (allLocations) {
      setSuggestions(allLocations);
    } else {
      setSuggestions([]);
    }
  }, [allLocations]);

  const handleInputChanged = (event) => {
    const value = event.target.value;
    const filteredLocations = allLocations ? allLocations.filter((location) => {
      if (location && typeof location === 'string') {
        return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
      }
      return false;
    }) : [];

    let infoText = "";
    if (filteredLocations.length === 0) {
      infoText = "We can not find the city you are looking for. Please try another city"
    } else {
      infoText = ""
    };
    setInfoAlert(infoText);  
    setQuery(value);
    setSuggestions(filteredLocations);
  };

  const handleItemClicked = (event) => {
    const value = event.target.textContent;
    handleCitySelected (value);
    setQuery(value);
    setShowSuggestions(false); // to hide the list
    setSelectedCity(value);
    setInfoAlert("");
  };

  return (
    <div id="city-search">
      <input
        type="text"
        className="city"
        value={query}
        placeholder="Search for a city"
        onFocus={() => setShowSuggestions(true)}
        onChange={handleInputChanged}
      />
      {showSuggestions ?
        <ul className="suggestions">
          {suggestions.map((suggestion) => {
            return <li onClick={handleItemClicked} key={suggestion}>{suggestion}</li>
          })}
          <li key='See all cities' onClick={handleItemClicked}>
            <b>See all cities</b>
          </li>
        </ul>
        : null
      }
    </div>
  )
}

export default CitySearch;
