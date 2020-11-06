"use strict";

(() => {
  // ЗАГРУЗКА ИЗОБРАЖЕНИЯ
  const photoUploadForm = document.querySelector(`.img-upload__form`);
  const photoUploader = photoUploadForm.querySelector(`.img-upload__input`);
  const photoEditor = document.querySelector(`.img-upload__overlay`);
  const previewImg = photoEditor.querySelector(`.img-upload__preview img`);
  const photoEditorCloseBtn = photoEditor.querySelector(`.img-upload__cancel`);
  // ИЗМЕНЕНИЕ МАСШТАБА ИЗОБРАЖЕНИЯ
  const scalePanel = photoEditor.querySelector(`.img-upload__scale`);
  const scaleBtnSmaller = photoEditor.querySelector(`.scale__control--smaller`);
  const scaleValueField = photoEditor.querySelector(`.scale__control--value`);
  const INIT_SCALE_VALUE = 100;
  const SCALE_CHANGE_STEP = 25;
  // ЭФФЕКТЫ ИЗОБРАЖЕНИЯ
  const effectsPanel = photoEditor.querySelector(`.effects__list`);
  const effectName = {
    chrome: `grayscale`,
    sepia: `sepia`,
    marvin: `invert`,
    phobos: `blur`,
    heat: `brightness`,
  };
  // ИНТЕНСИВНОСТЬ ЭФФЕКТА
  const effectLevelPanel = photoEditor.querySelector(`.img-upload__effect-level`);
  const effectLevelBar = effectLevelPanel.querySelector(`.effect-level__line`);
  const effectLevelPin = effectLevelPanel.querySelector(`.effect-level__pin`);
  const effectLevelInput = effectLevelPanel.querySelector(`.effect-level__value`);
  const effectLevelDepthBar = effectLevelPanel.querySelector(`.effect-level__depth`);
  const INITIAL_EFFECT_LVL = 100;
  // ВАЛИДАЦИЯ ХЭШТЕГОВ
  const hashtagInput = photoEditor.querySelector(`.text__hashtags`);
  const regExp = /^#[a-zA-Zа-яА-Я\d]+$/;
  const MIN_HATSHTAG_LENGTH = 1;
  const MAX_HATSHTAG_LENGTH = 20;
  const MAX_HASHTAG_NUM = 5;
  // ВАЛИДАЦИЯ КОММЕНТАРИЯ
  const commentInput = photoEditor.querySelector(`.text__description`);
  commentInput.maxLength = 140;

  function openEditor() {
    window.util.modal.show(photoEditor);
    if (getCurrentEffect() === null) {
      window.util.element.hide(effectLevelPanel);
    }
    scaleValueField.value = `${INIT_SCALE_VALUE}%`;
    scalePanel.addEventListener(`click`, scaleChangeHandler);
    photoEditorCloseBtn.addEventListener(`click`, photoEditorCloseBtnPressHandler);
    document.addEventListener(`keydown`, photoEditorEscPressHandler);
    effectsPanel.addEventListener(`change`, effectChangeHandler);
    effectLevelPin.addEventListener(`mousedown`, effectLevelChangeHandler);
    hashtagInput.addEventListener(`input`, hashtagValidityHandler);
    commentInput.addEventListener(`focusin`, preventEscPress);
    commentInput.addEventListener(`focusout`, restoreEscPress);
    hashtagInput.addEventListener(`focusin`, preventEscPress);
    hashtagInput.addEventListener(`focusout`, restoreEscPress);
    photoUploadForm.addEventListener(`submit`, successPostHandler);
  }

  function closePhotoEditor() {
    photoUploader.value = ``;
    previewImg.style.transform = ``;
    effectsPanel.querySelector(`#effect-none`).checked = true;
    effectLevelDepthBar.style.width = ``;
    hashtagInput.value = ``;
    commentInput.value = ``;
    window.util.modal.hide(photoEditor);
    removeEffect(getCurrentEffect());
    document.removeEventListener(`keydown`, photoEditorEscPressHandler);
    photoEditorCloseBtn.removeEventListener(`click`, photoEditorCloseBtnPressHandler);
    scalePanel.removeEventListener(`click`, scaleChangeHandler);
    effectsPanel.removeEventListener(`change`, effectChangeHandler);
    effectLevelPin.removeEventListener(`mousedown`, effectLevelChangeHandler);
    hashtagInput.removeEventListener(`input`, hashtagValidityHandler);
    commentInput.removeEventListener(`focusin`, preventEscPress);
    commentInput.removeEventListener(`focusout`, restoreEscPress);
    hashtagInput.removeEventListener(`focusin`, preventEscPress);
    hashtagInput.removeEventListener(`focusout`, restoreEscPress);
    photoUploadForm.removeEventListener(`submit`, successPostHandler);
  }

  function photoEditorCloseBtnPressHandler() {
    closePhotoEditor();
  }

  function photoEditorEscPressHandler(evt) {
    if (evt.key === `Escape`) {
      evt.preventDefault();
      closePhotoEditor();
    }
  }

  function submitForm() {
    window.load.post(new FormData(photoUploadForm), () => {
      closePhotoEditor();
      window.popup(`success`);
    }, () => {
      closePhotoEditor();
      window.popup(`error`);
    });
  }

  function successPostHandler(evt) {
    submitForm();
    evt.preventDefault();
  }

  function setChangeHandler(cb) {
    photoUploader.addEventListener(`change`, cb);
  }

  function changeImgScale(value) {
    previewImg.style.transform = `scale(${value / 100})`;
  }

  function decreaseScaleValue(currScale) {
    return currScale > 25 ? currScale - SCALE_CHANGE_STEP : currScale;
  }

  function increaseScaleValue(currScale) {
    return currScale === 100 ? currScale : currScale + SCALE_CHANGE_STEP;
  }

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

  function effectChangeHandler(evt) {
    if (evt.target.matches(`input[type="radio"]`)) {
      const currentEffectName = evt.target.value;
      applyEffect(currentEffectName, INITIAL_EFFECT_LVL);
      effectLevelPin.style.left = `${Math.floor((effectLevelBar.offsetWidth * INITIAL_EFFECT_LVL) / 100)}px`;
    }
  }

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

  function addEffect(effect) {
    previewImg.classList.add(`effects__preview--${effect}`);
  }

  function removeEffect(effectClass) {
    previewImg.classList.remove(effectClass);
    previewImg.style.filter = ``;
    effectLevelDepthBar.style.width = `${INITIAL_EFFECT_LVL}%`;
  }

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

  function effectLevelChangeHandler(evt) {
    evt.preventDefault();
    const maxEffectLevel = effectLevelBar.offsetWidth;
    let startCoords = evt.clientX;
    function moveAt(value) {
      effectLevelPin.style.left = `${value}px`;
    }

    function mouseMoveHandler(moveEvt) {
      moveEvt.preventDefault();
      let newEffectLevel = getEffectLevel(effectLevelPin.offsetLeft);
      effectLevelInput.value = newEffectLevel;
      const currentFilter = effectsPanel.querySelector(`input[type="radio"]:checked`);
      applyEffect(currentFilter.value, newEffectLevel);
      const shift = startCoords - moveEvt.clientX;
      startCoords = moveEvt.clientX;
      let moveValue = effectLevelPin.offsetLeft - shift;
      if (moveValue > 0 && moveValue < (maxEffectLevel)) {
        moveAt((moveValue));
      } else {
        moveAt((moveValue) > 0 ? maxEffectLevel : 0);
      }
      effectLevelDepthBar.style.width = `${newEffectLevel}%`;
    }

    function mouseUpHandler(upEvt) {
      upEvt.preventDefault();
      document.removeEventListener(`mousemove`, mouseMoveHandler);
      document.removeEventListener(`mouseup`, mouseUpHandler);
    }

    document.addEventListener(`mousemove`, mouseMoveHandler);
    document.addEventListener(`mouseup`, mouseUpHandler);
  }

  function getEffectLevel(currLevel) {
    const effectLevel = Math.floor((currLevel * 100) / effectLevelBar.offsetWidth);
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

  function hashtagValidityHandler(evt) {
    checkHashtagValidity(evt);
  }

  function checkHashtagValidity(evt) {
    let hashtags = evt.target.value.split(/ +/);
    for (let i = 0; i < hashtags.length; i++) {
      if ((!regExp.test(hashtags[i])) && (hashtags[i].length !== 0)) {
        hashtagInput.setCustomValidity(`Неверный формат хэштэга ${hashtags[i]} !`);
        setInvalidInputStyle(hashtagInput);
      } else if ((hashtags[i].length > MAX_HATSHTAG_LENGTH)) {
        hashtagInput.setCustomValidity(`Хэштэг ${hashtags[i]} слишком длинный!`);
        setInvalidInputStyle(hashtagInput);
      } else if (hashtags.length > MAX_HASHTAG_NUM) {
        hashtagInput.setCustomValidity(`Слишком много хэштэгов!`);
        setInvalidInputStyle(hashtagInput);
      } else if (checkIdenticalHashtags(hashtags)) {
        hashtagInput.setCustomValidity(`Не используйте одинаковые хэштэги!`);
        setInvalidInputStyle(hashtagInput);
      } else if (checkEmptyHashtag(hashtags)) {
        hashtagInput.setCustomValidity(`Не используйте пустые хэштэги!`);
        setInvalidInputStyle(hashtagInput);
      } else {
        hashtagInput.setCustomValidity(``);
        hashtagInput.style.border = ``;
        hashtagInput.style.padding = ``;
      }
      hashtagInput.reportValidity();
    }
  }

  function setInvalidInputStyle(input) {
    input.style.border = `5px solid red`;
    input.style.padding = `2px 7px`;
  }

  function checkIdenticalHashtags(arr) {
    return arr.some((item) => arr.indexOf(item) !== arr.lastIndexOf(item));
  }

  function checkEmptyHashtag(arr) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].length === MIN_HATSHTAG_LENGTH) {
        return true;
      }
    }
    return false;
  }

  function preventEscPress() {
    document.removeEventListener(`keydown`, photoEditorEscPressHandler);
  }

  function restoreEscPress() {
    document.addEventListener(`keydown`, photoEditorEscPressHandler);
  }

  window.form = {
    setHandler: setChangeHandler,
    open: openEditor,
    close: closePhotoEditor,
  };
})();
