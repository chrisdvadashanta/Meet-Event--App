import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useState, useEffect, useCallback } from 'react';

const CityEventsChart = ({ allLocations, events, selectedCity }) => {
  const [data, setData] = useState([]);

  const getData = useCallback(() => {
    if (selectedCity && typeof selectedCity === 'string') {
      const count = events.filter((event) => event.location === selectedCity).length;
      const city = selectedCity.split(/, | - /)[0];
      return [{ city, count }];
  } else {
      return allLocations.map((location) => {
          if (typeof location !== 'string' || !location) {
              console.error('Invalid value for location:', location);
              return { city: '', count: 0 };  // or another suitable default value
          }
  
          const count = events.filter((event) => event.location === location).length;
          const city = location.split(/, | - /)[0];
          return { city, count };
      });
  }
}, [allLocations, events, selectedCity]);

  useEffect(() => {
    setData(getData());
  }, [events, getData, selectedCity]);


  return (
    <ResponsiveContainer width="99%" height={400}>
      <ScatterChart
        margin={{
          top: 20,
          right: 20,
          bottom: 60,
          left: -30,
        }}
      >
        <CartesianGrid />
        <XAxis type="category" dataKey="city" name="City" angle={60} interval={0} tick={{ dx: 20, dy: 40, fontSize: 14 }} />
        <YAxis type="number" dataKey="count" name="Numer of Events" allowDecimals={false} />
        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
        <Scatter name="A school" data={data} fill="#8884d8" />
      </ScatterChart>
    </ResponsiveContainer>
  );
}

export default CityEventsChart