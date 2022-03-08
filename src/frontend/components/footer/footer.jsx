import React from 'react';

const Footer = () => {
  return (
    <footer className="page-footer  container">
      <div className="page-footer__wrapper">
        <div className="page-footer__copyright  copyright">
          <a className="copyright__link  copyright__link--image" href="https://htmlacademy.ru/intensive/javascript">
            <img src="img/htmla-logo.svg" width="130" height="45" alt="HTML Academy"/>
          </a>
          <p>Сделано в <a className="copyright__link  copyright__link--text" href="https://htmlacademy.ru/intensive/javascript">HTML Academy</a></p>
        </div>
        <ul className="page-footer__contacts  contacts">
          <li><a href="https://twitter.com/htmlacademy_ru" className="contacts__link  contacts__link--twitter">Twitter</a></li>
          <li><a href="https://www.instagram.com/htmlacademy/" className="contacts__link  contacts__link--instagram">Instagtam</a></li>
          <li><a href="https://www.facebook.com/htmlacademy" className="contacts__link  contacts__link--facebook">Facebook</a></li>
          <li><a href="https://vk.com/htmlacademy" className="contacts__link  contacts__link--vk">VK</a></li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
