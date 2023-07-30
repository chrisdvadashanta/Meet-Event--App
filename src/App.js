import './App.css';
import { useState } from 'react';
import React from 'react';
import EventList from './components/EventList';
import CitySearch from './components/CitySearch';


const App = () => {
    const [allLocations, setAllLocations] = useState([]);

  return (
    <div className="App">
        <EventList />
        <CitySearch allLocations={allLocations} />
    </div>
  );
 }
 
 export default App;