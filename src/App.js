import './App.css';
import { useState, useEffect } from 'react';
import React from 'react';
import EventList from './components/EventList';
import CitySearch from './components/CitySearch';
import NumberOfEvents from './components/NumberOfEvents';
import { getEvents } from '../src/api.js';


const App = () => {
    const [allLocations, setAllLocations] = useState([]);
    const [events, setEvents] = useState([]);

  useEffect(() => {
    // Fetch the events and update the state
    const fetchEvents = async () => {
      const events = await getEvents();
      setEvents(events);
    };

    fetchEvents();
  }, []);


  return (
    <div className="App">
        <NumberOfEvents /> 
        <EventList events={events}/>
        <CitySearch allLocations={allLocations} />
    </div>
  );
 }
 
 export default App;