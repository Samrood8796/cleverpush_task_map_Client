import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home/Home';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import { useSelector } from 'react-redux';
import Dashboard from './pages/Dashboard/Dashboard';
const App = () => {
  const user = useSelector((state)=>state.user)
  return (
    <div className='container'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={user ? <Home />: <Navigate to={'/login'}/>} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/dashboard' element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;