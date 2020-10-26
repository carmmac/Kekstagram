"use strict";

(() => {
  // ЗАГРУЗКА ИЗОБРАЖЕНИЯ
  const photoUploader = document.querySelector(`.img-upload__input`);
  const photoEditor = document.querySelector(`.img-upload__overlay`);
  const previewImg = photoEditor.querySelector(`.img-upload__preview img`);
  const photoEditorCloseBtn = photoEditor.querySelector(`.img-upload__cancel`);

  // ИЗМЕНЕНИЕ МАСШТАБА ИЗОБРАЖЕНИЯ
  const scalePanel = photoEditor.querySelector(`.img-upload__scale`);
  const scaleBtnSmaller = photoEditor.querySelector(`.scale__control--smaller`);
  const scaleValueField = photoEditor.querySelector(`.scale__control--value`);
  const INIT_SCALE_VALUE = 100;
  const SCALE_CHANGE_STEP = 25;

  // Функция открытия окна редактора изображения
  function openEditor() {
    window.util.modal.show(photoEditor);
    if (getCurrentEffect() === null) {
      window.util.element.hide(effectLevelPanel);
    }
    scaleValueField.value = `${INIT_SCALE_VALUE}%`;
    // Обработчик изменения масштаба
    scalePanel.addEventListener(`click`, scaleChangeHandler);
    // Обработчик закрытия окна по кнопке "X"
    photoEditorCloseBtn.addEventListener(`click`, onPhotoEditorCloseBtnPress);
    // Обработчик закрытия окна по по нажатию Esc
    document.addEventListener(`keydown`, onPhotoEditorEscPress);
    // Обработчик переключения эффектов на изображении
    effectsPanel.addEventListener(`change`, effectChangeHandler);
    // Обработчик уровня эффекта
    effectLevelPin.addEventListener(`mousedown`, effectLevelChangeHandler);
    // Обработчик ввода хэштегов
    hashtagInput.addEventListener(`input`, checkHashtagValidity);
  }

  // Функция закрытия редактора изображения
  function closePhotoEditor() {
    photoUploader.value = ``;
    previewImg.style.transform = ``;
    hashtagInput.value = ``;
    commentInput.value = ``;
    window.util.element.hide(photoEditor);
    removeEffect(getCurrentEffect());
    document.removeEventListener(`keydown`, onPhotoEditorEscPress);
    photoEditorCloseBtn.removeEventListener(`click`, onPhotoEditorCloseBtnPress);
    scalePanel.removeEventListener(`click`, scaleChangeHandler);
    effectsPanel.removeEventListener(`change`, effectChangeHandler);
    effectLevelPin.removeEventListener(`mousedown`, effectLevelChangeHandler);
    hashtagInput.removeEventListener(`input`, checkHashtagValidity);
  }

  // Функция закрытия редактора по кнопке Х
  function onPhotoEditorCloseBtnPress() {
    closePhotoEditor();
  }

  // Функция закрытия редактора по нажатию Esc
  function onPhotoEditorEscPress(evt) {
    if (evt.key === `Escape` && !commentInput.focused) {
      evt.preventDefault();
      closePhotoEditor();
    }
  }

  // Функция изменения масштаба превью-изображения
  function changeImgScale(value) {
    previewImg.style.transform = `scale(${value / 100})`;
  }

  function decreaseScaleValue(currScale) {
    return currScale > 25 ? currScale - SCALE_CHANGE_STEP : currScale;
  }

  function increaseScaleValue(currScale) {
    return currScale === 100 ? currScale : currScale + SCALE_CHANGE_STEP;
  }

  // Функция применения масштаба
  function scaleChangeHandler(evt) {
    const currentScale = parseInt(scaleValueField.value, 10);
    let newScale;
    if (evt.target === scaleBtnSmaller) {
      newScale = decreaseScaleValue(currentScale);
    } else {
      newScale = increaseScaleValue(currentScale);
    }
    scaleValueField.value = `${newScale}%`;
    changeImgScale(newScale);
  }


  // ЭФФЕКТЫ ИЗОБРАЖЕНИЯ
  const effectsPanel = photoEditor.querySelector(`.effects__list`);
  const effectName = {
    chrome: `grayscale`,
    sepia: `sepia`,
    marvin: `invert`,
    phobos: `blur`,
    heat: `brightness`,
  };

  function effectChangeHandler(evt) {
    if (evt.target.matches(`input[type="radio"]`)) {
      const currentEffectName = evt.target.value;
      applyEffect(currentEffectName, initialEffectLevel);
      effectLevelPin.style.left = `${Math.floor((effectLevelBar.offsetWidth * initialEffectLevel) / 100)}px`;
    }
  }

  // Функция применения эффектов
  function changeEffect(value) {
    const currentEffect = getCurrentEffect();
    if (currentEffect !== `effects__preview--${value}`) {
      if (value !== `none`) {
        window.util.element.show(effectLevelPanel);
        removeEffect(currentEffect);
        addEffect(value);
      } else {
        window.util.element.hide(effectLevelPanel);
        removeEffect(currentEffect);
      }
    }
  }

  // Функция добавления эффекта
  function addEffect(effect) {
    previewImg.classList.add(`effects__preview--${effect}`);
  }

  // Функция удаления эффекта
  function removeEffect(effectClass) {
    previewImg.classList.remove(effectClass);
    previewImg.style.filter = ``;
  }

  // Функция проверки наличия эффекта
  function getCurrentEffect() {
    const classes = previewImg.classList;
    for (let i = 0; i < classes.length; i++) {
      if (classes[i].includes(`effects__preview--`)) {
        const currEffect = classes[i];
        return currEffect;
      }
    }
    return null;
  }


  // ИНТЕНСИВНОСТЬ ЭФФЕКТА
  // начальная реализация по заданию
  const effectLevelPanel = photoEditor.querySelector(`.img-upload__effect-level`);
  const effectLevelBar = effectLevelPanel.querySelector(`.effect-level__line`);
  const effectLevelPin = effectLevelPanel.querySelector(`.effect-level__pin`);
  const effectLevelInput = effectLevelPanel.querySelector(`.effect-level__value`);
  const initialEffectLevel = parseInt(effectLevelInput.value, 10);

  // Функция изменения глубины эффекта
  function effectLevelChangeHandler(evt) {
    evt.preventDefault();

    const effectLevel = {
      MIN: 0,
      MAX: effectLevelBar.offsetWidth
    };
    let startCoords = evt.clientX;

    function moveAt(value) {
      effectLevelPin.style.left = `${value}px`;
    }

    function onMouseMove(moveEvt) {
      moveEvt.preventDefault();

      let newEffectLevel = getEffectLevel(effectLevel.MAX, effectLevelPin.offsetLeft);
      effectLevelInput.value = newEffectLevel;
      const currentFilter = effectsPanel.querySelector(`input[type="radio"]:checked`);
      applyEffect(currentFilter.value, newEffectLevel);

      const shift = startCoords - moveEvt.clientX;
      startCoords = moveEvt.clientX;
      let moveValue = effectLevelPin.offsetLeft - shift;

      if (moveValue > 0 && moveValue < (effectLevelBar.offsetWidth)) {
        moveAt((moveValue));
      } else {
        moveAt((moveValue) > 0 ? effectLevelBar.offsetWidth : 0);
      }
    }

    function onMouseUp(upEvt) {
      upEvt.preventDefault();

      document.removeEventListener(`mousemove`, onMouseMove);
      document.removeEventListener(`mouseup`, onMouseUp);
    }

    document.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseUp);
  }

  // function getPositionX(elem) {
  //   const positionX = elem.offsetLeft;
  //   return positionX;
  // }

  function getEffectLevel(maxLevel, currLevel) {
    const effectLevel = Math.floor((currLevel * 100) / maxLevel);
    return effectLevel;
  }

  function applyEffect(effect, value) {
    changeEffect(effect);
    switch (effect) {
      case `phobos`:
        previewImg.style.filter = effectName[effect] + `(${(value * 3) / 100}px)`;
        break;
      case `heat`:
        previewImg.style.filter = effectName[effect] + `(${(value * 3) / 100})`;
        break;
      case `marvin`:
        previewImg.style.filter = effectName[effect] + `(${value}%)`;
        break;
      default:
        previewImg.style.filter = effectName[effect] + `(${value / 100})`;
    }
  }

  // ВАЛИДАЦИЯ ХЭШТЕГОВ
  const hashtagInput = photoEditor.querySelector(`.text__hashtags`);
  const regExp = /^#[a-zA-Zа-яА-Я\d]+$/;
  const MIN_HATSHTAG_LENGTH = 1;
  const MAX_HATSHTAG_LENGTH = 20;
  const MAX_HASHTAG_NUM = 5;

  // Функция проверки валижности хэштега
  function checkHashtagValidity(evt) {
    let hashtags = evt.target.value.split(/ +/);
    for (let i = 0; i < hashtags.length; i++) {
      if ((!regExp.test(hashtags[i])) && (hashtags[i].length !== 0)) {
        hashtagInput.setCustomValidity(`Неверный формат хэштэга ${hashtags[i]} !`);
      } else if ((hashtags[i].length > MAX_HATSHTAG_LENGTH)) {
        hashtagInput.setCustomValidity(`Хэштэг ${hashtags[i]} слишком длинный!`);
      } else if (hashtags.length > MAX_HASHTAG_NUM) {
        hashtagInput.setCustomValidity(`Слишком много хэштэгов!`);
      } else if (checkIdenticalHashtags(hashtags)) {
        hashtagInput.setCustomValidity(`Не используйте одинаковые хэштэги!`);
      } else if (checkEmptyHashtag(hashtags)) {
        hashtagInput.setCustomValidity(`Не используйте пустые хэштэги!`);
      } else {
        hashtagInput.setCustomValidity(``);
      }
      hashtagInput.reportValidity();
    }
  }

  // Функция проверки одиковых тэгов
  function checkIdenticalHashtags(arr) {
    return arr.some((item) => arr.indexOf(item) !== arr.lastIndexOf(item));
  }

  // Функция проверки пустых тэгов
  function checkEmptyHashtag(arr) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].length === MIN_HATSHTAG_LENGTH) {
        return true;
      }
    }
    return false;
  }


  // ВАЛИДАЦИЯ КОММЕНТАРИЯ
  const commentInput = photoEditor.querySelector(`.text__description`);
  commentInput.maxLength = 140;

  // Флаги фокуса поля для обработчика закрытия окна по Esc
  commentInput.onfocus = () => {
    commentInput.focused = true;
  };

  commentInput.onblur = () => {
    commentInput.focused = false;
  };


  window.form = {
    open: openEditor,
  };
})();
