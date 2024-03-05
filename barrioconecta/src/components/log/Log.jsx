import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { userService} from '../../../userService';
import Swal from 'sweetalert2';
import "./log.css";


function Log() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [userData, setUserData] = useState(null);
  const navigate=useNavigate();

  async function getData() {
    let user = await userService.getUser();
    console.log("Usuario obtenido:", user);
    setUserData(userData);
  }

  useEffect(() => {
    getData();
  }, []);

  const handleLogin = async () => {
    try {
      const user = await userService.getUser();
  
      if (user && user.length > 0) {
        const userFound = user.find(u => u.username === username && u.password === password);
  
        if (userFound) {
       
          Swal.fire({
            icon: 'success',
            title: 'Inicio de sesión exitoso',
            showConfirmButton: false,
            timer: 1500 
          });
  
          
          navigate("/dashboard");
        } else {
      
          Swal.fire({
            icon: 'error',
            title: 'Error al iniciar sesión',
            text: 'Por favor, verifica tus credenciales e intenta nuevamente.'
          });
        }
      } else {
        
        console.error("Error al obtener datos del usuario");
      }
    } catch (error) {
      
      console.error("Error al obtener datos del usuario:", error);
    }
  };
  

  return (
    <>

      <div className="logcont">
        <section className="logform">
          <div className="mb-3">
          <label htmlFor="name" className="form-label">
              Usuario:
            </label>
            <input
              type="text"
              name="userName"
              id="name"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-4">
          <label htmlFor="password" className="form-label">
              Contraseña:
            </label>
            <input
              id="password"
              type="password"
              name="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </section>
        
          <button className="logbutton" onClick={handleLogin}>Conectar</button>
        
      </div>
    </>
  );
}

export default Log;