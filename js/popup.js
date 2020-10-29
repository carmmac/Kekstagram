"use strict";

(() => {
  const popupDisplayDestination = document.querySelector(`main`);
  const statusValue = {
    OK: `success`,
    ERROR: `error`,
  };

  const successMessageTemplate = document.querySelector(`#success`);
  const successMessageTemplateContent = successMessageTemplate.content.querySelector(`.success`);
  const newSuccessPopup = successMessageTemplateContent.cloneNode(true);
  const popupSuccessCloseBtn = newSuccessPopup.querySelector(`.success__button`);

  const errorMessageTemplate = document.querySelector(`#error`);
  const errorMessageTemplateContent = errorMessageTemplate.content.querySelector(`.error`);
  const newErrorPopup = errorMessageTemplateContent.cloneNode(true);
  const popupErrorCloseBtn = newErrorPopup.querySelector(`.error__button`);

  function showPopup(status) {
    if (status === statusValue.OK) {
      insertPopup(newSuccessPopup);
      popupSuccessCloseBtn.addEventListener(`click`, onSuccessPopupCloseBtnPress);
      document.addEventListener(`keydown`, onSuccessPopupEscPress);
      newSuccessPopup.addEventListener(`click`, popupSuccessCloseHandler);
    } else {
      insertPopup(newErrorPopup);
      popupErrorCloseBtn.addEventListener(`click`, onErrorPopupCloseBtnPress);
      document.addEventListener(`keydown`, onErrorPopupEscPress);
      newErrorPopup.addEventListener(`click`, popupErrorCloseHandler);
    }
  }

  function insertPopup(popup) {
    popupDisplayDestination.insertAdjacentElement(`afterbegin`, popup);
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
    if (!evt.target.closest(`.${statusValue.OK}__inner`)) {
      closePopup(newSuccessPopup);
    }
  }

  function popupErrorCloseHandler(evt) {
    if (!evt.target.closest(`.${statusValue.ERROR}__inner`)) {
      closePopup(newErrorPopup);
    }
  }

  window.popup = {
    show: showPopup,
  };
})();
