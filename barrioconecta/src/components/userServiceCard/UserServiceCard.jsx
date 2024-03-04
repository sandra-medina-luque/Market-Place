import React from 'react';
import { userService } from '../../../userService';
import '../userServiceCard/userServiceCard.css'
import basura from '../../assets/img/basura.png'
import editar from '../../assets/img/editar.png'
import reserva from '../../assets/img/Reserva.png'

const UserServiceCard = ({ userService, imageUrl, onDelete, onEdit, modoEdicion, onDecrementStock }) => {
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
        {modoEdicion && (
          <div className='buttons'>
            <button onClick={() => onDelete(userService.id)}>
              <img src={basura} alt="basuralog" />
            </button>
            <button onClick={() => onEdit(userService.id)}>
              <img src={editar} alt="editlogo" />
            </button>
          </div>
        )}
        {!modoEdicion && (
          <div className="buttons">
            <button onClick={typeof onDecrementStock === 'function' ? onDecrementStock : () => { }}>
              <img src={reserva} alt="reserlog" />
            </button>

          </div>
        )}
      </div>

    </div>
  );
};

export default UserServiceCard;