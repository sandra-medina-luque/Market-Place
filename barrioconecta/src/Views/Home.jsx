import React, { useState, useEffect } from 'react';
//import ServiceForm from '../serviceForm/ServiceForm'
import ServiceCardViewer from '../components/serviceCardViewer/ServiceCardViewer';
import { userService } from '../../userService';
import Navbar2 from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer'


function Home() {

  const [userServices, setUserServices] = useState([]);
  
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const fetchedServices = await userService.getServices(); // Ajusta según tu lógica
        setUserServices(fetchedServices);
      } catch (error) {
        console.error('Error al obtener servicios:', error);
      }
    };

    fetchServices();
  }, []);


  return (
    <>
    <Navbar2/>
     < ServiceCardViewer userServices={userServices} />
     <Footer/>
    </>
  );
}

export default Home;
