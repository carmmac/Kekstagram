"use strict";

// ОТРИСОВКА ФОТО МИНИАТЮР
(() => {
  window.pictures = document.querySelector(`.pictures`);

  window.picture = {
    // Наполнение блока миниатюрами из массива
    insertPhotoElements(imgs) {
      const fragment = document.createDocumentFragment();
      for (let i = 0; i < imgs.length; i++) {
        fragment.appendChild(window.data.getPhotoElement(imgs[i], i));
      }
      return window.pictures.appendChild(fragment);
    },

    // Функция нажатия Enter на миниатюре
    onPictureEnterPress(evt) {
      if (evt.target.matches(`.picture`) && evt.key === `Enter`) {
        evt.preventDefault();
        const pictureToShow = window.photosArr[evt.target.querySelector(`img`).dataset.id];
        window.bigPicture.showBigPicture(pictureToShow);
      }
    },
  };
})();
