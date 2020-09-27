'use strict'

let comments = [];
const newDescr = [];
const messages = [
  `Всё отлично!`,
  `В целом всё неплохо. Но не всё.`,
  `Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.`,
  `Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.`,
  `Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.`,
  `Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!`
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
  `Георгий`
];

function getRandomNumber (min, max) {
 return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffleArr(arr){
	let j, temp;
	for (let i = arr.length - 1; i > 0; i--) {
		j = Math.floor(Math.random() * (i + 1));
		temp = arr[j];
		arr[j] = arr[i];
		arr[i] = temp;
	}
	return arr;
}

function getComment () {
  let comment = {};
  comment.avatar = `img/avatar-${getRandomNumber(1, 6)}.svg`;
  comment.message = messages[getRandomNumber(0, messages.length - 1)];
  comment.name = names[getRandomNumber(0, names.length - 1)];
  return comment;
}

function getPhotoDescr () {
  const PHOTO_NUM_MIN = 1;
  const PHOTO_NUM_MAX = 25;
  const LIKES_MIN = 15;
  const LIKES_MAX = 200;

  let urls = [];
  let description = `Описание фотографии`;
  let likes = [];

  for (let i = 0; i < 25; i++) {
    // наполнение массива фотографий
    urls[i] = `photos/${i+1}.jpg`;

    // наполнение массива лайков
    likes[i] = getRandomNumber(LIKES_MIN, LIKES_MAX);

    // наполнение объекта комментария
    comments[i] = getComment();
  };

  urls = shuffleArr(urls);
  comments = shuffleArr(comments);

  for (let i = 0; i < 25; i++) {
    let newDescrItem = {};
    newDescrItem.url = urls[i];
    newDescrItem.description = description;
    newDescrItem.likes = likes[i];
    newDescrItem.comments = comments[getRandomNumber(0, comments.length - 1)];
    newDescr[i] = newDescrItem;
  }
  return newDescr;
}
getPhotoDescr();
