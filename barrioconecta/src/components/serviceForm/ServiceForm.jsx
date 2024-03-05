import React, { useState, useEffect, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import '../serviceForm/serviceForm.css'
import { userService } from "../../../userService"
import UserServiceCard from "../userServiceCard/UserServiceCard";
import Swal from 'sweetalert2';
import teacher from '../../../src/assets/img/teacher.png'
import editar from '../../assets/img/editar.png'
import basura from '../../assets/img/basura.png'
import disquete from '../../assets/img/disquete.png'

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

    useEffect((deletedServiceId) => {
        const fetchServices = async () => {
            try {
                // Lógica para obtener los servicios solo si deletedServiceId cambia
                if (deletedServiceId !== null) {
                    const fetchedServices = await userService.getServices();
                    setUserServices(fetchedServices);
                }
            } catch (error) {
                console.error('Error al obtener servicios:', error);
            }
        };

        fetchServices();
    }, [deletedServiceId]);


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
            setTimeout(() => {
                window.location.reload();
            }, 2000);

        } catch (error) {
            console.error('Error al procesar el servicio:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            // Lógica para eliminar el servicio en el backend
            await userService.deleteService(id);

            // Actualizar el estado userServices excluyendo el servicio eliminado
            const updatedServices = userServices.filter((service) => service.id !== id);
            setUserServices(updatedServices);

            setDeletedServiceId(id);
            Swal.fire({
                icon: 'success',
                title: 'Eliminado',
                text: 'Eliminado correctamente',
            });
            
        } catch (error) {
            console.error('Error al eliminar el servicio:', error);
        }
    };


    const handleEdit = (id) => {
        const serviceToEdit = userServices.find((service) => service.id === id);
        setEditingService(serviceToEdit);
        setService({ ...serviceToEdit, image: serviceToEdit.image }); // Set the image as a string to indicate it's not a new image
        
    };


    



    return (
        <>
            <div className="cont">
                <form className="adminform">
                    <div className="contentform">
                        <h2 className="titleform">Perfil de Usuario</h2>
                        <div className="formoption">
                            <img className="imgusur" src={teacher} alt="imgusur" />
                            <div className="iconsusur">
                                <img src={editar} alt="editicon" />
                                <img src={disquete} alt="disqueteicon" />
                                <img src={basura} alt="basuraicon" />
                            </div>
                        </div>
                        <div className="formuser">
                            <div className="userdescription">
                                <label className="descripuser" >Descripción:</label>
                                <textarea className="descriptioninput" />
                            </div>
                            <div className="icondescrip">
                                <img src={editar} alt="editicon" />
                                <img src={disquete} alt="disqueteicon" />
                                <img src={basura} alt="basuraicon" />
                            </div>
                        </div>
                        <div className="tlfuser">
                            <label className="tlf"  >Teléfono:</label>
                            <div className="number">
                                <input className="tlfnumber" type="number" />
                                <img src={editar} alt="editicon" />
                                <img src={disquete} alt="disqueteicon" />
                            </div>

                        </div>
                    </div>

                </form >

                <form className="adminform" onSubmit={handleSubmit}>
                    <div className="contentform">
                        <h2 className="titleform">Agregar Productos</h2>
                        <div className="formoption" {...getRootProps()}>
                            <label className="fileform" htmlFor="name">Selecciona imagen:</label>
                            <div style={{ position: 'relative', width: '300px', height: '300px', border: '2px dashed #000', backgroundColor: '#fff' }}>
                                <input {...getInputProps({ style: { width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, opacity: 0 } })} />
                                {service.image && (
                                    <img
                                        src={typeof service.image === 'string' ? service.image : URL.createObjectURL(service.image)}
                                        alt=""
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                )}
                                {isDragActive ? (<p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>Drop the files here...</p>) : null}
                            </div>
                        </div>


                        <div className="formoption">
                            <label className="nameform" htmlFor="name">Nombre:</label>
                            <input className="inputFormotion"
                                type="text"
                                id="name"
                                value={service.name}
                                onChange={(e) => setService({ ...service, name: e.target.value })}
                            />
                        </div>
                        <div className="formoption">
                            <label className="descriptionform" htmlFor="description">Descripción:</label>
                            <textarea
                                id="description"
                                value={service.description}
                                onChange={(e) => setService({ ...service, description: e.target.value })}
                            />
                        </div>
                        <div className="formoption">
                            <label className="priceform" htmlFor="price">Precio (€/hora):</label>
                            <input
                                type="number"
                                id="price"
                                value={service.price}
                                onChange={(e) => setService({ ...service, price: e.target.value })}
                            />
                        </div>
                        <div className="formoption">
                            <label className="categoryform" htmlFor="category">Categoría:</label>
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
                        </div>
                        <div className="formoption">
                            <label className="stockform" htmlFor="stock">Stock: (Horas)</label>
                            <input
                                type="number"
                                id="stock"
                                value={service.stock}
                                onChange={(e) => setService({ ...service, stock: parseInt(e.target.value, 10) })}
                            />
                        </div>
                        <div className="formbutton">
                            <button className="adminbutton" type="submit">{editingService ? 'Guardar cambios' : 'Agregar'}</button>
                        </div>
                    </div>
                </form>
            </div >

            <div className="row">
                {userServices
                    .filter((service) => service.id !== deletedServiceId)
                    .map((createdService) => (
                        <UserServiceCard
                            key={createdService.id}
                            userService={createdService}
                            imageUrl={createdService.image}
                            modoEdicion={true} 
                            onDelete={() => handleDelete(createdService.id)}
                            onEdit={() => handleEdit(createdService.id)}
                            onDecrementStock={true}
                        />
                    ))}

            </div>

        </>
    );
}

export default ServiceForm;
