import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../../Views/Home';
import Login from '../../Views/Login';
import Dashboard from '../../Views/Dashboard';
import Welcome from '../../Views/Welcome';
import './App.css'

function App() {

  return (
    <>

      <Routes>
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  )
}

export default App
