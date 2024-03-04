import axios from "axios";

const apiClient = axios.create({
    baseURL: 'http://localhost:3000/',
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
});

export const userService = {

    async getUser() {

        let response = await apiClient.get("/user");
        let User = response.data

        return User
    },


    async createService(newServiceData) {
        let response = await apiClient.post("/service", newServiceData);
        let createdService = response.data;

        return createdService;
    },

    async getServices() {

        let response = await apiClient.get("/service");
        let Service = response.data;

        return Service;
    },

    async deleteService(serviceId) {
        try {
            await apiClient.delete(`/service/${serviceId}`);
            console.log(`Servicio con ID ${serviceId} eliminado exitosamente.`);
        } catch (error) {
            console.error('Error eliminando servicio:', error);
            throw error;
        }
    },

    async editService(serviceId, updatedServiceData) {
        try {
            const response = await apiClient.put(`/service/${serviceId}`, updatedServiceData);
            console.log(`Servicio con ID ${serviceId} actualizado exitosamente. Respuesta:`, response.data);
            return response.data;
        } catch (error) {
            if (error.response && error.response.status === 404) {
                console.error(`Error actualizando servicio. El servicio con ID ${serviceId} no se encontró.`);
            } else {
                console.error('Error actualizando servicio:', error);
            }
            throw error;
        }
    },

    
    


};