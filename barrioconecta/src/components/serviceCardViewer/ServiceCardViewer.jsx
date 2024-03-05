// ServiceCardViewer.js
import React from 'react';
import { useState, useEffect } from 'react';
import UserServiceCard from '../userServiceCard/UserServiceCard';
import Swal from 'sweetalert2';
import all from '../../assets/img/all.png'
import basico from '../../assets/img/basico.png'
import intermedio from '../../assets/img/intermedio.png'
import avanzado from '../../assets/img/avanzado.png'
import certificado from '../../assets/img/certificado.png'
import '../serviceCardViewer/serviceCardViewer.css'
import reserva from '../../assets/img/Reserva.png'


function ServiceCardViewer({ userServices }) {
    const [updatedUserServices, setUpdatedUserServices] = useState([]);
    const [filterCategory, setFilterCategory] = useState('all');
    const [selectedService, setSelectedService] = useState(null);

    useEffect(() => {
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

    const handleFilterCategory = (category) => {
        setFilterCategory(category);
    };

    const handleCardClick = (service) => {
        setSelectedService(service);
    };

    const closeDetailView = () => {
        setSelectedService(null);
    };

    const filteredUserServices = filterCategory === 'all'
        ? updatedUserServices
        : updatedUserServices.filter(service => service.category.toLowerCase() === filterCategory.toLowerCase());

    return (
        <div>
            <div className="filter-buttons">
                <div>
                    <h2>Todos</h2>
                    <button className="buttoncategory" onClick={() => handleFilterCategory('all')}>
                        <img src={all} alt="alllogo" />
                    </button>
                </div>
                <div>
                    <h2>Básico</h2>
                    <button className="buttoncategory" onClick={() => handleFilterCategory('básico')}>
                        <img src={basico} alt="basicologo" />
                    </button>
                </div>
                <div>
                    <h2>Medio</h2>
                    <button className="buttoncategory" onClick={() => handleFilterCategory('medio')}>
                        <img src={intermedio} alt="intermediologo" />
                    </button>
                </div>
                <div>
                    <h2>Avanzado</h2>
                    <button className="buttoncategory" onClick={() => handleFilterCategory('avanzado')}>
                        <img src={avanzado} alt="avanzadologo" />
                    </button>
                </div>
                <div>
                    <h2>Certificados</h2>
                    <button className="buttoncategory" onClick={() => handleFilterCategory('certificado')}>
                        <img src={certificado} alt="certificadologo" />
                    </button>
                </div>
            </div>

            <div className="row">
                {filteredUserServices.map((createdService) => (
                    <UserServiceCard
                        key={createdService.id}
                        userService={createdService}
                        imageUrl={createdService.image}
                        modoEdicion={false}
                        onDecrementStock={() => handleDecrementStock(createdService.id)}
                        onCardClick={() => handleCardClick(createdService)}
                    />
                ))}
            </div>

            {selectedService && (
                <div className="detailed-view">
                    <h2>{selectedService.name}</h2>
                    <img src={selectedService.image} alt={selectedService.name} style={{ width: '100%', height: '500px', objectFit: 'cover' }} />
                    <p>{selectedService.description}</p>
                    <p>Precio: {selectedService.price} €/hora</p>
                    <p>Categoría: {selectedService.category}</p>
                    <p>Stock: {selectedService.stock} horas</p>
                    <button onClick={() => handleDecrementStock(selectedService.id)}>
                        <img src={reserva} alt="reserlog" />
                    </button>
                    <button onClick={closeDetailView}>Cerrar Detalles</button>
                </div>
            )}
        </div>

    );
}

export default ServiceCardViewer;