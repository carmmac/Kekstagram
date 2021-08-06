import {StatusValue} from "../const.js";

const popupDisplayDestination = document.querySelector(`main`);
const successMessageTemplate = document.querySelector(`#success`).content.querySelector(`.success`);
const newSuccessPopup = successMessageTemplate.cloneNode(true);
const popupSuccessCloseBtn = newSuccessPopup.querySelector(`.success__button`);
const errorMessageTemplate = document.querySelector(`#error`).content.querySelector(`.error`);
const newErrorPopup = errorMessageTemplate.cloneNode(true);
const popupErrorCloseBtn = newErrorPopup.querySelector(`.error__button`);

let activePopup;

const insertPopup = (popup) => {
  popupDisplayDestination.insertAdjacentElement(`afterbegin`, popup);
};

const closePopup = (popup) => {
  popup.remove();
  if (popup === newSuccessPopup) {
    popupSuccessCloseBtn.removeEventListener(`click`, successPopupCloseBtnPressHandler);
    document.removeEventListener(`keydown`, popupEscPressHandler);
    popup.removeEventListener(`click`, popupSuccessCloseHandler);
  } else {
    popupErrorCloseBtn.removeEventListener(`click`, errorPopupCloseBtnPressHandler);
    document.removeEventListener(`keydown`, popupEscPressHandler);
    popup.removeEventListener(`click`, popupErrorCloseHandler);
  }
};

const successPopupCloseBtnPressHandler = () => {
  closePopup(newSuccessPopup);
};

const errorPopupCloseBtnPressHandler = () => {
  closePopup(newErrorPopup);
};

const popupEscPressHandler = (evt) => {
  if (evt.key === `Escape`) {
    evt.preventDefault();
    closePopup(activePopup);
  }
};

const popupSuccessCloseHandler = (evt) => {
  if (!evt.target.closest(`.success__inner`)) {
    closePopup(newSuccessPopup);
  }
};

const popupErrorCloseHandler = (evt) => {
  if (!evt.target.closest(`.error__inner`)) {
    closePopup(newErrorPopup);
  }
};

const createErrorMessage = (errorMessage) => {
  const node = document.createElement(`div`);
  node.style = `
    z-index: 100;
    position: fixed;
    left: 0;
    right: 0;
    margin: 0 auto;
    padding: 5px;
    text-align: center;
    background-color: #ff0000;
    font-size: 18px;
    font-weight: bold;`;
  node.textContent = errorMessage;
  return node;
};

export const showPopup = (status) => {
  if (status === StatusValue.SUCCESS) {
    activePopup = newSuccessPopup;
    insertPopup(activePopup);
    popupSuccessCloseBtn.addEventListener(`click`, successPopupCloseBtnPressHandler);
    document.addEventListener(`keydown`, popupEscPressHandler);
    activePopup.addEventListener(`click`, popupSuccessCloseHandler);
  } else if (status === StatusValue.ERROR) {
    activePopup = newErrorPopup;
    insertPopup(activePopup);
    popupErrorCloseBtn.addEventListener(`click`, errorPopupCloseBtnPressHandler);
    document.addEventListener(`keydown`, popupEscPressHandler);
    activePopup.addEventListener(`click`, popupErrorCloseHandler);
  } else {
    insertPopup(createErrorMessage(status));
  }
  return activePopup;
};
