import React from 'react';

const SocialFooter = () => {

  return (
    <div className="social__footer">
      <img className="social__picture" src="img/avatar-6.svg" alt="Аватар комментатора фотографии" width="35" height="35"/>
      <input type="text" className="social__footer-text" placeholder="Ваш комментарий..."/>
      <button type="button" className="social__footer-btn" name="button">Отправить</button>
    </div>
  );
};

export default SocialFooter;
