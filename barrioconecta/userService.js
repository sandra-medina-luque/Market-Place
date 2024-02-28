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



};