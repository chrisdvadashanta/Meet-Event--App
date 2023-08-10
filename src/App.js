import React from 'react';
import { useState, useEffect } from 'react';
import EventList from './components/EventList';
import CitySearch from './components/CitySearch';
import NumberOfEvents from './components/NumberOfEvents';
import CityEventsChart from './components/CityEventsChart';
import EventsPieChart from './components/EventsPieChart';
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
      const fetchData = async () => {
        try {
          const eventList = await getEvents();
          setEvents(eventList);
          setAllLocations(extractLocations(eventList));
        } catch (error) {
          console.log(error);
        }
      };
      if (navigator.onLine) {
        fetchData();
        setWarningAlert("");
      } else {
        setWarningAlert("You are currently offline ");
      }
      
    }, [selectedCity,eventNumber ]);

    
    const handleCitySelected = (city) => {
      setSelectedCity(city);
  
      if (city === "See all cities") {
        setSelectedCity(null); 
        setFilteredEvents(events);
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
          {/* Charts */}
        <div className='chart-container'>
        <CityEventsChart allLocations={allLocations} events={events} selectedCity={selectedCity} />
        <EventsPieChart events={events} />
        </div>
        <EventList events={filteredEvents.length > 0 ? filteredEvents.slice(0, eventNumber ) : events.slice(0, eventNumber )}/>
    </div>
  );
 }
 
 export default App;