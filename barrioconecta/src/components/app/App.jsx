import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../../Views/Home';
import Login from '../../Views/Login';
import Dashboard from '../../Views/Dashboard';
import WelcomeView from '../../Views/WelcomeView'

import './App.css'
import Error404 from '../../Views/Error404';

function App() {

  return (
    <>

      <Routes>
        <Route path="/" element={<WelcomeView />} />
        <Route path="/welcomeView" element={<WelcomeView />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/error404" element={<Error404 />} />
      </Routes>
     
    </>
  );
}

export default App;