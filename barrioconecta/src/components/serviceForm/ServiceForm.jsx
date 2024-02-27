import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import '../serviceForm/serviceForm.css'
import { userService } from "../../../userService"
import UserServiceCard from "../userServiceCard/UserServiceCard";
import Swal from 'sweetalert2';
import { Cloudinary as CloudinaryCore } from 'cloudinary-core';

function ServiceForm(cloudinary) {
    const [userServices, setUserServices] = useState([]);
    const cld = new CloudinaryCore({ cloud: { cloudName: 'dgtkeuzft', uploadPreset:'xu0rprvd' } });



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
            const uploadPromise = cloudinary.uploader.upload(file);

            uploadPromise
                .then((result) => {
                    const imageUrl = cld.image(result.public_id).toURL();
                    setService(prevService => ({ ...prevService, image: imageUrl }));
                })
                .catch((error) => {
                    console.error('Error en la carga de la imagen a Cloudinary:', error);
                });
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

        // Actualizar el estado con el servicio creado
        setUserServices([...userServices, createdService]);

        // Reiniciar el formulario
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
                    onChange={(e) =>
                        setService({ ...service, description: e.target.value })
                    }
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
            <div>
                {userServices.map((userService) => (
                    <UserServiceCard key={userService.id} userService={userService} />
                ))}
            </div>
        </>
    );
}

export default ServiceForm;