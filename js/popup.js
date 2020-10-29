"use strict";

(() => {
  const popupDisplayDestination = document.querySelector(`main`);

  const successMessageTemplate = document.querySelector(`#success`);
  const successMessageTemplateContent = successMessageTemplate.content.querySelector(`.success`);
  const newSuccessPopup = successMessageTemplateContent.cloneNode(true);
  const popupSuccessCloseBtn = newSuccessPopup.querySelector(`.success__button`);

  const errorMessageTemplate = document.querySelector(`#error`);
  const errorMessageTemplateContent = errorMessageTemplate.content.querySelector(`.error`);
  const newErrorPopup = errorMessageTemplateContent.cloneNode(true);
  const popupErrorCloseBtn = newErrorPopup.querySelector(`.error__button`);

  function showPopup(status) {
    if (status === `success`) {
      insertPopup(popupDisplayDestination, newSuccessPopup);
      popupSuccessCloseBtn.addEventListener(`click`, onSuccessPopupCloseBtnPress);
      document.addEventListener(`keydown`, onSuccessPopupEscPress);
      newSuccessPopup.addEventListener(`click`, popupSuccessCloseHandler);
    } else if (status === `error`) {
      insertPopup(popupDisplayDestination, newErrorPopup);
      popupErrorCloseBtn.addEventListener(`click`, onErrorPopupCloseBtnPress);
      document.addEventListener(`keydown`, onErrorPopupEscPress);
      newErrorPopup.addEventListener(`click`, popupErrorCloseHandler);
    } else {
      insertPopup(document.body, createErrorMesasge(status));
    }
  }

  function insertPopup(dest, popup) {
    dest.insertAdjacentElement(`afterbegin`, popup);
  }

  function closePopup(popup) {
    popup.remove();
    if (popup === newSuccessPopup) {
      popupSuccessCloseBtn.removeEventListener(`click`, onSuccessPopupCloseBtnPress);
      document.removeEventListener(`keydown`, onSuccessPopupEscPress);
      popup.removeEventListener(`click`, popupSuccessCloseHandler);
    } else {
      popupErrorCloseBtn.removeEventListener(`click`, onErrorPopupCloseBtnPress);
      document.removeEventListener(`keydown`, onErrorPopupEscPress);
      popup.removeEventListener(`click`, popupErrorCloseHandler);
    }
  }

  function onSuccessPopupCloseBtnPress() {
    closePopup(newSuccessPopup);
  }

  function onErrorPopupCloseBtnPress() {
    closePopup(newErrorPopup);
  }

  // function onPopupEscPress(evt) {
  //   if (evt.key === `Escape`) {
  //     evt.preventDefault();
  //     if (popupDisplayDestination.contains(`.newSuccessPopup`)) {
  //       closePopup(newSuccessPopup);
  //     } else if (popupDisplayDestination.contains(`.newErrorPopup`)) {
  //       closePopup(newErrorPopup);
  //     }
  //   }
  // }

  function onSuccessPopupEscPress(evt) {
    if (evt.key === `Escape`) {
      evt.preventDefault();
      closePopup(newSuccessPopup);
    }
  }

  function onErrorPopupEscPress(evt) {
    if (evt.key === `Escape`) {
      evt.preventDefault();
      closePopup(newErrorPopup);
    }
  }

  function popupSuccessCloseHandler(evt) {
    if (!evt.target.closest(`.success__inner`)) {
      closePopup(newSuccessPopup);
    }
  }

  function popupErrorCloseHandler(evt) {
    if (!evt.target.closest(`.error__inner`)) {
      closePopup(newErrorPopup);
    }
  }

  function createErrorMesasge(errorMessage) {
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
  }

  window.popup = {
    show: showPopup,
  };
})();
