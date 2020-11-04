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
  const bigPictureCommentsLoadBtn = bigPicture.querySelector(`.comments-loader`);
  const VISIBLE_COMMENTS_NUM = 5;
  let comments = [];

  // Функция отображения окна с полноэкранной фотографией
  function showBigPicture(currentImg) {
    window.util.modal.show(bigPicture);
    bigPictureImg.src = currentImg.url;
    bigPictureLikesCount.textContent = currentImg.likes;
    bigPictureCommentsCount.textContent = currentImg.comments.length;
    bigPictureDescription.textContent = currentImg.description;
    bigPicture.querySelector(`.social__comment-count`).classList.add(`hidden`);
    comments = currentImg.comments;
    insertBigPicComment(comments);
    toggleCommentsBtnVisibility(comments);
    // Обработчик закрытия окна по по нажатию Esc
    document.addEventListener(`keydown`, bigPictureEscPressHandler);
    // Обработчик закрытия окна по клику вне окна
    bigPicture.addEventListener(`click`, bigPictureCloseHandler);
    // Обработчик закрытия окна по кнопке "X"
    bigPictureCloseBtn.addEventListener(`click`, bigPictureCloseBtnPressHandler);
  }

  function commentsLoadHandler() {
    renderComments(bigPictureComments.children.length);
    toggleCommentsBtnVisibility();
  }

  function toggleCommentsBtnVisibility() {
    if (bigPictureComments.children.length < VISIBLE_COMMENTS_NUM || bigPictureComments.children.length === comments.length) {
      window.util.element.hide(bigPictureCommentsLoadBtn);
      bigPictureCommentsLoadBtn.removeEventListener(`click`, commentsLoadHandler);
    } else {
      window.util.element.show(bigPictureCommentsLoadBtn);
      bigPictureCommentsLoadBtn.addEventListener(`click`, commentsLoadHandler);
    }
  }

  // Функция наполнения комментария для полноэкранного фото
  function getBigPicComment(comment) {
    const newBigPicComment = bigPictureComment.cloneNode(true);
    newBigPicComment.querySelector(`.social__picture`).src = comment.avatar;
    newBigPicComment.querySelector(`.social__picture`).alt = comment.name;
    newBigPicComment.querySelector(`.social__text`).textContent = comment.message;
    return newBigPicComment;
  }

  // Наполнение комментариев из массива для полноэкранного фото
  function insertBigPicComment() {
    removeBigPicComments();
    renderComments();
  }

  function renderComments(i = 0) {
    const fragment = document.createDocumentFragment();
    const j = i;
    while (i < (j + VISIBLE_COMMENTS_NUM) && i < comments.length) {
      fragment.appendChild(getBigPicComment(comments[i]));
      i++;
    }
    return bigPictureComments.appendChild(fragment);
  }

  // Функцуия очистки комментариев для bigPicture
  function removeBigPicComments() {
    bigPictureComments.innerHTML = ``;
  }

  // Функция закрытия окна по кнопке Х
  function bigPictureCloseBtnPressHandler() {
    closeBigPicture();
  }

  // Функция закрытия окна по нажатию Esc
  function bigPictureEscPressHandler(evt) {
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
    window.util.modal.hide(bigPicture);
    document.removeEventListener(`keydown`, bigPictureEscPressHandler);
    bigPicture.removeEventListener(`click`, bigPictureCloseHandler);
    bigPictureCloseBtn.removeEventListener(`click`, bigPictureCloseBtnPressHandler);
  }


  window.bigPicture = {
    show: showBigPicture,
  };
})();
