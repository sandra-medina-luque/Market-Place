import React, { useState, useEffect } from "react";
import "./log.css"
import { UserService } from "../../../userService";


function Log() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
  
    async function getData() {
      let user = await UserService.getUser();
      console.log("Usuario obtenido:", user);
    }
  
    useEffect(() => {
      getData();
    }, []);
  
    const handleLogin = async () => {
      try {
        // Llamada al servicio de autenticación
        const response = await UserService.authenticateUser(username, password);
  
        // Lógica para manejar la respuesta del servicio
        if (response.status === 200) {
          // Autenticación exitosa, puedes redirigir o manejar el resultado de otra manera
          console.log("Inicio de sesión exitoso");
        } else {
          // Autenticación fallida
          console.error("Error al iniciar sesión");
        }
      } catch (error) {
        // Manejar errores de la llamada al servicio
        console.error("Error al llamar al servicio de autenticación", error);
      }
    };
  
    return (
      <>
        <body className="logcont">
          <section className="logform">
            <div className="mb-3">
              <label htmlFor="formGroupInput" className="form-label">
                Usuario:
              </label>
              <input
                type="text"
                name="userName"
                className="form-control"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="formGroupInput" className="form-label">
                Contraseña:
              </label>
              <input
                type="password"
                name="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </section>
          <button onClick={handleLogin}>Conectar</button>
        </body>
      </>
    );
  }
  
  export default Log;