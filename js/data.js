"use strict";

// СОЗДАНИЕ МАССИВА ФОТОГРАФИЙ
(() => {
  const PHOTOS_NUM_MAX = 25;
  const AVATAR_NUM_MIN = 1;
  const AVATAR_NUM_MAX = 6;
  const LIKES_MIN = 15;
  const LIKES_MAX = 200;

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

  function getPhotos() {
    let photos = [];
    for (let i = 0; i < PHOTOS_NUM_MAX; i++) {
      const newPhoto = {};
      newPhoto.url = `photos/${i + 1}.jpg`;
      newPhoto.description =
        descriptions[window.util.random(0, descriptions.length - 1)];
      newPhoto.likes = window.util.random(LIKES_MIN, LIKES_MAX);
      newPhoto.comments = [];
      for (let j = 0; j < window.util.random(1, 5); j++) {
        newPhoto.comments[j] = getComment();
      }
      photos[i] = newPhoto;
    }
    return window.util.shuffle(photos);
  }

  function getComment() {
    const comment = {};
    comment.avatar = `img/avatar-${window.util.random(
        AVATAR_NUM_MIN,
        AVATAR_NUM_MAX
    )}.svg`;
    comment.message = messages[window.util.random(0, messages.length - 1)];
    comment.name = names[window.util.random(0, names.length - 1)];
    return comment;
  }

  window.data = {
    photos: getPhotos(),
  };
})();
