// ServiceCardViewer.js
import React from 'react';
import { useState, useEffect } from 'react';
import UserServiceCard from '../userServiceCard/UserServiceCard';
import { userService } from '../../../userService';
import Swal from 'sweetalert2';

function ServiceCardViewer({ userServices }) {
    const [updatedUserServices, setUpdatedUserServices] = useState([]);
  
    useEffect(() => {
      // Sincronizar el estado local con las propiedades recibidas
      setUpdatedUserServices([...userServices]);
    }, [userServices]);
  
    const handleDecrementStock = (serviceId) => {
      setUpdatedUserServices((prevServices) =>
        prevServices.map((service) =>
          service.id === serviceId ? { ...service, stock: service.stock - 1 } : service
        )
      );
      Swal.fire({
        icon: 'success',
        title: 'Reserva Exitosa',
        text: 'Hora reservada con éxito',
      });
    };
  
    return (
      <div className="row">
        {updatedUserServices.map((createdService) => (
          <UserServiceCard
            key={createdService.id}
            userService={createdService}
            imageUrl={createdService.image}
            modoEdicion={false}
            onDecrementStock={() => handleDecrementStock(createdService.id)}
          />
        ))}
      </div>
    );
  }
  
  export default ServiceCardViewer;