// ServiceCardViewer.js
import React from 'react';
import { useState, useEffect } from 'react';
import UserServiceCard from '../userServiceCard/UserServiceCard';
import { userService } from '../../../userService';
import Swal from 'sweetalert2';
import basico from '../../assets/img/basico.png'
import intermedio from '../../assets/img/intermedio.png'
import avanzado from '../../assets/img/avanzado.png'
import certificado from '../../assets/img/certificado.png'
import '../serviceCardViewer/serviceCardViewer.css'

function ServiceCardViewer({ userServices }) {
    const [updatedUserServices, setUpdatedUserServices] = useState([]);
    const [filterCategory, setFilterCategory] = useState('all');

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

    const filteredUserServices = filterCategory === 'all'
        ? updatedUserServices
        : updatedUserServices.filter(service => service.category.toLowerCase() === filterCategory.toLowerCase());

    return (
        <div>
            <div className="filter-buttons">
                <div>
                    <h2>Todos</h2>
                    <button className="buttoncategory" onClick={() => handleFilterCategory('all')}>
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
                <h2>Certificado</h2>
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
                    />
                ))}
            </div>
        </div>
    );
}

export default ServiceCardViewer;