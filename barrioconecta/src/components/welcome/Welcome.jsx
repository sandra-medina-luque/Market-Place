import React from 'react';
import { useEffect } from 'react';
import Logo from '../../../public/img-welcome/logowelc.png';                    /*modifique la ruta de */
import { Link } from 'react-router-dom';
import './welcome.css';

function Welcome() {

  useEffect(() => {
    const iconsContainer = document.querySelector(".icons-container");
    const icons = document.querySelectorAll(".icon");
    icons.forEach((icon, index) => {
      const angle = (360 / icons.length) * index;
      const radians = (angle * Math.PI) / 180;
      const radius = 165;
      const x = radius * Math.cos(radians);
      const y = radius * Math.sin(radians);
      icon.style.transform = `translate(${x}px, ${y}px)`;
    });
  }, []);
  return (
    <>
      <div className="welcome-container">
        <div className="logo-container">
          <div className="logo">
            <img src={Logo} alt="Logo" />
          </div>
        </div>
        <div className="icons-container">
          <div className="icon" style={{ transform: 'rotate(60deg)' }}>
            <img src="../img-welcome/Peluqueria-violet.png" alt="Icono 1" />
          </div>
          <div className="icon" style={{ transform: 'rotate(120deg)' }}>
            <img src="../img-welcome/Dentista-skyblue.png" alt="Icono 2" />
          </div>
          <div className="icon" style={{ transform: 'rotate(180deg)' }}>
            <img src="../img-welcome/Panaderia-brown.png" alt="Panaderia-brown" />
          </div>
          <div className="icon" style={{ transform: 'rotate(240deg)' }}>
            <img src="../img-welcome/Veterinario-fuxia.png" alt="Veterinario-fuxia" />
          </div>
          <div className="icon" style={{ transform: 'rotate(300deg)' }}>
            <img src="../img-welcome/fontanero-orange.png" alt="fontanero-orange" />
          </div>
          <div className="icon" style={{ transform: 'rotate(360deg)' }}>
            {/* <img src="../img-welcome/Educacion-pink.png" alt="Icono 6" /> */}
            <Link to="/home"> <img src="../img-welcome/Educacion-pink.png" alt="Icono 6" /> </Link>
          </div>
        </div>
      </div>
    </>
  );
}
export default Welcome;