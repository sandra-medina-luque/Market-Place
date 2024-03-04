import React from 'react'
import Navbar2 from '../components/navbar2/Navbar2'
import Footer from '../components/footer/Footer';
import ServiceForm from '../components/serviceForm/ServiceForm';


const Dashboard = () => {
    return (
        <>
            <Navbar2 />
            <ServiceForm/>
            <Footer />
        </>
    );
}

export default Dashboard;