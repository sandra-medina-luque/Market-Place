import React, { useState } from "react";
import '../serviceForm/serviceForm.css'
import { userService } from "../../../userService";
import Swal from 'sweetalert2';



function ServiceForm() {

    const [userServices, setUserServices] = ([]);

    const [service, setService] = useState({
        name: '',
        description: '',
        image: null,
        price: '',
    });


    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/*',
        onDrop: (acceptedFiles) => {
            const file = acceptedFiles[0];
            const uploadPromise = cloudinary.uploader.upload(file);

            uploadPromise.then((result) => {
                setService({ ...service, image: result.secure_url });
            });
        },
    });

    useEffect(() => {
        const fetchServices = async () => {
            const fetchedServices = await getServices();
            setUserServices(fetchedServices);
        };

        fetchServices();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const createdService = await userService(service);
        console.log('Servicio creado:', createdService);

        // Reiniciar el formulario
        setService({ name: '', description: '', image: null, price: '' });

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
                    <input {...getInputProps()} />
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
};
export default ServiceForm;