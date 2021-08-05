import {
  INIT_SCALE_VALUE,
  SCALE_CHANGE_STEP,
  INITIAL_EFFECT_LVL,
  MIN_HATSHTAG_LENGTH,
  MAX_HATSHTAG_LENGTH,
  MAX_HASHTAG_NUM,
  FILE_TYPES,
  Effect,
  EffectName,
  regExp,
} from "../const.js";

import {showPopup} from "./show-popup.js";
import {load} from "./load.js";
import {hideElement, showElement} from "./util.js";

const photoUploadForm = document.querySelector(`.img-upload__form`);
const photoUploader = photoUploadForm.querySelector(`.img-upload__input`);
const photoEditor = document.querySelector(`.img-upload__overlay`);
const previewImg = photoEditor.querySelector(`.img-upload__preview img`);
const photoEditorCloseBtn = photoEditor.querySelector(`.img-upload__cancel`);

const scalePanel = photoEditor.querySelector(`.img-upload__scale`);
const scaleBtnSmaller = photoEditor.querySelector(`.scale__control--smaller`);
const scaleValueField = photoEditor.querySelector(`.scale__control--value`);

const effectsPanel = photoEditor.querySelector(`.effects__list`);

const effectLevelPanel = photoEditor.querySelector(`.img-upload__effect-level`);
const effectLevelBar = effectLevelPanel.querySelector(`.effect-level__line`);
const effectLevelPin = effectLevelPanel.querySelector(`.effect-level__pin`);
const effectLevelInput = effectLevelPanel.querySelector(`.effect-level__value`);
const effectLevelDepthBar = effectLevelPanel.querySelector(`.effect-level__depth`);

const hashtagInput = photoEditor.querySelector(`.text__hashtags`);

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
  load.post(new FormData(photoUploadForm), () => {
    closePhotoEditor();
    showPopup(`success`);
  }, () => {
    closePhotoEditor();
    showPopup(`error`);
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
      showElement(effectLevelPanel);
      removeEffect(currentEffect);
      addEffect(value);
    } else {
      hideElement(effectLevelPanel);
      removeEffect(currentEffect);
    }
  }
};

const applyEffect = (effect, value) => {
  changeEffect(effect);
  switch (effect) {
    case EffectName.PHOBOS:
      previewImg.style.filter = Effect[effect] + `(${(value * 3) / 100}px)`;
      break;
    case EffectName.HEAT:
      previewImg.style.filter = Effect[effect] + `(${(value * 3) / 100})`;
      break;
    case EffectName.MARVIN:
      previewImg.style.filter = Effect[effect] + `(${value}%)`;
      break;
    default:
      previewImg.style.filter = Effect[effect] + `(${value / 100})`;
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
  showElement(photoEditor);
  if (getCurrentEffect() === null) {
    hideElement(effectLevelPanel);
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
  hideElement(photoEditor);
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

export const form = {
  setHandler: setChangeHandler,
  open: openEditor,
  close: closePhotoEditor,
  uploadPhoto: uploadCustomPhoto,
};
