"use strict";
(() => {

  const pictures = document.querySelector(`.pictures`);
  const photoUploader = document.querySelector(`.img-upload__input`);
  let photos = [];
  const imgFilters = document.querySelector(`.img-filters`);
  const imgFiltersForm = imgFilters.querySelector(`.img-filters__form`);
  const RANDOW_IMG_NUM = 10;

  function showImgFilters() {
    imgFilters.classList.remove(`img-filters--inactive`);
    imgFiltersForm.addEventListener(`click`, filterChangeHandler);
  }

  function filterChangeHandler(evt) {
    if (evt.target.id === `filter-random`) {
      applyFilter();
    }
  }

  function applyFilter() {
    const pics = pictures.querySelectorAll(`.picture`);
    for (let i = 0; i < pics.length; i++) {
      let pic = pictures.querySelector(`.picture`);
      pic.parentNode.removeChild(pic);
    }
    renderPhotos(window.util.shuffle(photos).slice(RANDOW_IMG_NUM * -1));
  }

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
    photos = resp;
    renderPhotos(photos);
    showImgFilters();
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
