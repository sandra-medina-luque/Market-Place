import React from 'react';
import Home from '../../Views/Home';
import { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom';
import Footer from '../footer/Footer';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route>

        </Route>

      </Routes>

      <Footer />
        
    </>
  )
}

export default App
