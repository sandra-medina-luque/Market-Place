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
       let Service =response.data;

       return Service;
    },

    async deleteService(serviceId) {
        try {
            const response = await apiClient.delete(`/service/${serviceId}`);
            return response.data;
        } catch (error) {
            throw new Error(`Error deleting service with id ${serviceId}: ${error.message}`);
        }
    },

    async editService(serviceId, updatedServiceData) {
        try {
            const response = await apiClient.put(`/service/${serviceId}`, updatedServiceData);
            return response.data;
        } catch (error) {
            throw new Error(`Error editing service with id ${serviceId}: ${error.message}`);
        }
    }
    

};



