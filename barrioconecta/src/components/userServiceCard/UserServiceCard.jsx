import React from 'react';
import { useState } from 'react';
import '../userServiceCard/userServiceCard.css'
import basura from '../../assets/img/basura.png'
import editar from '../../assets/img/editar.png'
import reserva from '../../assets/img/Reserva.png'

const UserServiceCard = ({ userService, imageUrl, onDelete, onEdit, modoEdicion, onDecrementStock, onCardClick}) => {
  const [showDetails, setShowDetails] = useState(false);

  const handleCardClick = () => {
    setShowDetails(true);
    if (typeof onCardClick === 'function') {
      onCardClick(userService);
    }
  };

  

  return (
    <div className="col-md-3 mb-3" onClick={handleCardClick}>
      <div className="card h-100">
        <img src={imageUrl} className="card-img-top" alt={userService.name} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
        <div className="card-body">
          <h4 className="text-lg-start">{userService.name}</h4>
          <p className="text-center">{userService.description}</p>
          <p className="text-center">Precio: {userService.price} €/hora</p>
          <p className="text-center">{userService.category}</p>
          <p className="text-center">Stock: {userService.stock} horas</p>
        </div>
        {modoEdicion && (
          <div className='buttons'>
            <button className='buttons' onClick={(e) => { e.stopPropagation(); onDelete(userService.id); }}>
              <img src={basura} alt="basuralog" />
            </button>
            <button className='buttons' onClick={(e) => { e.stopPropagation(); onEdit(userService.id); }}>
              <img src={editar} alt="editlogo" />
            </button>
          </div>
        )}
        {!modoEdicion && (
          <div className="buttons">
            <button className='buttons' onClick={(e) => { e.stopPropagation(); typeof onDecrementStock === 'function' && onDecrementStock(); }}>
              <img src={reserva} alt="reserlog" />
            </button>
          </div>
        )}
      </div>

      
    </div>
  );
};

export default UserServiceCard;