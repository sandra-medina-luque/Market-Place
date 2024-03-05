import React from 'react'
import Error404 from '../components/error404/Error404'
import Navbar from '../components/navbar/Navbar'
import Footer from '../components/footer/Footer'



const Error = () => {
    return (
        <>
            <Navbar />
            <Error404 />
            <Footer />
        </>
    );
}

export default Error;