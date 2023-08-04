import React from 'react';
import { useState, useEffect } from 'react';
import EventList from './components/EventList';
import CitySearch from './components/CitySearch';
import NumberOfEvents from './components/NumberOfEvents';
import { extractLocations, getEvents } from '../src/api.js';
import './App.css';

const App = () => {
    const [allLocations, setAllLocations] = useState([]);
    const [events, setEvents] = useState([]);
    const [eventNumber, setEventNumber] = useState(32);
    const [selectedCity, setSelectedCity] = useState("");
    const [filteredEvents, setFilteredEvents] = useState([]);



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
      fetchData();
    }, []);

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
        <CitySearch allLocations={allLocations} handleCitySelected={handleCitySelected} />
        <NumberOfEvents eventNumber={eventNumber} onEventNumberChange={handleEventNumberChange} /> 
        <EventList events={filteredEvents.length > 0 ? filteredEvents.slice(0, eventNumber ) : events.slice(0, eventNumber )}/>
        
    </div>
  );
 }
 
 export default App;