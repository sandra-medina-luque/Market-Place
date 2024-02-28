import React from 'react';
import PropTypes from 'prop-types';
import '../userServiceCard/userServiceCard.css';

const UserServiceCard = ({ userService, imageUrl }) => {
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

UserServiceCard.propTypes = {
  userService: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
  }).isRequired,
  imageUrl: PropTypes.string.isRequired,
};

export default UserServiceCard;