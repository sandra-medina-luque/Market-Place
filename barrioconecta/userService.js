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

    // async authenticateUser(username, password) {
       // try {
          //  const response = await apiClient.post("/user", {
           //     username,
           //     password,
           // });

            // Puedes devolver la respuesta completa o solo los datos necesarios
           // return response;
       // } catch (error) {
            // Manejar errores aquí
           // throw error;
       // }
   // },
};



