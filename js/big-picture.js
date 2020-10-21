"use strict";

// ПОЛНОЭКРАННОЕ ФОТО
(() => {
  const bigPicture = document.querySelector(`.big-picture`);
  const bigPictureImg = bigPicture.querySelector(`.big-picture__img img`);
  const bigPictureLikesCount = bigPicture.querySelector(`.likes-count`);
  const bigPictureCommentsCount = bigPicture.querySelector(`.comments-count`);
  const bigPictureComments = bigPicture.querySelector(`.social__comments`);
  const bigPictureComment = bigPictureComments.querySelector(`.social__comment`);
  const bigPictureDescription = bigPicture.querySelector(`.social__caption`);
  const bigPictureCloseBtn = bigPicture.querySelector(`.big-picture__cancel`);

  window.bigPicture = {
    // Функция наполнения комментария для полноэкранного фото
    getBigPicComment(comment) {
      const newBigPicComment = bigPictureComment.cloneNode(true);
      newBigPicComment.querySelector(`.social__picture`).src = comment.avatar;
      newBigPicComment.querySelector(`.social__picture`).alt = comment.name;
      newBigPicComment.querySelector(`.social__text`).textContent = comment.message;
      return newBigPicComment;
    },

    // Функцуия очистки комментариев для bigPicture
    removeBigPicComments() {
      bigPictureComments.innerHTML = ``;
    },

    // Функция отображения окна с полноэкранной фотографией
    showBigPicture(currentImg) {
      window.util.showModalWindow(bigPicture);
      bigPictureImg.src = currentImg.url;
      bigPictureLikesCount.textContent = currentImg.likes;
      bigPictureCommentsCount.textContent = currentImg.comments.length;
      bigPictureDescription.textContent = currentImg.description;
      bigPicture.querySelector(`.social__comment-count`).classList.add(`hidden`);
      bigPicture.querySelector(`.comments-loader`).classList.add(`hidden`);
      window.bigPicture.insertBigPicComment(currentImg.comments);
      // Обработчик закрытия окна по по нажатию Esc
      document.addEventListener(`keydown`, window.bigPicture.onBigPictureEscPress);
      // Обработчик закрытия окна по клику вне окна
      bigPicture.addEventListener(`click`, window.bigPicture.bigPictureCloseHandler);
      // Обработчик закрытия окна по кнопке "X"
      bigPictureCloseBtn.addEventListener(`click`, window.bigPicture.onBigPictureCloseBtnPress);
    },

    bigPictureOpenHandler(evt) {
      if (evt.target.closest(`img`) && window.photoEditor.classList.value.includes(`hidden`)) {
        const pictureToShow = window.photosArr[evt.target.dataset.id];
        window.bigPicture.showBigPicture(pictureToShow);
      }
    },

    // Функция закрытия окна по кнопке Х
    onBigPictureCloseBtnPress() {
      window.bigPicture.closeBigPicture();
    },

    // Функция закрытия окна по нажатию Esc
    onBigPictureEscPress(evt) {
      if (evt.key === `Escape`) {
        evt.preventDefault();
        window.bigPicture.closeBigPicture();
      }
    },

    // Функция закрытия окна по клику вне окна
    bigPictureCloseHandler(evt) {
      if (!evt.target.closest(`.big-picture__preview`)) {
        window.bigPicture.closeBigPicture();
      }
    },

    // Функция закрытия окна полноэкранной фотографии
    closeBigPicture() {
      window.util.hideModalWindow(bigPicture);
      document.removeEventListener(`keydown`, window.bigPicture.onBigPictureEscPress);
      bigPicture.removeEventListener(`click`, window.bigPicture.bigPictureCloseHandler);
      bigPictureCloseBtn.removeEventListener(`click`, window.bigPicture.onBigPictureCloseBtnPress);
    },

    // Наполнение комментариев из массива для полноэкранного фото
    insertBigPicComment(comments) {
      window.bigPicture.removeBigPicComments();
      const fragment = document.createDocumentFragment();
      for (let i = 0; i < comments.length; i++) {
        fragment.appendChild(window.bigPicture.getBigPicComment(comments[i]));
      }
      return bigPictureComments.appendChild(fragment);
    },
  };
})();
