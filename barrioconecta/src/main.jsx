import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/app/App.jsx'
import Footer from './components/footer/Footer.jsx'
import './index.css'
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
    <Footer />
  </BrowserRouter>,
)
