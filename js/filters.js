"use strict";

(() => {
  const imgFilters = document.querySelector(`.img-filters`);
  const RANDOW_IMG_NUM = 10;

  function showFilterPanel() {
    imgFilters.classList.remove(`img-filters--inactive`);
  }

  function getFilteredPhotos(filter, arr) {
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

  window.filters = {
    show: showFilterPanel,
    get: getFilteredPhotos,
  };
})();
