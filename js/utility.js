"use strict";

// ОБЩИЕ УТИЛИТЫ
(() => {

  window.utility = {
    // Рандомайзер чисел
    getRandomNumber: function getRandomNumber(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    // Перемешивание массива
    shuffleArr: function shuffleArr(arr) {
      let j;
      let temp;
      for (let i = arr.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        temp = arr[j];
        arr[j] = arr[i];
        arr[i] = temp;
      }
      return arr;
    },

    // Универсальная функция открытия модалки
    showModalWindow(elem) {
      elem.classList.remove(`hidden`);
      document.body.classList.add(`modal-open`);
    },

    // Универсальная функция закрытия модалки
    hideModalWindow(elem) {
      elem.classList.add(`hidden`);
      document.body.classList.remove(`modal-open`);
    },

    hideElement(elem) {
      elem.classList.add(`hidden`);
    },

    showElement(elem) {
      elem.classList.remove(`hidden`);
    },
  };
})();
