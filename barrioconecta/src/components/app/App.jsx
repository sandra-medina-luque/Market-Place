import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../../Views/Home';
import Login from '../../Views/Login';
import Dashboard from '../../Views/Dashboard';
import Welcome from '../../Views/Welcome';
import Footer from '../footer/Footer';
import './App.css'

function App() {

  return (
    <>

      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
