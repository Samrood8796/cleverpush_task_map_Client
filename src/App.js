import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home/Home';
import Blog from './pages/Blog/Blog';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import { useSelector } from 'react-redux';
const App = () => {
  const user = useSelector((state)=>state.user)
  console.log("user");
  console.log(user);
  return (
    <div className='container'>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={user ? <Home/> :<Navigate to={'/login'}/>} />
        <Route path='/blog/:id' element={<Blog/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/blog/${id}' element={<Blog/>} />
      </Routes> 
      </BrowserRouter>
    </div>
  );
};

export default App;