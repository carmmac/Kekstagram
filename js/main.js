"use strict";
(() => {
  const photoUploader = document.querySelector(`.img-upload__input`);
  const imgFiltersForm = document.querySelector(`.img-filters__form`);

  window.load.get(successLoadHandler, errorLoadHandler);

  function successLoadHandler(resp) {
    window.renderPhotos(resp);
    window.filters.show();

    imgFiltersForm.addEventListener(`click`, (evt) => {
      const filteredImgs = window.filters.get(evt.target.id, resp);
      window.renderPhotos(filteredImgs);
    });
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
