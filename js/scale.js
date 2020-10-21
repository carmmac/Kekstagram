"use strict";

// ИЗМЕНЕНИЕ МАСШТАБА ИЗОБРАЖЕНИЯ
(() => {
  window.scalePanel = window.photoEditor.querySelector(`.img-upload__scale`);
  window.scaleBtnSmaller = window.photoEditor.querySelector(`.scale__control--smaller`);
  window.scaleValueField = window.photoEditor.querySelector(`.scale__control--value`);
  window.INIT_SCALE_VALUE = 100;
  window.SCALE_CHANGE_STEP = 25;

  window.scale = {
    // Функция применения масштаба
    scaleChangeHandler(evt) {
      const currentScale = parseInt(window.scale.scaleValueField.value, 10);
      let newScale;
      if (evt.target === window.scaleBtnSmaller) {
        newScale = window.scale.decreaseScaleValue(currentScale);
      } else {
        newScale = window.scale.increaseScaleValue(currentScale);
      }
      window.scaleValueField.value = `${newScale}%`;
      window.scale.changeImgScale(newScale);
    },

    // Функция изменения масштаба превью-изображения
    changeImgScale(value) {
      window.previewImg.style.transform = `scale(${value / 100})`;
    },

    decreaseScaleValue(currScale) {
      return currScale > 25 ? currScale - window.SCALE_CHANGE_STEP : currScale;
    },

    increaseScaleValue(currScale) {
      return currScale === 100 ? currScale : currScale + window.SCALE_CHANGE_STEP;
    },
  };
})();
