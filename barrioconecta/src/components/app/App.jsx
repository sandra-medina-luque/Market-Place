import { useEffect } from 'react'
import ServiceForm from '../serviceForm/ServiceForm'
import './App.css'
import { Routes, Route } from 'react-router-dom';
import Footer from '../footer/Footer';


function App() {
  

  return (
    <>
      <ServiceForm  />  {/* Pasa la instancia de CloudinaryCore a ServiceForm */}
    </>
  );
}

export default App;