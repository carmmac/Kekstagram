import React from 'react';
import CommentsList from './social/comments/comments-list';
import SocialFooter from './social/footer/social-footer';
import SocialHeader from './social/header/social-header';

const BigPicture = () => {
  return (
    <div className="big-picture__preview">

      {/* <!-- Просмотр изображения --> */}
      <div className="big-picture__img">
        <img src="img/logo-background-3.jpg" alt="Девушка в купальнике" width="600" height="600"/>
      </div>

      {/* <!-- Информация об изображении. Подпись, комментарии, количество лайков --> */}
      <div className="big-picture__social  social">
        <SocialHeader/>

        {/* <!-- Комментарии к изображению --> */}
        <div className="social__comment-count">5 из <span className="comments-count">125</span> комментариев</div>

        <CommentsList/>

        {/* <!-- Кнопка для загрузки новой порции комментариев --> */}
        <button type="button" className="social__comments-loader  comments-loader">Загрузить еще</button>

        {/* <!-- Форма для отправки комментария --> */}
        <SocialFooter/>
      </div>

      {/* <!-- Кнопка для выхода из полноэкранного просмотра изображения --> */}
      <button type="reset" className="big-picture__cancel  cancel" id="picture-cancel">Закрыть</button>
    </div>
  );

};

export default BigPicture;
