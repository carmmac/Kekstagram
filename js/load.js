"use strict";

// ЗАГРУЗКА НОВОЙ ФОТОГРАФИИ
(() => {
  window.photoUploadForm = window.pictures.querySelector(`.img-upload__form`);
  window.photoUploader = window.pictures.querySelector(`.img-upload__input`);
  window.photoEditor = window.pictures.querySelector(`.img-upload__overlay`);
  window.previewImg = window.photoEditor.querySelector(`.img-upload__preview img`);
  window.photoEditorCloseBtn = window.photoEditor.querySelector(`.img-upload__cancel`);

  window.load = {
    // Функция открытия окна редактора изображения
    openEditor() {
      window.util.showModalWindow(window.photoEditor);
      if (window.effect.getCurrentEffect() === null) {
        window.util.hideElement(window.effectLevelPanel);
      }
      window.scaleValueField.value = `${window.INIT_SCALE_VALUE}%`;
      // Обработчик изменения масштаба
      window.scalePanel.addEventListener(`click`, window.scaleChangeHandler);
      // Обработчик закрытия окна по кнопке "X"
      window.photoEditorCloseBtn.addEventListener(`click`, window.load.onPhotoEditorCloseBtnPress);
      // Обработчик закрытия окна по по нажатию Esc
      document.addEventListener(`keydown`, window.load.onPhotoEditorEscPress);
      // Обработчик переключения эффектов на изображении
      window.effectsPanel.addEventListener(`change`, window.effect.effectChangeHandler);
      // Обработчик уровня эффекта
      window.effectLevelPin.addEventListener(`mouseup`, window.effect.changeEffectLevel);
      // Обработчик ввода хэштегов
      window.hashtagInput.addEventListener(`input`, window.hastag.checkHashtagValidity);
    },

    // Функция закрытия редактора изображения
    closePhotoEditor() {
      window.photoUploader.value = ``;
      window.util.hideModalWindow(window.photoEditor);
      window.effect.removeEffect(window.effect.getCurrentEffect());
      document.removeEventListener(`keydown`, window.load.onPhotoEditorEscPress);
      window.photoEditorCloseBtn.removeEventListener(`click`, window.load.onPhotoEditorCloseBtnPress);
      window.scalePanel.removeEventListener(`click`, window.scale.scaleChangeHandler);
      window.effectsPanel.removeEventListener(`change`, window.effect.effectChangeHandler);
      window.effectLevelPin.removeEventListener(`mouseup`, window.effect.changeEffectLevel);
      window.hashtagInput.removeEventListener(`input`, window.hastag.checkHashtagValidity);
    },

    // Функция закрытия редактора по кнопке Х
    onPhotoEditorCloseBtnPress() {
      window.load.closePhotoEditor();
    },

    // Функция закрытия редактора по нажатию Esc
    onPhotoEditorEscPress(evt) {
      if (evt.key === `Escape` && !window.comment.commentInput.focused) {
        evt.preventDefault();
        window.load.closePhotoEditor();
      }
    },
  };
})();
