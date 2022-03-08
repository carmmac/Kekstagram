import React from 'react';
import PropTypes from 'prop-types';

const PictureCard = ({photo}) => {

  return (
    <div className="picture">
      <img className="picture__img" src={`../photos/${photo.url}`} width="182" height="182" alt="Случайная фотография"/>
      <p className="picture__info">
        <span className="picture__comments">{photo.comments.length}</span>
        <span className="picture__likes">{photo.likes}</span>
      </p>
    </div>
  );
};

PictureCard.propTypes = {
  photo: PropTypes.object.isRequired,
};

export default PictureCard;
