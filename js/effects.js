"use strict";

// ЭФФЕКТЫ ИЗОБРАЖЕНИЯ
(() => {
  const effectName = {
    chrome: `grayscale`,
    sepia: `sepia`,
    marvin: `invert`,
    phobos: `blur`,
    heat: `brightness`,
  };

  window.effectsPanel = window.photoEditor.querySelector(`.effects__list`);
  window.effectLevelPanel = window.photoEditor.querySelector(`.img-upload__effect-level`);
  window.effectLevelBar = window.effectLevelPanel.querySelector(`.effect-level__line`);
  window.effectLevelPin = window.effectLevelPanel.querySelector(`.effect-level__pin`);
  window.effectLevelInput = window.effectLevelPanel.querySelector(`.effect-level__value`);

  window.effect = {
    effectChangeHandler(evt) {
      if (evt.target.matches(`input[type="radio"]`)) {
        const currentEffectName = evt.target.value;
        window.effect.applyEffect(currentEffectName, window.initialEffectLevel);
      }
    },

    // Функция применения эффектов
    changeEffect(value) {
      const currentEffect = window.effect.getCurrentEffect();
      if (currentEffect !== `effects__preview--${value}`) {
        if (value !== `none`) {
          window.util.showElement(window.effectLevelPanel);
          window.effect.removeEffect(currentEffect);
          window.effect.addEffect(value);
        } else {
          window.util.hideElement(window.effectLevelPanel);
          window.effect.removeEffect(currentEffect);
        }
      }
    },

    // Функция добавления эффекта
    addEffect(effect) {
      window.previewImg.classList.add(`effects__preview--${effect}`);
    },

    // Функция удаления эффекта
    removeEffect(effectClass) {
      window.previewImg.classList.remove(effectClass);
      window.previewImg.style.filter = ``;
    },

    // Функция проверки наличия эффекта
    getCurrentEffect() {
      const classes = window.previewImg.classList;
      for (let i = 0; i < classes.length; i++) {
        if (classes[i].includes(`effects__preview--`)) {
          const currEffect = classes[i];
          return currEffect;
        }
      }
      return null;
    },

    // ИНТЕНСИВНОСТЬ ЭФФЕКТА
    changeEffectLevel(evt) {
      const effectLevel = {
        MIN: 0,
        MAX: window.effectLevelBar.offsetWidth
      };
      const newEffectLevel = window.effect.getEffectLevel(effectLevel.MAX, window.effect.getPositionX(evt.target));
      window.effectLevelInput.value = newEffectLevel;

      const currentFilter = window.effectsPanel.querySelector(`input[type="radio"]:checked`);
      window.effect.applyEffect(currentFilter.value, newEffectLevel);
    },

    getPositionX(elem) {
      const positionX = elem.offsetLeft;
      return positionX;
    },

    getEffectLevel(maxLevel, currLevel) {
      const effectLevel = Math.floor((currLevel * 100) / maxLevel);
      return effectLevel;
    },

    applyEffect(effect, value) {
      window.effect.changeEffect(effect);
      switch (effect) {
        case `phobos`:
          window.previewImg.style.filter = effectName[effect] + `(${(value * 3) / 100}px)`;
          break;
        case `heat`:
          window.previewImg.style.filter = effectName[effect] + `(${(value * 3) / 100})`;
          break;
        case `marvin`:
          window.previewImg.style.filter = effectName[effect] + `(${value}%)`;
          break;
        default:
          window.previewImg.style.filter = effectName[effect] + `(${value / 100})`;
      }
    },

  };
})();
