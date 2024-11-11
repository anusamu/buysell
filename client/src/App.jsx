// src/App.js
import React from 'react';
import {  Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './pages/Dashboard';
import Single from './pages/Single';
import Add from './pages/Add';
import ProfilePage from './pages/Profile';
import UserListing from './pages/Userlisting';
import AdminAdd from './pages/Addminadd';

// import UserProfile from './pages/Profile';

const App = () => {
  return (
    
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home/single" element={<Single />} />
        <Route path="/add" element={<Add />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<ProfilePage/>} />
        <Route path="/userListing" element={<UserListing/>} />
        <Route path="/adminAdd" element={<AdminAdd/>} />
       


       
      </Routes>
    
  );
};

export default App;


