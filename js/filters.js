"use strict";

(() => {
  const imgFilters = document.querySelector(`.img-filters`);
  const RANDOW_IMG_NUM = 10;
  let currentActiveBtn;

  function showFilterPanel() {
    imgFilters.classList.remove(`img-filters--inactive`);
  }

  function getFilteredPhotos(arr) {
    const filter = currentActiveBtn.id;
    const defaultPhotos = arr.slice();
    switch (filter) {
      case `filter-random`:
        const randomPhotos = window.util.shuffle(defaultPhotos).slice(RANDOW_IMG_NUM * -1);
        return randomPhotos;
      case `filter-discussed`:
        const topComment = defaultPhotos.sort((a, b) => {
          return b.comments.length - a.comments.length;
        });
        return topComment;
      default:
        return arr;
    }
  }

  function changeActiveFilterBtn(button) {
    const activeFilteClassName = `img-filters__button--active`;
    currentActiveBtn = imgFilters.querySelector(`.${activeFilteClassName}`);
    currentActiveBtn.classList.remove(activeFilteClassName);
    button.classList.add(activeFilteClassName);
    currentActiveBtn = button;
  }

  window.filters = {
    show: showFilterPanel,
    get: getFilteredPhotos,
    changeButton: changeActiveFilterBtn,
  };
})();
