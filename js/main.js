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
      changeActiveFilterBtn(evt.target);
      const filteredImgs = window.filters.get(evt.target.id, photos);
      debounceRenderPhotos(filteredImgs);
    });
  }

  function changeActiveFilterBtn(button) {
    const activeFilteClassName = `img-filters__button--active`;
    const currentActiveBtn = imgFiltersForm.querySelector(`.${activeFilteClassName}`);
    currentActiveBtn.classList.remove(activeFilteClassName);
    button.classList.add(activeFilteClassName);
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
