import React from 'react';
import { UserService } from '../../../userService';

const UserServiceCard = () => {
  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100">
        <img src={userService.img} className="card-img-top" alt={userService.userServicename} />
        <div className="card-body">
          <h4 className="card-title">{userService.userServicename}</h4>
          <p className="card-text">{userService.description}</p>
          <p className="card-text">Precio: {userService.price}</p>
        </div>
      </div>
    </div>
  );
};

export default UserServiceCard;