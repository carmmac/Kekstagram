import {
  BLUR_EFFECT_MAX_LVL,
  BRIGHTNESS_EFFECT_MAX_LVL,
  RANDOM_IMG_NUM,
  Effect,
  Filter,
} from "./_const";

const shuffleArr = (items) => {
  let j;
  let temp;
  for (let i = items.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    temp = items[j];
    items[j] = items[i];
    items[i] = temp;
  }
  return items;
};

const getFilteredPhotos = (photos, filter) => {
  const defaultPhotos = photos.slice();

  switch (filter) {
    case Filter.DISCUSSED.name:
      return defaultPhotos.sort(
          (a, b) => b.comments.length - a.comments.length
      );

    case Filter.RANDOM.name:
      return shuffleArr(defaultPhotos).slice(RANDOM_IMG_NUM * -1);

    default:
      return photos;
  }
};

const getStyle = (effect, value) => {
  let result = ``;

  switch (effect) {
    case Effect.NONE:
      result = ``;
      break;

    case Effect.PHOBOS:
      result = `${effect.style}(${
        (value * BLUR_EFFECT_MAX_LVL) / 100
      }px)`;
      break;

    case Effect.HEAT:
      result = `${effect.style}(${
        (value * BRIGHTNESS_EFFECT_MAX_LVL) / 100
      })`;
      break;

    case Effect.MARVIN:
      result = `${effect.style}(${value}%)`;
      break;

    default:
      result = `${effect.style}(${value / 100})`;
  }
  return result;
};

const getOffset = (el) => {
  const rect = el.getBoundingClientRect();
  const scrollLeft =
    window.pageXOffset || document.documentElement.scrollLeft;

  return {
    right: Math.floor(rect.right + scrollLeft),
    left: Math.floor(rect.left + scrollLeft)
  };
};


const showModalWindow = (elem) => {
  elem.classList.remove(`hidden`);
  document.body.classList.add(`modal-open`);
};

const hideModalWindow = (elem) => {
  elem.classList.add(`hidden`);
  document.body.classList.remove(`modal-open`);
};

const hideElement = (elem) => {
  elem.classList.add(`hidden`);
};

const showElement = (elem) => {
  elem.classList.remove(`hidden`);
};

export {
  shuffleArr,
  getFilteredPhotos,
  getStyle,
  getOffset,

  showModalWindow,
  hideModalWindow,
  showElement,
  hideElement,
};
