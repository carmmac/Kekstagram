"use strict";

(() => {
  const pictureTemplate = document.querySelector(`#picture`);
  const pictureTemplateContent = pictureTemplate.content.querySelector(
      `.picture`
  );

  // Функция наполнения темплейта фотографии
  function getPhotoElement(photo, idNum) {
    const newPicture = pictureTemplateContent.cloneNode(true);
    const newPictureImg = newPicture.querySelector(`.picture__img`);
    newPictureImg.src = photo.url;
    newPictureImg.dataset.id = `${idNum}`;
    newPicture.querySelector(`.picture__likes`).textContent = photo.likes;
    newPicture.querySelector(`.picture__comments`).textContent = photo.comments.length;
    return newPicture;
  }

  window.picture = {
    getPicture: getPhotoElement,
  };
})();
