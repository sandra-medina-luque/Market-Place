import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Navbar2.css';

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);;
    const [isLoginPage, setIsLoginPage] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();


    const handleSearchSubmit = (event) => {
        event.preventDefault();

        if (searchQuery.toLowerCase() === 'cerrar sesión') {
            // Aquí puedes agregar la lógica específica para cerrar sesión
            // ...

            // Redirigir a la página de inicio
            navigate('/');
        }
    };

    useEffect(() => {
        // Actualizar el estado de isLoginPage cuando cambia la ubicación
        setIsLoginPage(location.pathname === '/login');
    }, [location.pathname]);

    return (
        <>
            <nav>
                <Link to="/">
                    <img className="link" id="logo" src="public/icons nav&footer/logobarrio.svg" alt="logo Barrio Conecta" />
                </Link>
    
                <h3><Link to="/" className={isLoginPage ? 'login closeactive' : 'closedesable'}>Cerrar Sesión</Link></h3> 
            </nav>
        </>
    );
}


export default Navbar;
