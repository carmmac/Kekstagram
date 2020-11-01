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
  let activePopup;

  function showPopup(status) {
    if (status === `success`) {
      activePopup = newSuccessPopup;
      insertPopup(activePopup);
      popupSuccessCloseBtn.addEventListener(`click`, successPopupCloseBtnPressHandler);
      document.addEventListener(`keydown`, popupEscPressHandler);
      activePopup.addEventListener(`click`, popupSuccessCloseHandler);
    } else if (status === `error`) {
      activePopup = newErrorPopup;
      insertPopup(activePopup);
      popupErrorCloseBtn.addEventListener(`click`, errorPopupCloseBtnPressHandler);
      document.addEventListener(`keydown`, popupEscPressHandler);
      activePopup.addEventListener(`click`, popupErrorCloseHandler);
    } else {
      insertPopup(createErrorMesasge(status));
    }
    return activePopup;
  }

  function insertPopup(popup) {
    popupDisplayDestination.insertAdjacentElement(`afterbegin`, popup);
  }

  function closePopup(popup) {
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
  }

  function successPopupCloseBtnPressHandler() {
    closePopup(newSuccessPopup);
  }

  function errorPopupCloseBtnPressHandler() {
    closePopup(newErrorPopup);
  }

  function popupEscPressHandler(evt) {
    if (evt.key === `Escape`) {
      evt.preventDefault();
      closePopup(activePopup);
    }
  }

  // function onSuccessPopupEscPress(evt) {
  //   if (evt.key === `Escape`) {
  //     evt.preventDefault();
  //     closePopup(newSuccessPopup);
  //   }
  // }

  // function onErrorPopupEscPress(evt) {
  //   if (evt.key === `Escape`) {
  //     evt.preventDefault();
  //     closePopup(newErrorPopup);
  //   }
  // }

  // function OnDocumentClick(evt) {
  //   if (!evt.target.closest(`.popup`)) {
  //     closePopup(activePopup);
  //   }
  // }

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
