import React from 'react';
import './footer.css';


function footer() {

    return (
        <>
            <section className='footer'>
                <p className='copy'>Barrio Conecta Copyright ©2024|Todos los derechos reservados</p>
                <p className='politica'>Aviso Legal - Política de Cookis - Política de Privacidad</p>

                <div className='redesfooter'>
                    <img className='instafooter' src="public/instagram.svg" alt="logo de instagram" />
                    <img className='facefooter' src="public/facebook (1).svg" alt="logo de facebook" />
                    <img className='twitterfooter' src="public/twitter-alt.svg" alt="logo de twitter" />
                </div>
            </section>
        </>
    )
}

export default footer