"use strict";

// ВАЛИДАЦИЯ ХЭШТЕГОВ
(() => {
  window.hashtagInput = window.photoEditor.querySelector(`.text__hashtags`);
  const regExp = /^#[a-zA-Zа-яА-Я\d]+$/;
  const MIN_HATSHTAG_LENGTH = 1;
  const MAX_HATSHTAG_LENGTH = 20;
  const MAX_HASHTAG_NUM = 5;

  window.hastag = {
    // Функция проверки валижности хэштега
    checkHashtagValidity(evt) {
      let hashtags = evt.target.value.split(/ +/);
      for (let i = 0; i < hashtags.length; i++) {
        if ((!regExp.test(hashtags[i])) && (hashtags[i].length !== 0)) {
          window.hashtagInput.setCustomValidity(`Неверный формат хэштэга ${hashtags[i]} !`);
        } else if ((hashtags[i].length > MAX_HATSHTAG_LENGTH)) {
          window.hashtagInput.setCustomValidity(`Хэштэг ${hashtags[i]} слишком длинный!`);
        } else if (hashtags.length > MAX_HASHTAG_NUM) {
          window.hashtagInput.setCustomValidity(`Слишком много хэштэгов!`);
        } else if (window.hastag.checkIdenticalHashtags(hashtags)) {
          window.hashtagInput.setCustomValidity(`Не используйте одинаковые хэштэги!`);
        } else if (window.hastag.checkEmptyHashtag(hashtags)) {
          window.hashtagInput.setCustomValidity(`Не используйте пустые хэштэги!`);
        } else {
          window.hashtagInput.setCustomValidity(``);
        }
        window.hashtagInput.reportValidity();
      }
    },

    // Функция проверки одиковых тэгов
    checkIdenticalHashtags(arr) {
      return arr.some((item) => arr.indexOf(item) !== arr.lastIndexOf(item));
    },

    // Функция проверки пустых тэгов
    checkEmptyHashtag(arr) {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].length === MIN_HATSHTAG_LENGTH) {
          return true;
        }
      }
      return false;
    },
  };
})();
