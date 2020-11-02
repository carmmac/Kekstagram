"use strict";
(() => {
  const photoUploader = document.querySelector(`.img-upload__input`);
  const imgFiltersForm = document.querySelector(`.img-filters__form`);
  let photos = [];
  window.load.get(successLoadHandler, errorLoadHandler);

  function successLoadHandler(resp) {
    photos = resp;
    window.renderPhotos(photos);
    window.filters.show();

    imgFiltersForm.addEventListener(`click`, (evt) => {
      const filteredImgs = getPhotos(evt);
      window.renderPhotos(filteredImgs);
    });
  }

  function getPhotos(evt) {
    window.debounce(window.filters.get(evt.target.id, photos));
  }

  function errorLoadHandler(errorMessage) {
    window.popup.show(errorMessage);
  }

  // ЗАГРУЗКА ИЗОБРАЖЕНИЯ
  // Обработчик загрузки нового изображения
  photoUploader.addEventListener(`change`, uploadFormChangeHandler);

  function uploadFormChangeHandler() {
    window.form.open();
  }
})();
