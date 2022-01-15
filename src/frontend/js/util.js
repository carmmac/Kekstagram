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
  showModalWindow,
  hideModalWindow,
  showElement,
  hideElement,
};
