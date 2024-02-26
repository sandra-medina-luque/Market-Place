import axios from "axios";

const apiClient = axios.create({
    baseURL: 'http://localhost:3000/',
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
});

export const UserService = {

    async getUser() {

        let response = await apiClient.get("/user");
        let User = response.data

        return User
    },


};

export const createService = async (service) => {
    const response = await axios.post(`${API_URL}/service`, service);
    return response.data;
};

export const getServices = async () => {
      const response = await axios.get(`${API_URL}/userService`);
      return response.data;
    };