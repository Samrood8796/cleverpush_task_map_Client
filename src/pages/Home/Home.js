import React, { useState } from 'react'
import Navbar from '../../componants/Navbar/Navbar';
import Map from '../../componants/Mapbox/Map';
const Home = () => {
  const [showForm, setshowForm] = useState(false)
  return (
    <>
      <Navbar showForm={showForm} setshowForm={setshowForm} />
      <Map />
    </>
  );
};
 
export default Home;