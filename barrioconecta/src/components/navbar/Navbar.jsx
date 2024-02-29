import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [desplegableVisible, setDesplegableVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const toggleDesplegable = () => {
        setDesplegableVisible(!desplegableVisible);
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSearchSubmit = (event) => {
        console.log('Buscar:', searchQuery);
        event.preventDefault();
    };

    return (
        <>
            <nav className={`navBar ${menuOpen ? 'menuOpen' : ''}`}>
                <div className="burger" onClick={toggleMenu}>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                </div>

                    <NavLink to="/home">
                        <img className="link" id="logo" src="public/icons nav&footer/logobarrio.svg" alt="logo Barrio Conecta" />
                    </NavLink>

                    <div className="overlay" onClick={toggleMenu}></div>

                    <div className="searchContainer">
                        <form onSubmit={handleSearchSubmit}>
                            <input
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
                                <NavLink to="/servicio1">Inglés</NavLink>
                                <NavLink to="/servicio2">Física</NavLink>
                                <NavLink to="/servicio3">Matemáticas</NavLink>
                            </div>
                        )}
                    </div>

                    <NavLink to="/login">
                        <div className="login link">
                            <h3>Iniciar Sesión</h3>
                        </div>
                    </NavLink>
                </div>
            </nav>
        </>
    );
}

export default Navbar;
