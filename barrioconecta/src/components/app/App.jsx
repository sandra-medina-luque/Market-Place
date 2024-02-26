import { useState } from 'react'
import ServiceForm from '../serviceForm/ServiceForm'
import './App.css'
import {Cloudinary} from "@cloudinary/url-gen";

function App() {
  const cld = new Cloudinary({cloud: {cloudName: 'dgtkeuzft'}});
  

  return (
    <>
      <ServiceForm/>
    </>
  )
}

export default App
