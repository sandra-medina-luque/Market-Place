import React from 'react';
import './Footer.css';


function footer() {

    return (
        <>
            <section className='footer'>
    <div className='textfooter'>
        <p className='copy'>Barrio Conecta Copyright ©2024 | Todos los derechos reservados</p>
        <p className='politica'>Aviso Legal - Política de Cookies - Política de Privacidad</p>
    </div>
    <div className='redesfooter'>
        <a href="https://www.instagram.com" target="_blank">
            <img className='instafooter' src="../public/icons nav&footer/instagram.svg" alt="logo de instagram" />
        </a>
        <a href="https://www.facebook.com" target="_blank">
            <img className='facefooter' src="../public/icons nav&footer/facebook.svg" alt="logo de facebook" />
        </a>
        <a href="https://twitter.com" target="_blank">
            <img className='twitterfooter' src="../public/icons nav&footer/twitter.svg" alt="logo de twitter" />
        </a>
    </div>
</section>

        </>
    )
}

export default footer