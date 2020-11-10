"use strict";

function shuffleArr(items) {
  let j;
  let temp;
  for (let i = items.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    temp = items[j];
    items[j] = items[i];
    items[i] = temp;
  }
  return items;
}

function showModalWindow(elem) {
  elem.classList.remove(`hidden`);
  document.body.classList.add(`modal-open`);
}

function hideModalWindow(elem) {
  elem.classList.add(`hidden`);
  document.body.classList.remove(`modal-open`);
}

function hideElement(elem) {
  elem.classList.add(`hidden`);
}

function showElement(elem) {
  elem.classList.remove(`hidden`);
}

window.util = {
  shuffle: shuffleArr,
  modal: {
    show: showModalWindow,
    hide: hideModalWindow,
  },
  element: {
    show: showElement,
    hide: hideElement,
  },
};
