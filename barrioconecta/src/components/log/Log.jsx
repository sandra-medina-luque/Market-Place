import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { UserService } from "../../../userService";
import "./log.css"


function Log() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [userData, setUserData] = useState(null);

  async function getData() {
    let user = await UserService.getUser();
    console.log("Usuario obtenido:", user);
    setUserData(userData);
  }

  useEffect(() => {
    getData();
  }, []);

  const handleLogin = async () => {
    try {
      const user = await UserService.getUser();
  
      if (user && user.length > 0) {
        const userFound = user.find(u => u.username === username && u.password === password);
  
        if (userFound) {
          // Autenticación exitosa
          Swal.fire({
            icon: 'success',
            title: 'Inicio de sesión exitoso',
            showConfirmButton: false,
            timer: 1500 // Mostrar durante 1.5 segundos antes de cerrarse automáticamente
          });

        } else {
          // Autenticación fallida
          Swal.fire({
            icon: 'error',
            title: 'Error al iniciar sesión',
            text: 'Por favor, verifica tus credenciales e intenta nuevamente.'
          });
        }
      } else {
        // Manejar el caso en que no se obtuvieron datos del usuario
        console.error("Error al obtener datos del usuario");
      }
    } catch (error) {
      // Manejar errores de la llamada al servicio
      console.error("Error al obtener datos del usuario:", error);
    }
  };

  return (
    <>

      <div className="logcont">
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
        <Link to="/dashboard">
          <button className="logbutton" onClick={handleLogin}>Conectar</button>
        </Link>
      </div>
    </>
  );
}

export default Log;