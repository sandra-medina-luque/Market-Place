import React from 'react';
import './footer.css';


function footer() {

    return (
        <>
            <section className='footer'>
                <div className='textfooter'>
                <p className='copy'>Barrio Conecta Copyright ©2024 | Todos los derechos reservados</p>
                <p className='politica'>Aviso Legal - Política de Cookis - Política de Privacidad</p>
                </div>
                <div className='redesfooter'>
                    <img className='instafooter' src="../public/icons nav&footer/instagram.svg" alt="logo de instagram" />
                    <img className='facefooter' src="../public/icons nav&footer/facebook.svg" />
                    <img className='twitterfooter' src="../public/icons nav&footer/twitter.svg" alt="logo de twitter" />
                </div>
            </section>
        </>
    )
}

export default footer