"use strict";

let comments = [];
const newDescr = [];
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
  const avatarNumMin = 1;
  const avatarNumMax = 6;
  const comment = {};
  comment.avatar = `img/avatar-${getRandomNumber(
      avatarNumMin,
      avatarNumMax
  )}.svg`;
  comment.message = messages[getRandomNumber(0, messages.length - 1)];
  comment.name = names[getRandomNumber(0, names.length - 1)];
  return comment;
}

// Наполнение описания фотографии
function getPhotoDescr() {
  // const PHOTO_NUM_MIN = 1;
  // const PHOTO_NUM_MAX = 25;
  const LIKES_MIN = 15;
  const LIKES_MAX = 200;

  let urls = [];

  let likes = [];

  for (let i = 0; i < 25; i++) {
    // наполнение массива url-ов
    urls[i] = `photos/${i + 1}.jpg`;

    // наполнение массива лайков
    likes[i] = getRandomNumber(LIKES_MIN, LIKES_MAX);

    // наполнение объекта комментария
    comments[i] = getComment();
  }

  urls = shuffleArr(urls);
  comments = shuffleArr(comments);

  for (let i = 0; i < 25; i++) {
    const newDescrItem = {};
    newDescrItem.url = urls[i];
    newDescrItem.description =
      descriptions[getRandomNumber(0, descriptions.length - 1)];
    newDescrItem.likes = likes[i];
    newDescrItem.comments = comments[getRandomNumber(0, comments.length - 1)];
    newDescr[i] = newDescrItem;
  }
  return newDescr;
}
getPhotoDescr();

/*
* Прототип алгоритма создания массива рандомных неповторяющихся url для фоток;
* не работает, бесконечный цикл.
function getUrl () {
  url = `photos/${getRandomNumber(1, 3)}.jpg`;
  return url;
}

function checkDouble (a, array) {
  array.forEach(function(item, i, arr)  {
    if ((arr.length > 2) && (item === a)) {
      let newUrl = getUrl();
      arr[i] = newUrl;
      checkDouble(newUrl, arr);
    }
    return array;
  });
}

let urls = [];
for (let i = 0; i < 3; i++) {
  urls[i] = getUrl();
  checkDouble(url, urls);
};

*/
