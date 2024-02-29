import "./welcome.css";
import React from "react";
import Logobarrioconecta from "../../../public/img-gaby/Logo Inmobiliaria Minimalista Azul (1) 02.png";

const Welcome = () => {
  return (
    <div className="welcome-container">
      <div className="logo-container">
        <div className="logo">
          <img src='Logobarrioconecta' alt='Logo' />

          <img
            src="../../../public/icons nav&footer/logobarrio.svg"
            alt="Logo"
          />
        </div>
      </div>
      <div className="icons-container">
        <div className="icons-container">
          <div className="icon" style={{ transform: "rotate(60deg)" }}>
            <img src="./img/Peluqueria-violet.png" alt="Icono 1" />
          </div>
          <div className="icon" style={{ transform: "rotate(120deg)" }}>
            <img src="./img/Dentista-skyblue.png" alt="Icono 2" />
          </div>
          <div className="icon" style={{ transform: "rotate(180deg)" }}>
            <img src="./img/Panaderia-brown.png" alt="Icono 3" />
          </div>
          <div className="icon" style={{ transform: "rotate(240deg)" }}>
            <img src="./img/Veterinario-fuxia.png" alt="Icono 4" />
          </div>
          <div className="icon" style={{ transform: "rotate(300deg)" }}>
            <img src="./img/fontanero-orange.png" alt="Icono 5" />
          </div>
          <div className="icon" style={{ transform: "rotate(360deg)" }}>
            <img src="./img/Educacion-pink.png" alt="Icono 6" />
          </div>
        </div>
        <h1>Barrio</h1>

        {/* <Icon src='../../../public/img-welcome/Peluqueria-violet.png'/>
          <Icon src='../../../public/img-welcome/Veterinario-fuxia.png'/>
          <Icon src='../../../public/img-welcome/fontanero-orange.png'/>
          <Icon src='../../../public/img-welcome/Dentista-skyblue.png'/>
          <Icon src='../../../public/img-welcome/Educacion-pink.png'/>
          <Icon src='../../../public/img-welcome/Panaderia-brown.png'/> */}
      </div>
    </div>
  );
};

export default Welcome;
