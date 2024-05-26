// src/App.js
import React, { useState, useEffect } from 'react';
import MapComponent from './Map';
import Data from './bigdata.json'; // Importing the JSON file directly
//import { event } from 'jquery';

const App = () => {
  const [processedData, setProcessedData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const processData = () => {
      // Calculate stoppage duration, reach time, and end time
      const processed = calculateStoppageAndTime(Data);
      setProcessedData(processed);
      setLoading(false);
    };

    processData();
  }, []);

  const calculateStoppageAndTime = (data) => {
    let totalStoppageDuration = 0;
    const processed = data.map((point, index) => {
      const latitude = parseFloat(point.latitude);
      const longitude = parseFloat(point.longitude);
      const speed = parseInt(point.speed);
      const eventGeneratedTime = parseInt(point.eventGeneratedTime);
   console.log(eventGeneratedTime);
      // Check if the speed is 0 to identify stoppage
      const isStoppage = speed === 0;

      // Calculate reach time and end time
      let reachTime = 0;
      let endTime =0;
      let stoppageDuration=0;
      if (index > 0) {
        const prevPoint = data[index - 1];
        if (prevPoint.speed === "0" && point.speed !== "0") {
          reachTime = parseInt(point.eventGeneratedTime);
          totalStoppageDuration += reachTime - parseInt(prevPoint.eventGeneratedTime);
        }
        if (prevPoint.speed !== "0" && point.speed === "0") {
          endTime = parseInt(point.eventGeneratedTime);
        }
      }
      stoppageDuration=totalStoppageDuration;
      return {
        ...point,
        isStoppage,
        latitude,
        longitude,
        eventGeneratedTime,
        reachTime,
        endTime,
        stoppageDuration
      };
    });

    console.log('Total stoppage duration:', totalStoppageDuration, 'milliseconds');

    return processed;
  };
console.log(processedData);
  return (
    <div>
      <h1>Leaflet Map Example</h1>
      {loading ? (
        <p>Loading data...</p>
      ) : (
        <MapComponent locations={processedData} />
      )}
    </div>
  );
};

export default App;
