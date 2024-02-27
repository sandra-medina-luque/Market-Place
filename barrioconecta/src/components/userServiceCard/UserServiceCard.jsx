import React from 'react';
import { userService } from '../../../userService';



const UserServiceCard = ({ userService }) => {
    let imageUrl;

    try {
      imageUrl = cld.image(userService.image).toURL();
    } catch (error) {
      console.error('Error generando la URL de la imagen:', error);
      // Puedes asignar una URL de imagen predeterminada o realizar otra acción según tus necesidades
    }
  
    return (
      <div className="col-md-4 mb-4">
        <div className="card h-100">
          <img src={imageUrl} className="card-img-top" alt={userService.name} />
          <div className="card-body">
            <h4 className="card-title">{userService.name}</h4>
            <p className="card-text">{userService.description}</p>
            <p className="card-text">Precio: {userService.price}</p>
          </div>
        </div>
      </div>
    );
  };
  
  export default UserServiceCard;