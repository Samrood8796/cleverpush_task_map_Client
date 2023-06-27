import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Blog from './pages/Blog';
import Register from './pages/Register';
import Login from './pages/Login';
const App = () => {
  return (
    <div className='container'>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/blog/:id' element={<Blog/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/login' element={<Login/>} />
      </Routes> 
      </BrowserRouter>
    </div>
  );
};

export default App;