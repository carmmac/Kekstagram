"use strict";

const pictures = document.querySelector(`.pictures`);

window.renderPhotos = function (imgs) {
  const pics = pictures.querySelectorAll(`.picture`);
  for (let pic of pics) {
    pic.parentNode.removeChild(pic);
  }
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < imgs.length; i++) {
    let img = window.renderPicture(imgs[i], i);
    img.addEventListener(`click`, () => {
      window.showBigPicture(imgs[i]);
    });
    fragment.appendChild(img);
  }
  return pictures.appendChild(fragment);
};
