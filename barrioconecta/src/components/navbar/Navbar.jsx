import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';


function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState(''); //para el buscador

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const handleSearchChange = (event) => { //para el buscador
        setSearchQuery(event.target.value);
    };

    const handleSearchSubmit = (event) => {
        // Puedes realizar alguna acción cuando se envía el formulario de búsqueda
        // Por ejemplo, redirigir a una página de resultados de búsqueda
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

                    <NavLink to="/desplegable">
                        <div className="servicios link">
                            <h3>Servicios</h3>
                        </div>
                    </NavLink>

                    <NavLink to="/login">
                        <div className="login link">
                            <h3>Iniciar Sesión</h3>
                        </div>
                    </NavLink>

                    

                </div>
            </nav>
        </>
    )
}

export default Navbar