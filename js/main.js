"use strict";

const PHOTOS_NUM_MAX = 25;
const LIKES_MIN = 15;
const LIKES_MAX = 200;
const AVATAR_NUM_MIN = 1;
const AVATAR_NUM_MAX = 6;
const pictures = document.querySelector(`.pictures`);
const pictureTemplate = document.querySelector(`#picture`);
const pictureTemplateContent = pictureTemplate.content.querySelector(
    `.picture`
);
const bigPicture = document.querySelector(`.big-picture`);
const bigPictureImg = bigPicture.querySelector(`.big-picture__img img`);
const bigPictureLikesCount = bigPicture.querySelector(`.likes-count`);
const bigPictureCommentsCount = bigPicture.querySelector(`.comments-count`);
const bigPictureComments = bigPicture.querySelector(`.social__comments`);
const bigPictureDescription = bigPicture.querySelector(`.social__caption`);
const bigPictureCloseBtn = bigPicture.querySelector(`.big-picture__cancel`);

const messages = [
  `Всё отлично!`,
  `В целом всё неплохо. Но не всё.`,
  `Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.`,
  `Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.`,
  `Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.`,
  `Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!`,
];
const names = [
  `Иван`,
  `Федор`,
  `Василий`,
  `Дмитрий`,
  `Александр`,
  `Сергей`,
  `Петр`,
  `Михаил`,
  `Георгий`,
];
const descriptions = [
  `Лучший день рождения!`,
  `Потрясающие выходные..`,
  `С лучшим другом))`,
  `Это был восхитительный день!`,
  `Настроение супер`,
];

// Рандомайзер чисел
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Перемешивание массива
function shuffleArr(arr) {
  let j;
  let temp;
  for (let i = arr.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    temp = arr[j];
    arr[j] = arr[i];
    arr[i] = temp;
  }
  return arr;
}

// Наполнение комментария
function getComment() {
  const comment = {};
  comment.avatar = `img/avatar-${getRandomNumber(
      AVATAR_NUM_MIN,
      AVATAR_NUM_MAX
  )}.svg`;
  comment.message = messages[getRandomNumber(0, messages.length - 1)];
  comment.name = names[getRandomNumber(0, names.length - 1)];
  return comment;
}

// Наполнение информации о фотографии
function getPhotos() {
  let photos = [];

  for (let i = 0; i < PHOTOS_NUM_MAX; i++) {
    const newPhoto = {};
    newPhoto.url = `photos/${i + 1}.jpg`;
    newPhoto.description =
      descriptions[getRandomNumber(0, descriptions.length - 1)];
    newPhoto.likes = getRandomNumber(LIKES_MIN, LIKES_MAX);
    newPhoto.comments = [];
    for (let j = 0; j < getRandomNumber(1, 5); j++) {
      newPhoto.comments[j] = getComment();
    }
    photos[i] = newPhoto;
  }
  return shuffleArr(photos);
}

const photos = getPhotos();

// Функция наполнения темплейта фотографии
function getPhotoElement(photo, idNum) {
  const newPicture = pictureTemplateContent.cloneNode(true);
  const newPictureImg = newPicture.querySelector(`.picture__img`);

  newPictureImg.src = photo.url;
  newPictureImg.dataset.id = `${idNum}`;
  newPicture.querySelector(`.picture__likes`).textContent = photo.likes;
  newPicture.querySelector(`.picture__comments`).textContent = photo.comments.length;

  return newPicture;
}

// Наполнение блока фотографиями из массива
function insertPhotoElements(imgs) {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < imgs.length; i++) {
    fragment.appendChild(getPhotoElement(imgs[i], i));
  }
  return pictures.appendChild(fragment);
}
insertPhotoElements(photos);


// ПОЛНОЭКРАННОЕ ФОТО
// Функция наполнения комментария для полноэкранного фото
function getBigPicComment(comment) {
  const newBigPicComment = bigPictureComments.querySelector(`.social__comment`).cloneNode(true);

  newBigPicComment.querySelector(`.social__picture`).src = comment.avatar;
  newBigPicComment.querySelector(`.social__picture`).alt = comment.name;
  newBigPicComment.querySelector(`.social__text`).textContent = comment.message;

  return newBigPicComment;
}

// Наполнение комментариев из массива для полноэкранного фото
function insertBigPicComment(comments) {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < comments.length; i++) {
    fragment.appendChild(getBigPicComment(comments[i]));
  }
  return bigPictureComments.appendChild(fragment);
}


// Функция отображения окна с полноэкранной фотографией
function showBigPicture(currentImg) {

  showModalWindow(bigPicture);
  bigPictureImg.src = currentImg.url;
  bigPictureLikesCount.textContent = currentImg.likes;
  bigPictureCommentsCount.textContent = currentImg.comments.length;
  bigPictureDescription.textContent = currentImg.description;
  bigPicture.querySelector(`.social__comment-count`).classList.add(`hidden`);
  bigPicture.querySelector(`.comments-loader`).classList.add(`hidden`);

  insertBigPicComment(currentImg.comments);

  // Обработчик закрытия окна по по нажатию Esc
  document.addEventListener(`keydown`, onBigPictureEscPress);

  // Обработчик закрытия окна по клику вне окна
  bigPicture.addEventListener(`click`, bigPictureCloseHandler);

  // Обработчик закрытия окна по кнопке "X"
  bigPictureCloseBtn.addEventListener(`click`, function () {
    closeBigPicture();
  });
}


// Обработчик открытия окна полноэкранной фотографии
pictures.addEventListener(`click`, function (evt) {
  if (evt.target && evt.target.closest(`img`)) {
    const pictureToShow = photos[evt.target.dataset.id];
    showBigPicture(pictureToShow);
  }
});

// Функция закрытия окна по нажатию Esc
function onBigPictureEscPress(evt) {
  if (evt.key === `Escape`) {
    evt.preventDefault();
    closeBigPicture();
  }
}

// Функция закрытия окна по клику вне окна
function bigPictureCloseHandler(evt) {
  if (!evt.target.closest(`.big-picture__preview`)) {
    closeBigPicture();
  }
}

// Функция закрытия окна полноэкранной фотографии
function closeBigPicture() {
  hideModalWindow(bigPicture);
  document.removeEventListener(`keydown`, onBigPictureEscPress);
  bigPicture.removeEventListener(`click`, bigPictureCloseHandler);
}

// Универсальная функция открытия модалки
function showModalWindow(elem) {
  elem.classList.remove(`hidden`);
  document.body.classList.add(`modal-open`);
}

// Универсальная функция закрытия модалки
function hideModalWindow(elem) {
  elem.classList.add(`hidden`);
  document.body.classList.remove(`modal-open`);
}


// ЗАГРУЗКА ИЗОБРАЖЕНИЯ
const fileUploader = pictures.querySelector(`.img-upload__input`);
const photoEditor = pictures.querySelector(`.img-upload__overlay`);
const photoEditorCloseBtn = photoEditor.querySelector(`.img-upload__cancel`);

const scaleBtnSmaller = photoEditor.querySelector(`.scale__control--smaller`);
const scaleBtnBigger = photoEditor.querySelector(`.scale__control--bigger`);
const scaleValueField = photoEditor.querySelector(`.scale__control--value`);
const initialScaleValue = 100;
const scaleChangeStep = 25;

// Обработчик загрузки нового изображения
fileUploader.addEventListener(`change`, function () {

  // Открытие окна редактора изображения
  showModalWindow(photoEditor);
  scaleValueField.value = initialScaleValue;

  scaleBtnSmaller.addEventListener(`click`, function () {
    let newScale = getSmallerScale(scaleValueField.value, scaleChangeStep);
    scaleValueField.value = newScale;
    console.log(typeof scaleValueField.value);
  });

  scaleBtnBigger.addEventListener(`click`, function () {
    let newScale = getBiggerScale(scaleValueField.value, scaleChangeStep);
    scaleValueField.value = newScale;
  });

  // Обработчик закрытия окна по кнопке "X"
  photoEditorCloseBtn.addEventListener(`click`, function () {
    closePhotoEditor();
  });
  // Обработчик закрытия окна по по нажатию Esc
  document.addEventListener(`keydown`, onPhotoEditorEscPress);

});

// Функция закрытия редактора изображения
function closePhotoEditor() {
  hideModalWindow(photoEditor);
  document.removeEventListener(`keydown`, onPhotoEditorEscPress);
}

// Функция закрытия редактора по нажатию Esc
function onPhotoEditorEscPress(evt) {
  if (evt.key === `Escape`) {
    evt.preventDefault();
    closePhotoEditor();
  }
}

function getSmallerScale(currentScale, step) {
  if (currentScale > 0) {
    return currentScale - step;
  } else {
    return currentScale;
  }
}

function getBiggerScale(currentScale, step) {
  if (currentScale === 100) {
    return currentScale;
  } else {
    return currentScale + step;
  }
}
