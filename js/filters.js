"use strict";

const RANDOM_IMG_NUM = 10;
const imgFilters = document.querySelector(`.img-filters`);
const imgFiltersForm = imgFilters.querySelector(`.img-filters__form`);
const FilterName = {
  RANDOM: `filter-random`,
  DISCUSSED: `filter-discussed`,
};
let currentActiveBtn;

const getFilteredPhotos = (photos) => {
  const filter = currentActiveBtn.id;
  const defaultPhotos = photos.slice();
  switch (filter) {
    case FilterName.RANDOM:
      const randomPhotos = window.util.shuffle(defaultPhotos).slice(RANDOM_IMG_NUM * -1);
      return randomPhotos;
    case FilterName.DISCUSSED:
      const topComment = defaultPhotos.sort((a, b) => {
        return b.comments.length - a.comments.length;
      });
      return topComment;
    default:
      return photos;
  }
};

const setFiltersChangeHandler = (cb, photos) => {
  imgFiltersForm.addEventListener(`click`, (evt) => {
    changeActiveFilterBtn(evt.target);
    const filteredImgs = getFilteredPhotos(photos);
    cb(filteredImgs);
  });
};

const showFilterPanel = () => {
  imgFilters.classList.remove(`img-filters--inactive`);
};

const changeActiveFilterBtn = (button) => {
  const activeFilteClassName = `img-filters__button--active`;
  currentActiveBtn = imgFilters.querySelector(`.${activeFilteClassName}`);
  currentActiveBtn.classList.remove(activeFilteClassName);
  button.classList.add(activeFilteClassName);
  currentActiveBtn = button;
};

window.filters = {
  setHandler: setFiltersChangeHandler,
  show: showFilterPanel,
};
