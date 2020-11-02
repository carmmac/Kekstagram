"use strict";
(() => {
  const photoUploader = document.querySelector(`.img-upload__input`);
  const imgFiltersForm = document.querySelector(`.img-filters__form`);
  let photos = [];
  window.load.get(successLoadHandler, errorLoadHandler);

  function successLoadHandler(resp) {
    photos = resp;
    window.renderPhotos(resp);
    window.filters.show();

    imgFiltersForm.addEventListener(`click`, filterDebounceHandler);
  }

  function errorLoadHandler(errorMessage) {
    window.popup.show(errorMessage);
  }

  function filterChangeHandler(evt) {
    const filteredImgs = window.filters.get(evt.target.id, photos);
    window.renderPhotos(filteredImgs);
  }

  function filterDebounceHandler(evt) {
    window.debounce(filterChangeHandler(evt));
  }

  // ЗАГРУЗКА ИЗОБРАЖЕНИЯ
  // Обработчик загрузки нового изображения
  photoUploader.addEventListener(`change`, uploadFormChangeHandler);

  function uploadFormChangeHandler() {
    window.form.open();
  }
})();
