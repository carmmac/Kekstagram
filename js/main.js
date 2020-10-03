"use strict";

const PHOTOS_NUM_MAX = 25;
const LIKES_MIN = 15;
const LIKES_MAX = 200;
const AVATAR_NUM_MIN = 1;
const AVATAR_NUM_MAX = 6;
const pictures = document.querySelector(`.pictures`);
const pictureTemplate = document
  .querySelector(`#picture`)
  .content.querySelector(`.picture`);

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

// Функция наполнения темплейта
function getPhotoElement(photo) {
  const newPicture = pictureTemplate.cloneNode(true);

  newPicture.querySelector(`.picture__img`).src = photo.url;
  newPicture.querySelector(`.picture__likes`).textContent = photo.likes;
  newPicture.querySelector(`.picture__comments`).textContent = photo.comments.length;

  return newPicture;
}

// Наполнение блока фотографиями из массива
function insertPhotoElements(fotos) {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < fotos.length; i++) {
    fragment.appendChild(getPhotoElement(fotos[i]));
  }
  return pictures.appendChild(fragment);
}

insertPhotoElements(photos);
