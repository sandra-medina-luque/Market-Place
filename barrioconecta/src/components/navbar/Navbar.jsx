import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';


function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [desplegableVisible, setDesplegableVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoginPage, setIsLoginPage] = useState(false);
    

    const toggleMenu = () => {
        setMenuOpen(!menuOpen); "login link"
    };

    const toggleDesplegable = () => {
        setDesplegableVisible(!desplegableVisible);
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();

        if (searchQuery.toLowerCase() === 'cerrar sesión') {
            // Aquí puedes agregar la lógica específica para cerrar sesión
            // ...

            // Redirigir a la página de inicio
            navigate('/home');
        }
    };

    useEffect(() => {
        // Actualizar el estado de isLoginPage cuando cambia la ubicación
        setIsLoginPage(location.pathname === '/login');
    }, [location.pathname]);

    return (
        <>
            <nav className={`navBar ${menuOpen ? 'menuOpen' : ''}`}>
                <div className="burger" onClick={toggleMenu}>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                </div>


                <Link to="/home">
                    <img className="link" id="logo" src="public/icons nav&footer/logobarrio.svg" alt="logo Barrio Conecta" />
                </Link>

                <div className="overlay" onClick={toggleMenu}></div>
  
                <div className="searchContainer">
                    <form onSubmit={handleSearchSubmit}>
                        <input className='inputSearch'
                            type="text"
                            placeholder="&#128269; Buscar"
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                    </form>
                </div>

                <div className="iconHolder">
                    <div className="servicios link" onClick={toggleDesplegable}>
                        <h3>Servicios</h3>
                        <img className="arrow-icon" src="public/icons nav&footer/arrow-icon.svg" alt="Icono flecha hacia abajo" />
                        {desplegableVisible && (
                            <div className="dropdownContent">
                                <Link to="/servicio1">Inglés</Link>
                                <Link to="/error404">Física</Link>
                                <Link to="/servicio3">Matemáticas</Link>
                            </div>
                        )}
                    </div>

                    <h3 id='loginButton'>{isLoginPage ? <Link to="/home" className={isLoginPage ? 'login closeactive' : 'closedesable'}>Cerrar Sesión</Link> : <Link to="/login" className={isLoginPage ? 'login closeactive' : 'closedesable'}>Iniciar Sesión</Link>}</h3>

               

                </div>
            </nav>
        </>
    );
}


export default Navbar;
