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

const BigPicCommentTemplate = `
  <template id="big-picture-comment">
    <li class="social__comment">
      <img
          class="social__picture"
          src="{{аватар}}"
          alt="{{имя комментатора}}"
          width="35" height="35">
      <p class="social__text">{{текст комментария}}</p>
    </li>
  </template>
`;

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
  const newPicture = pictureTemplateContent.cloneNode(true);

  newPicture.querySelector(`.picture__img`).src = photo.url;
  newPicture.querySelector(`.picture__likes`).textContent = photo.likes;
  newPicture.querySelector(`.picture__comments`).textContent = photo.comments.length;

  return newPicture;
}

// Наполнение блока фотографиями из массива
function insertPhotoElements(imgs) {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < imgs.length; i++) {
    fragment.appendChild(getPhotoElement(imgs[i]));
  }
  return pictures.appendChild(fragment);
}

insertPhotoElements(photos);


// Добавление темплейта в DOM
function createBigPicCommentTemplate() {
  pictureTemplate.insertAdjacentHTML(`afterend`, BigPicCommentTemplate);
  const BigPicCommentTemplateContent = document
    .querySelector(`#big-picture-comment`)
    .content.querySelector(`.social__comment`);

  return BigPicCommentTemplateContent;
}
const bigPicCommentHTML = createBigPicCommentTemplate();

// Функция наполнения темплейта
function getBigPicComment(comment) {
  const newBigPicComment = bigPicCommentHTML.cloneNode(true);

  newBigPicComment.querySelector(`.social__picture`).src = comment.avatar;
  newBigPicComment.querySelector(`.social__picture`).alt = comment.name;
  newBigPicComment.querySelector(`.social__text`).textContent = comment.message;

  return newBigPicComment;
}

// Наполнение комментариев из массива
function insertBigPicComment(comments) {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < comments.length; i++) {
    fragment.appendChild(getBigPicComment(comments[i]));
  }
  return bigPictureComments.appendChild(fragment);
}

// Отображение фотографии в fullscreen
function showBigPicture() {
  const photoBig = photos[0];
  // лучше создавать переменные для элементов или сразу находить и изменять их здесь?
  bigPicture.classList.remove(`hidden`);
  bigPictureImg.src = photoBig.url;
  bigPictureLikesCount.textContent = photoBig.likes;
  bigPictureCommentsCount.textContent = photoBig.comments.length;
  bigPictureDescription.textContent = photoBig.description;
  // вот так:
  bigPicture.querySelector(`.social__comment-count`).classList.add(`hidden`);
  bigPicture.querySelector(`.comments-loader`).classList.add(`hidden`);
  document.body.classList.add(`modal-open`);

  insertBigPicComment(photoBig.comments);
}
showBigPicture();
