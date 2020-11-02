"use strict";
(() => {
  const pictures = document.querySelector(`.pictures`);
  const photoUploader = document.querySelector(`.img-upload__input`);
  let photos = [];
  const imgFilters = document.querySelector(`.img-filters`);
  const imgFiltersForm = imgFilters.querySelector(`.img-filters__form`);
  const RANDOW_IMG_NUM = 10;

  window.load.get(successLoadHandler, errorLoadHandler);

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


  function showImgFilters() {
    imgFilters.classList.remove(`img-filters--inactive`);
    imgFiltersForm.addEventListener(`click`, filterChangeHandler);
  }

  function filterChangeHandler(evt) {
    window.debounce(applyFilter(evt.target.id));
  }

  function applyFilter(filter) {
    const defPhotos = photos.slice();
    const pics = pictures.querySelectorAll(`.picture`);
    for (let pic of pics) {
      pic.parentNode.removeChild(pic);
    }
    switch (filter) {
      case `filter-random`:
        const randomPhotos = window.util.shuffle(defPhotos).slice(RANDOW_IMG_NUM * -1);
        renderPhotos(randomPhotos);
        break;
      case `filter-discussed`:
        const topComment = defPhotos.sort((a, b) => {
          return b.comments.length - a.comments.length;
        });
        renderPhotos(topComment);
        break;
      default:
        renderPhotos(photos);
    }
  }


  // ЗАГРУЗКА ИЗОБРАЖЕНИЯ
  // Обработчик загрузки нового изображения
  photoUploader.addEventListener(`change`, uploadFormChangeHandler);

  function uploadFormChangeHandler() {
    window.form.open();
  }
})();
