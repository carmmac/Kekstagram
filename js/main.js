"use strict";

window.photosArr = window.data.getPhotos();
window.picture.insertPhotoElements(window.photosArr);

// ПОЛНОЭКРАННОЕ ФОТО
// Обработчики открытия окна полноэкранной фотографии
window.pictures.addEventListener(`click`, window.bigPicture.bigPictureOpenHandler);
window.pictures.addEventListener(`keydown`, window.picture.onPictureEnterPress);

// ЗАГРУЗКА ИЗОБРАЖЕНИЯ
window.photoUploadForm.action = `https://21.javascript.pages.academy/kekstagram`;
// Обработчик загрузки нового изображения
window.photoUploader.addEventListener(`change`, function () {
  window.load.openEditor();
});
// Обработчик отправки изображения
// ! Вынести работу обрабочика в функцию, далее удалять обработчик при закрытии окна редактирования
// photoUploadForm.addEventListener(`submit`, function (evt) {
// });

// ИЗМЕНЕНИЕ МАСШТАБА ИЗОБРАЖЕНИЯ

// ЭФФЕКТЫ ИЗОБРАЖЕНИЯ
window.initialEffectLevel = parseInt(window.effectLevelInput.value, 10);

// ИНТЕНСИВНОСТЬ ЭФФЕКТА
// начальная реализация по заданию

// ВАЛИДАЦИЯ ХЭШТЕГОВ

// ВАЛИДАЦИЯ КОММЕНТАРИЯ

window.comment.commentInput.maxLength = 140;
// Флаги фокуса поля для обработчика закрытия окна по Esc
window.comment.commentInput.onfocus = () => {
  window.comment.commentInput.focused = true;
};

window.comment.commentInput.onblur = () => {
  window.comment.commentInput.focused = false;
};
