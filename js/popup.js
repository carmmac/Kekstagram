"use strict";

(() => {
  const popupDisplayDestination = document.querySelector(`main`);
  const successMessageTemplate = document.querySelector(`#success`);
  const successMessageTemplateContent = successMessageTemplate.content.querySelector(`.success`);
  const newSuccessPopup = successMessageTemplateContent.cloneNode(true);
  const popupCloseBtn = newSuccessPopup.querySelector(`.success__button`);

  function showSuccessPopup() {
    popupDisplayDestination.insertAdjacentElement(`afterbegin`, newSuccessPopup);
    popupCloseBtn.addEventListener(`click`, onPopupCloseBtnPress);
    document.addEventListener(`keydown`, onBigPictureEscPress);
    newSuccessPopup.addEventListener(`click`, popupCloseHandler);
  }

  function closeSuccessPopup() {
    newSuccessPopup.remove();
    popupCloseBtn.removeEventListener(`click`, onPopupCloseBtnPress);
    document.removeEventListener(`keydown`, onBigPictureEscPress);
    newSuccessPopup.removeEventListener(`click`, popupCloseHandler);
  }

  function onPopupCloseBtnPress() {
    closeSuccessPopup();
  }

  function onBigPictureEscPress(evt) {
    if (evt.key === `Escape`) {
      evt.preventDefault();
      closeSuccessPopup();
    }
  }

  function popupCloseHandler(evt) {
    if (!evt.target.closest(`.success__inner`)) {
      closeSuccessPopup();
    }
  }

  window.popup = {
    success: {
      show: showSuccessPopup,
    },
  };
})();
