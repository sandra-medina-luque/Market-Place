import React, { useState, useEffect, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import '../serviceForm/serviceForm.css'
import { userService } from "../../../userService"
import UserServiceCard from "../userServiceCard/UserServiceCard";
import Swal from 'sweetalert2';
import { image } from "@cloudinary/url-gen/qualifiers/source";



function ServiceForm() {
    const [userServices, setUserServices] = useState([]);

    const [service, setService] = useState({
        name: '',
        description: '',
        image: '',
        price: '',
    });


    const onDrop = useCallback((acceptedFiles) => {
        setService({ ...service, image: acceptedFiles[0] });
    }, [service]);

    const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({ onDrop });

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


    const cloudinaryApiUrl = 'https://api.cloudinary.com/v1_1/<dgtkeuzft>/image/upload';


    const handleSubmit = async (e) => {
        e.preventDefault();

        // Crea un nuevo objeto FormData
        const formData = new FormData();

        // Agrega el archivo de imagen al objeto FormData
        formData.append('file', service.image);
        formData.append('upload_preset', 'llrytk0i');
        formData.append('api_key', '218195564675455');
        formData.append('api_secret', 'VdCth0EexRFyU0RNgiCXKp7D2G4');

        try {
            // Envía una solicitud POST a la API de Cloudinary
            const res = await fetch(cloudinaryApiUrl, {
                method: 'POST',
                body: formData,
            });

            // Analiza la respuesta como JSON
            const data = await res.json();

            // Extrae la URL de la imagen de la respuesta
            const imageUrl = data.secure_url;

            // Crea un nuevo objeto de servicio con la URL de la imagen
            const createdService = {
                name: service.name,
                description: service.description,
                image: imageUrl,
                price: service.price,
            };

            // Guarda el nuevo servicio en tu estado
            const newUserServices = [...userServices, createdService];
            setUserServices(newUserServices);

            // Guarda el nuevo servicio en tu JSON del lado del servidor
            const savedService = await userService.createService(createdService);
            console.log('Servicio creado:', savedService);

            // Reinicia el estado del servicio
            setService({ name: '', description: '', image: '', price: '' });

            // Muestra alerta de éxito
            Swal.fire({
                icon: 'success',
                title: '¡Éxito!',
                text: 'Se ha creado correctamente el servicio de usuario.',
            });

        } catch (error) {
            console.error('Error al crear el servicio:', error);
        }
    };
    return (
        <>
            <form onSubmit={handleSubmit}>
                <div {...getRootProps()}>
                    <input {...getInputProps()}
                    />
                    {isDragActive ? (<p> Drop the files here...</p>) : (<p>Drag 'n' drop some files here, or click to select files</p>)}
                </div>
                {service.image && <img src={URL.createObjectURL(service.image)} alt="" style={{ width: '300px', height: '300px' }} />}
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
                        imageUrl={createdService.image}
                    />
                ))}
            </div>
        </>
    );
}

export default ServiceForm;