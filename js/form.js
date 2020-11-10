"use strict";

const INIT_SCALE_VALUE = 100;
const SCALE_CHANGE_STEP = 25;
const INITIAL_EFFECT_LVL = 100;
const MIN_HATSHTAG_LENGTH = 1;
const MAX_HATSHTAG_LENGTH = 20;
const MAX_HASHTAG_NUM = 5;
const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];

const photoUploadForm = document.querySelector(`.img-upload__form`);
const photoUploader = photoUploadForm.querySelector(`.img-upload__input`);
const photoEditor = document.querySelector(`.img-upload__overlay`);
const previewImg = photoEditor.querySelector(`.img-upload__preview img`);
const photoEditorCloseBtn = photoEditor.querySelector(`.img-upload__cancel`);

const scalePanel = photoEditor.querySelector(`.img-upload__scale`);
const scaleBtnSmaller = photoEditor.querySelector(`.scale__control--smaller`);
const scaleValueField = photoEditor.querySelector(`.scale__control--value`);

const effectsPanel = photoEditor.querySelector(`.effects__list`);
const effectName = {
  chrome: `grayscale`,
  sepia: `sepia`,
  marvin: `invert`,
  phobos: `blur`,
  heat: `brightness`,
};

const effectLevelPanel = photoEditor.querySelector(`.img-upload__effect-level`);
const effectLevelBar = effectLevelPanel.querySelector(`.effect-level__line`);
const effectLevelPin = effectLevelPanel.querySelector(`.effect-level__pin`);
const effectLevelInput = effectLevelPanel.querySelector(`.effect-level__value`);
const effectLevelDepthBar = effectLevelPanel.querySelector(`.effect-level__depth`);

const hashtagInput = photoEditor.querySelector(`.text__hashtags`);
const regExp = /^#[a-zA-Zа-яА-Я\d]+$/;

const commentInput = photoEditor.querySelector(`.text__description`);
commentInput.maxLength = 140;

const photoEditorCloseBtnPressHandler = () => {
  closePhotoEditor();
};

const photoEditorEscPressHandler = (evt) => {
  if (evt.key === `Escape`) {
    evt.preventDefault();
    closePhotoEditor();
  }
};

const submitForm = () => {
  window.load.post(new FormData(photoUploadForm), () => {
    closePhotoEditor();
    window.showPopup(`success`);
  }, () => {
    closePhotoEditor();
    window.showPopup(`error`);
  });
};

const successPostHandler = (evt) => {
  submitForm();
  evt.preventDefault();
};

const uploadCustomPhoto = () => {
  const file = photoUploader.files[0];
  const fileName = file.name.toLowerCase();
  const match = FILE_TYPES.some((fileType) => {
    return fileName.endsWith(fileType);
  });
  if (match) {
    const reader = new FileReader();
    reader.addEventListener(`load`, () => {
      previewImg.src = reader.result;
      previewImg.style.width = `100%`;
    });
    reader.readAsDataURL(file);
  }
};

const changeImgScale = (value) => {
  previewImg.style.transform = `scale(${value / 100})`;
};

const decreaseScaleValue = (currScale) => {
  return currScale > 25 ? currScale - SCALE_CHANGE_STEP : currScale;
};

const increaseScaleValue = (currScale) => {
  return currScale === 100 ? currScale : currScale + SCALE_CHANGE_STEP;
};

const setChangeHandler = (cb) => {
  photoUploader.addEventListener(`change`, cb);
};

const scaleChangeHandler = (evt) => {
  const currentScale = parseInt(scaleValueField.value, 10);
  let newScale;
  if (evt.target === scaleBtnSmaller) {
    newScale = decreaseScaleValue(currentScale);
  } else {
    newScale = increaseScaleValue(currentScale);
  }
  scaleValueField.value = `${newScale}%`;
  changeImgScale(newScale);
};

const getCurrentEffect = () => {
  const classes = previewImg.classList;
  for (let i = 0; i < classes.length; i++) {
    if (classes[i].includes(`effects__preview--`)) {
      const currEffect = classes[i];
      return currEffect;
    }
  }
  return null;
};

const addEffect = (effect) => {
  previewImg.classList.add(`effects__preview--${effect}`);
};

const removeEffect = (effectClass) => {
  previewImg.classList.remove(effectClass);
  previewImg.style.filter = ``;
  effectLevelDepthBar.style.width = `${INITIAL_EFFECT_LVL}%`;
};

const changeEffect = (value) => {
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
};

const applyEffect = (effect, value) => {
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
};

const effectChangeHandler = (evt) => {
  if (evt.target.matches(`input[type="radio"]`)) {
    const currentEffectName = evt.target.value;
    applyEffect(currentEffectName, INITIAL_EFFECT_LVL);
    effectLevelPin.style.left = `${Math.floor((effectLevelBar.offsetWidth * INITIAL_EFFECT_LVL) / 100)}px`;
  }
};

const getEffectLevel = (currLevel) => {
  const effectLevel = Math.floor((currLevel * 100) / effectLevelBar.offsetWidth);
  return effectLevel;
};

const effectLevelChangeHandler = (evt) => {
  evt.preventDefault();
  const maxEffectLevel = effectLevelBar.offsetWidth;
  let startCoords = evt.clientX;
  const moveAt = (value) => {
    effectLevelPin.style.left = `${value}px`;
  };

  const mouseMoveHandler = (moveEvt) => {
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
  };

  const mouseUpHandler = (upEvt) => {
    upEvt.preventDefault();
    document.removeEventListener(`mousemove`, mouseMoveHandler);
    document.removeEventListener(`mouseup`, mouseUpHandler);
  };

  document.addEventListener(`mousemove`, mouseMoveHandler);
  document.addEventListener(`mouseup`, mouseUpHandler);
};


const checkIdenticalHashtags = (hashtags) => {
  return hashtags.some((item) => hashtags.indexOf(item) !== hashtags.lastIndexOf(item));
};

const setInvalidInputStyle = (input) => {
  input.style.border = `5px solid red`;
  input.style.padding = `2px 7px`;
};

const checkEmptyHashtag = (hashtags) => {
  for (let i = 0; i < hashtags.length; i++) {
    if (hashtags[i].length === MIN_HATSHTAG_LENGTH) {
      return true;
    }
  }
  return false;
};

const checkHashtagValidity = (evt) => {
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
  hashtagInput.reportValidity();
};

const hashtagValidityHandler = (evt) => {
  checkHashtagValidity(evt);
};

const preventEscPressHandler = () => {
  document.removeEventListener(`keydown`, photoEditorEscPressHandler);
};

const restoreEscPressHandler = () => {
  document.addEventListener(`keydown`, photoEditorEscPressHandler);
};

const openEditor = () => {
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
  commentInput.addEventListener(`focusin`, preventEscPressHandler);
  commentInput.addEventListener(`focusout`, restoreEscPressHandler);
  hashtagInput.addEventListener(`focusin`, preventEscPressHandler);
  hashtagInput.addEventListener(`focusout`, restoreEscPressHandler);
  photoUploadForm.addEventListener(`submit`, successPostHandler);
};

const closePhotoEditor = () => {
  photoUploader.value = ``;
  previewImg.style.transform = ``;
  previewImg.style.width = ``;
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
  commentInput.removeEventListener(`focusin`, preventEscPressHandler);
  commentInput.removeEventListener(`focusout`, restoreEscPressHandler);
  hashtagInput.removeEventListener(`focusin`, preventEscPressHandler);
  hashtagInput.removeEventListener(`focusout`, restoreEscPressHandler);
  photoUploadForm.removeEventListener(`submit`, successPostHandler);
};

window.form = {
  setHandler: setChangeHandler,
  open: openEditor,
  close: closePhotoEditor,
  uploadPhoto: uploadCustomPhoto,
};
