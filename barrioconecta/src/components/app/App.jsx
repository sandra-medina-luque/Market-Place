import React from 'react';
import Home from '../../Views/Home';
import Login from '../../Views/Login';
import './App.css'
import { Routes, Route } from 'react-router-dom';



function App() {

  return (
    <>
    
      <Routes>
        <Route path = "/" element ={<Home/>}/>
        <Route path = "/login" element ={<Login/>}/>
      

      </Routes>

    </>
  )
}

export default App
