"use strict";
(() => {

  const pictures = document.querySelector(`.pictures`);
  const photoUploader = document.querySelector(`.img-upload__input`);

  function renderPhotos(imgs) {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < imgs.length; i++) {
      let img = window.picture.get(imgs[i], i);
      img.addEventListener(`click`, () => {
        window.bigPicture.show(imgs[i]);
      });
      fragment.appendChild(img);
    }
    return pictures.appendChild(fragment);
  }

  function successLoadHandler(resp) {
    renderPhotos(resp);
  }

  function errorLoadHandler(errorMessage) {
    window.popup.show(errorMessage);
  }

  window.load.get(successLoadHandler, errorLoadHandler);

  // ЗАГРУЗКА ИЗОБРАЖЕНИЯ
  // Обработчик загрузки нового изображения
  photoUploader.addEventListener(`change`, uploadFormChangeHandler);

  function uploadFormChangeHandler() {
    window.form.open();
  }
})();
