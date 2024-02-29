import React, { useState, useEffect, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import '../serviceForm/serviceForm.css'
import { userService } from "../../../userService"
import UserServiceCard from "../userServiceCard/UserServiceCard";
import Swal from 'sweetalert2';




function ServiceForm() {
    const [userServices, setUserServices] = useState([]);
    const [deletedServiceId, setDeletedServiceId] = useState(null);

    const [service, setService] = useState({
        name: '',
        description: '',
        image: '',
        price: '',
        category: 'Básico'
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

    // Elimina el servicio con el ID especificado
    useEffect(() => {
        if (deletedServiceId) {
            const fetchDeleteService = async () => {
                try {
                    await userService.deleteService(deletedServiceId);
                    console.log('Servicio eliminado:', deletedServiceId);
                    const updatedServices = userServices.filter((service) => service.id !== deletedServiceId);
                    setUserServices(updatedServices);
                    setDeletedServiceId(null);
                    Swal.fire({
                        icon: 'success',
                        title: 'Éxito',
                        text: 'Se ha eliminado el servicio exitosamente.',
                        showConfirmButton: false,
                        timer: 1500
                    });
                } catch (error) {
                    console.error('Error eliminando servicio:', error);
                }
            };

            fetchDeleteService();
        }
    }, [deletedServiceId, userServices]);

    const cloudinaryApiUrl = 'https://api.cloudinary.com/v1_1/<dgtkeuzft>/image/upload';


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!service.name || !service.price) {
            Swal.fire({
                icon: 'error',
                title: 'Campos Requeridos',
                text: 'Por favor, completa los campos requeridos.',
            });
            return;
        }

        // Crea un nuevo objeto FormData
        const formData = new FormData();

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
                category: service.category,
            };

            // Guarda el nuevo servicio en tu estado
            const newUserServices = [...userServices, createdService];
            setUserServices(newUserServices);

            // Guarda el nuevo servicio en tu JSON del lado del servidor
            const savedService = await userService.createService(createdService);
            console.log('Servicio creado:', savedService);

            // Reinicia el estado del servicio
            setService({ name: '', description: '', image: '', price: '', category: '' });

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

    const handleDelete = (id) => {
        setDeletedServiceId(id);
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
                <label htmlFor="price">Precio (€/hora):</label>
                <input
                    type="number"
                    id="price"
                    value={service.price}
                    onChange={(e) => setService({ ...service, price: e.target.value })}
                />

                <label htmlFor="category">Categoría:</label>
                <select
                    id="category"
                    value={service.category}
                    onChange={(e) => setService({ ...service, category: e.target.value })}
                >
                    <option value="Basico">Básico</option>
                    <option value="Medio">Medio</option>
                    <option value="Avanzado">Avanzado</option>
                    <option value="Certificado">Certificado</option>
                </select>
                <button type="submit">Crear servicio</button>
            </form>
            <div className="row">
                {userServices.filter((service) => service.id !== deletedServiceId).map((createdService) => (
                    <UserServiceCard
                        key={createdService.id}
                        userService={createdService}
                        imageUrl={createdService.image}
                        onDelete={handleDelete}
                    />
                ))}
            </div>
        </>
    );
}

export default ServiceForm;