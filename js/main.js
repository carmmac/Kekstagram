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
      img.addEventListener(`keydown`, (evt) => {
        if (evt.key === `Enter`) {
          window.bigPicture.show(imgs[i]);
        }
      });
      fragment.appendChild(img);
    }
    return pictures.appendChild(fragment);
  }

  function successLoadHandler(resp) {
    renderPhotos(resp);
  }

  function errorLoadHandler(errorMessage) {
    const node = document.createElement(`div`);
    node.style = `
      z-index: 100;
      position: fixed;
      left: 0;
      right: 0;
      margin: 0 auto;
      padding: 5px;
      text-align: center;
      background-color: #ff0000;
      font-size: 18px;
      font-weight: bold;`;
    node.textContent = errorMessage;
    document.body.insertAdjacentElement(`afterbegin`, node);
  }

  window.load.get(successLoadHandler, errorLoadHandler);

  // ЗАГРУЗКА ИЗОБРАЖЕНИЯ
  // Обработчик загрузки нового изображения
  photoUploader.addEventListener(`change`, changeUploadFormHandler);

  function changeUploadFormHandler() {
    window.form.open();
  }
})();
