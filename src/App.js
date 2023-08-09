import React from 'react';
import { useState, useEffect } from 'react';
import EventList from './components/EventList';
import CitySearch from './components/CitySearch';
import NumberOfEvents from './components/NumberOfEvents';
import { extractLocations, getEvents } from '../src/api.js';
import { InfoAlert, ErrorAlert, WarningAlert } from '../src/components/Alert';

import './App.css';

const App = () => {
    const [allLocations, setAllLocations] = useState([]);
    const [events, setEvents] = useState([]);
    const [eventNumber, setEventNumber] = useState(32);
    const [selectedCity, setSelectedCity] = useState("");
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [infoAlert, setInfoAlert] = useState("");
    const [errorAlert, setErrorAlert] = useState("");
    const [warningAlert, setWarningAlert] = useState ("");


    useEffect(() => {
      // console.log("Warning", warningAlert);
      const fetchData = async () => {
        try {
          const eventList = await getEvents();
          setEvents(eventList);
          setAllLocations(extractLocations(eventList));
        } catch (error) {
          console.log(error);
        }
      };
      // let infoText ="";
      // if (navigator.onLine) {
      //   infoText = ""
      // } else {
      //   infoText = "You are currently offline "};
      
      // setWarningAlert (infoText);
      fetchData();
    }, [selectedCity,eventNumber ]);

    useEffect(() => {
      console.log("Warning", warningAlert);
    
      const fetchData = async () => {
        let infoText = navigator.onLine ? "" : "You are currently offline ";
    
        if (infoText !== warningAlert) {
          setWarningAlert(infoText);
        }
      };
    
      fetchData();
    }, [warningAlert]);
    


    const handleCitySelected = (city) => {
      setSelectedCity(city);
  
      if (city === "See all cities") {
        setFilteredEvents([]);
        setEventNumber(32);
      } else {
        const filteredEvents = events.filter((event) => event.location === city);
        //use eventNumber if present to limit number
        setFilteredEvents(filteredEvents);
      }
    };

    const handleEventNumberChange = (value) => {
      setEventNumber(value);
    };


  return (
    <div className="App">
        <div className="alerts-container">
          {infoAlert.length ? <InfoAlert text={infoAlert}/> : null}
        </div>
        <div className="alerts-container">
          {errorAlert.length ? <ErrorAlert text={errorAlert}/> : null}
        </div>
        <div className="alerts-container">
          {warningAlert.length ? <WarningAlert text={warningAlert}/> : null}
        </div>
        <CitySearch allLocations={allLocations} 
        handleCitySelected={handleCitySelected} 
        setInfoAlert={setInfoAlert} 
        />
        <NumberOfEvents 
        setErrorAlert={setErrorAlert}
        eventNumber={eventNumber} onEventNumberChange={handleEventNumberChange} /> 
        <EventList events={filteredEvents.length > 0 ? filteredEvents.slice(0, eventNumber ) : events.slice(0, eventNumber )}/>
        
    </div>
  );
 }
 
 export default App;