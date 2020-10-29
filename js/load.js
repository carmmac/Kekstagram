"use strict";

// ЗАГРУЗКА ДАННЫХ С СЕРВЕРА
(() => {
  const URL = `https://21.javascript.pages.academy/kekstagram/daa`;
  const TIMEOUT_IN_MS = 10000;

  window.load = function (onSuccess, onError) {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;
    xhr.timeout = TIMEOUT_IN_MS;
    xhr.open(`GET`, URL, true);
    xhr.addEventListener(`load`, function () {
      switch (xhr.status) {
        case 200:
          onSuccess(xhr.response);
          break;
        case 400:
          onError(`Неверный запрос`);
          break;
        case 401:
          onError(`Пользователь не авторизован`);
          break;
        case 404:
          onError(`Ошибка загрузки данных`);
          break;
        default:
          onError(`Cтатус ответа:${xhr.status + xhr.statusText}`);
      }
    });
    xhr.addEventListener(`error`, () => {
      onError(`Произошла ошибка соединения`);
    });
    xhr.addEventListener(`timeout`, () => {
      onError(`Запрос не успел выполниться за ${xhr.timeout / 1000} сек.`);
    });
    xhr.send();
  };
})();
