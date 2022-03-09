import React from 'react';
import PropTypes from 'prop-types';

const SocialHeader = ({photo}) => {
  const {author, description, likes} = photo;

  return (
    <div className="social__header">
      <img className="social__picture" src={`../img/${author.avatar}`} alt={`${author.name}`} width="35" height="35"/>
      <p className="social__caption">{description}</p>
      <p className="social__likes">Нравится <span className="likes-count">{likes}</span></p>
    </div>
  );
};

SocialHeader.propTypes = {
  photo: PropTypes.object.isRequired
};

export default SocialHeader;
