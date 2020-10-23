"use strict";

const pictures = document.querySelector(`.pictures`);

// Наполнение блока фотографиями из массива
function insertPhotoElements(imgs) {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < imgs.length; i++) {
    fragment.appendChild(window.picture.getPicture(imgs[i], i));
  }
  return pictures.appendChild(fragment);
}
insertPhotoElements(window.data.photos);


// ПОЛНОЭКРАННОЕ ФОТО
// Обработчики открытия окна полноэкранной фотографии
pictures.addEventListener(`click`, bigPictureOpenHandler);
pictures.addEventListener(`keydown`, onPictureEnterPress);

function bigPictureOpenHandler(evt) {
  if (evt.target.closest(`img`) && photoEditor.classList.value.includes(`hidden`)) {
    const pictureToShow = window.data.photos[evt.target.dataset.id];
    window.bigPicture.show(pictureToShow);
  }
}

function onPictureEnterPress(evt) {
  if (evt.target.matches(`.picture`) && evt.key === `Enter`) {
    evt.preventDefault();
    const pictureToShow = window.data.photos[evt.target.querySelector(`img`).dataset.id];
    window.bigPicture.show(pictureToShow);
  }
}


// ЗАГРУЗКА ИЗОБРАЖЕНИЯ
const photoUploadForm = document.querySelector(`.img-upload__form`);
const photoUploader = photoUploadForm.querySelector(`.img-upload__input`);
const photoEditor = photoUploadForm.querySelector(`.img-upload__overlay`);
photoUploadForm.action = `https://21.javascript.pages.academy/kekstagram`;

// Обработчик загрузки нового изображения
photoUploader.addEventListener(`change`, window.form.openForm);

// Обработчик отправки изображения
// ! Вынести работу обрабочика в функцию, далее удалять обработчик при закрытии окна редактирования
// photoUploadForm.addEventListener(`submit`, function (evt) {
// });
