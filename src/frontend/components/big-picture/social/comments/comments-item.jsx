import React from 'react';

const CommentsItem = () => {

  return (
    <li className="social__comment">
      <img className="social__picture" src="img/avatar-4.svg" alt="Аватар комментатора фотографии" width="35" height="35"/>
      <p className="social__text">Мега фото! Просто обалдеть. Как вам так удалось?</p>
    </li>
  );
};

export default CommentsItem;
