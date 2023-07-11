import React, { useState } from "react";
import axios from "axios";
  import './fly.css'
const API_KEY = process.env.REACT_APP_MAPBOX_API_KEY
  
const Fly = ({ setLat, setLon }) => {
  
  // Setting up the state variable to store user input
  const [city, setCity] = useState("Kolkata");
  // Function to call the API and set the
  // coordinates accordingly
  function getCoordinates() {
    console.log(API_KEY);
    console.log(city);
    axios.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${city}.json?access_token=${API_KEY}`
    ).then((res) => {
      console.log(res);
      // Longitude
      setLon(res.data.features[0].geometry.coordinates[0]);
        
      // Latitude
      setLat(res.data.features[0].geometry.coordinates[1]);
    });
  }
  
  return (
    <div className="fly">
      <h2>Enter a city name</h2>
      <div className="inp-box text-black">
        <input
          type="text"
          onChange={(e) => {
            setCity(e.target.value);
          }}
        />
        <button className="text-white" onClick={() => getCoordinates()}>Go</button>
      </div>
    </div>
  );
};
  
export default Fly;