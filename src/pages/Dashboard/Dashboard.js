import React, { useState } from 'react'
import PlaceTable from '../../componants/PlaceTable/PlaceTable'
import Navbar from '../../componants/Navbar/Navbar'

const Dashboard = () => {
  const [showForm, setshowForm] = useState(false)
  return (
    <>
    <Navbar showForm={showForm} setshowForm={setshowForm} />
    <PlaceTable/>
    </>
  )
}

export default Dashboard