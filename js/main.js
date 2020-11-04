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
    const debounceRenderPhotos = window.debounce((images) => window.renderPhotos(images));
    imgFiltersForm.addEventListener(`click`, (evt) => {
      window.filters.changeButton(evt.target);
      const filteredImgs = window.filters.get(photos);
      debounceRenderPhotos(filteredImgs);
    });
  }

  function errorLoadHandler(errorMessage) {
    window.popup(errorMessage);
  }

  photoUploader.addEventListener(`change`, uploadFormChangeHandler);

  function uploadFormChangeHandler() {
    window.form.open();
  }
})();
