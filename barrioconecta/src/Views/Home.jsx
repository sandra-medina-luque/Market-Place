import React, { useState, useEffect } from 'react';
//import ServiceForm from '../serviceForm/ServiceForm'
import ServiceCardViewer from '../components/serviceCardViewer/ServiceCardViewer';
import { userService } from '../../userService';


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
     <ServiceCardViewer userServices={userServices} />
    </>
  );
}

export default Home;