"use strict";
(() => {

  const pictures = document.querySelector(`.pictures`);

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

  function errorLoadHandler(msg) {
    window.showMessage(msg);
  }

  window.load(successLoadHandler, errorLoadHandler);

  // ЗАГРУЗКА ИЗОБРАЖЕНИЯ
  const photoUploadForm = document.querySelector(`.img-upload__form`);
  const photoUploader = photoUploadForm.querySelector(`.img-upload__input`);
  photoUploadForm.action = `https://21.javascript.pages.academy/kekstagram`;

  function changeUploadFormHandler() {
    window.form.open();
  }
  // Обработчик загрузки нового изображения
  photoUploader.addEventListener(`change`, changeUploadFormHandler);

  // Обработчик отправки изображения
  // ! Вынести работу обрабочика в функцию, далее удалять обработчик при закрытии окна редактирования
  // photoUploadForm.addEventListener(`submit`, function (evt) {
  // });
})();
