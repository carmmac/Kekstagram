import React from 'react';

const SocialHeader = () => {

  return (
    <div className="social__header">
      <img className="social__picture" src="img/avatar-1.svg" alt="Аватар автора фотографии" width="35" height="35"/>
      <p className="social__caption">Тестим новую камеру!</p>
      <p className="social__likes">Нравится <span className="likes-count">356</span></p>
    </div>
  );
};

export default SocialHeader;
