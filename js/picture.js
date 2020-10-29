"use strict";

(() => {
  const pictureTemplate = document.querySelector(`#picture`);
  const pictureTemplateContent = pictureTemplate.content.querySelector(
      `.picture`
  );

  // Функция наполнения темплейта фотографии
  function getPhotoElement(photo) {
    const newPicture = pictureTemplateContent.cloneNode(true);
    const newPictureImg = newPicture.querySelector(`.picture__img`);
    newPictureImg.src = photo.url;
    newPicture.querySelector(`.picture__likes`).textContent = photo.likes;
    newPicture.querySelector(`.picture__comments`).textContent = photo.comments.length;
    return newPicture;
  }

  window.picture = {
    get: getPhotoElement,
  };
})();
