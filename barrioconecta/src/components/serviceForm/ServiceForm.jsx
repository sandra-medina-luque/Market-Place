import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import '../serviceForm/serviceForm.css'
import { userService } from "../../../userService"
import UserServiceCard from "../userServiceCard/UserServiceCard";
import Swal from 'sweetalert2';
import { Cloudinary } from 'cloudinary-core';


function ServiceForm() {
    const [userServices, setUserServices] = useState([]);
    const cloudinary = new Cloudinary({ cloud_name: 'dgtkeuzft',api_key:'218195564675455',api_secret:'VdCth0EexRFyU0RNgiCXKp7D2G4', upload_preset: 'xu0rprvd' }); // Ajusta los parámetros según tu configuración de Cloudinary

    const [service, setService] = useState({
        name: '',
        description: '',
        image: '',
        price: '',
    });

    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/*',
        onDrop: (acceptedFiles) => {
              const file = acceptedFiles[0];
              try {
                cloudinary.uploader.upload(file, (result) => {
                  const imageUrl = cloudinary.url(result.public_id, { resource_type: 'image' });
                  setService((prevService) => ({ ...prevService, image: imageUrl }));
                });
              } catch (error) {
                console.error('Error uploading file to Cloudinary:', error);
              }
            },
    });

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const fetchedServices = await userService.getServices();
                setUserServices(fetchedServices);
            } catch (error) {
                console.error('Error al obtener servicios:', error);
            }
        };

        fetchServices();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const createdService = await userService.createService(service);
        console.log('Servicio creado:', createdService);

        setUserServices([...userServices, createdService]);
        setService({ name: '', description: '', image: '', price: '' });

        Swal.fire({
            icon: 'success',
            title: '¡Éxito!',
            text: 'Se ha creado correctamente el servicio de usuario.',
        });
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div {...getRootProps()}>
                    <input {...getInputProps()}
                    />
                    <p>Arrastre y suelte algunos archivos aquí, o haga clic para seleccionar archivos</p>
                </div>
                <label htmlFor="name">Nombre:</label>
                <input
                    type="text"
                    id="name"
                    value={service.name}
                    onChange={(e) => setService({ ...service, name: e.target.value })}
                />
                <label htmlFor="description">Descripción:</label>
                <textarea
                    id="description"
                    value={service.description}
                    onChange={(e) => setService({ ...service, description: e.target.value })}
                />
                <label htmlFor="price">Precio:</label>
                <input
                    type="text"
                    id="price"
                    value={service.price}
                    onChange={(e) => setService({ ...service, price: e.target.value })}
                />
                <button type="submit">Crear servicio</button>
            </form>
            <div className="row">
                {userServices.map((createdService) => (
                    <UserServiceCard
                        key={createdService.id}
                        userService={createdService}
                        imageUrl={service.image}
                    />
                ))}
            </div>
        </>
    );
}

export default ServiceForm;