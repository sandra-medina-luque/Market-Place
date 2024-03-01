import React, { useState, useEffect, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import '../serviceForm/serviceForm.css'
import { userService } from "../../../userService"
import UserServiceCard from "../userServiceCard/UserServiceCard";
import Swal from 'sweetalert2';

function ServiceForm() {
    const [userServices, setUserServices] = useState([]);
    const [deletedServiceId, setDeletedServiceId] = useState(null);
    const [editingService, setEditingService] = useState(null);

    const [service, setService] = useState({
        name: '',
        description: '',
        image: '',
        price: '',
        category: 'Básico',
        stock: 0
    });

    const onDrop = useCallback((acceptedFiles) => {
        setService({ ...service, image: acceptedFiles[0] });
    }, [service]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

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

        if (!service.name || !service.price) {
            Swal.fire({
                icon: 'error',
                title: 'Campos Requeridos',
                text: 'Por favor, completa los campos requeridos.',
            });
            return;
        }

        const formData = new FormData();
        formData.append('file', service.image);
        formData.append('upload_preset', 'llrytk0i');
        formData.append('api_key', '218195564675455');
        formData.append('api_secret', 'VdCth0EexRFyU0RNgiCXKp7D2G4');

        try {
            let imageUrl = service.image; // Use existing image URL for edit, or upload a new one for create
            if (typeof service.image !== 'string') {
                const res = await fetch(cloudinaryApiUrl, {
                    method: 'POST',
                    body: formData,
                });
                const data = await res.json();
                imageUrl = data.secure_url;
            }

            const updatedService = {
                name: service.name,
                description: service.description,
                image: imageUrl,
                price: service.price,
                category: service.category,
                stock: service.stock,
            };

            if (editingService) {
                // Update existing service
                await userService.editService(editingService.id, updatedService);
                const updatedServices = userServices.map((service) =>
                    service.id === editingService.id ? updatedService : service
                );
                setUserServices(updatedServices);
                setEditingService(null);
            } else {
                // Create new service
                const newUserServices = [...userServices, updatedService];
                setUserServices(newUserServices);
                const savedService = await userService.createService(updatedService);
                console.log('Servicio creado:', savedService);
            }

            setService({ name: '', description: '', image: '', price: '', category: '', stock: 0 });

            Swal.fire({
                icon: 'success',
                title: '¡Éxito!',
                text: editingService ? 'Se ha actualizado correctamente el servicio.' : 'Se ha creado correctamente el servicio de usuario.',
            });

        } catch (error) {
            console.error('Error al procesar el servicio:', error);
        }
    };

    const handleDelete = (id) => {
        setDeletedServiceId(id);
    };

    const handleEdit = (id) => {
        const serviceToEdit = userServices.find((service) => service.id === id);
        setEditingService(serviceToEdit);
        setService({ ...serviceToEdit, image: serviceToEdit.image }); // Set the image as a string to indicate it's not a new image
    };

    const handleSubmitEdit = async (e) => {
        e.preventDefault();

        try {
            await userService.editService(editingService.id, editingService);
            console.log(`Servicio con ID ${editingService.id} actualizado exitosamente en el servidor.`);

            const updatedServices = userServices.map((service) =>
                service.id === editingService.id ? editingService : service
            );
            setUserServices(updatedServices);

            setEditingService(null);
        } catch (error) {
            console.error('Error actualizando servicio en el servidor:', error);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    {isDragActive ? (<p> Drop the files here...</p>) : (<p>Drag 'n' drop some files here, or click to select files</p>)}
                </div>
                {service.image && <img src={typeof service.image === 'string' ? service.image : URL.createObjectURL(service.image)} alt="" style={{ width: '300px', height: '300px' }} />}
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
                <label htmlFor="stock">Stock:</label>
                <input
                    type="number"
                    id="stock"
                    value={service.stock}
                    onChange={(e) => setService({ ...service, stock: parseInt(e.target.value, 10) })}
                />
                <button type="submit">{editingService ? 'Guardar cambios' : 'Crear servicio'}</button>
            </form>
            
            <div className="row">
                {userServices.filter((service) => service.id !== deletedServiceId).map((createdService) => (
                    <UserServiceCard
                        key={createdService.id}
                        userService={createdService}
                        imageUrl={createdService.image}
                        onDelete={handleDelete}
                        onEdit={handleEdit}
                    />
                ))}
            </div>
        </>
    );
}

export default ServiceForm;
