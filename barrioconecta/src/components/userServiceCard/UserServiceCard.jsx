import React from 'react';
import { userService } from '../../../userService';
import '../userServiceCard/userServiceCard.css'

const UserServiceCard = ({ userService, imageUrl, onDelete, onEdit}) => {
  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100">
        <img src={imageUrl} className="card-img-top" alt={userService.name} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
        <div className="card-body">
          <h4 className="card-title">{userService.name}</h4>
          <p className="card-text">{userService.description}</p>
          <p className="card-text">Precio: {userService.price} €/hora</p>
          <p className="card-text">{userService.category}</p>
          <p className="card-text">Stock: {userService.stock} horas</p>
        </div>
        <button onClick={() => onDelete(userService.id)}>
          Eliminar
        </button>
        <button onClick={() => onEdit(userService.id)}>Editar</button>
      </div>

    </div>
  );
};

export default UserServiceCard;