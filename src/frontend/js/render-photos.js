import {renderPicture} from "./render-picture.js";

const pictures = document.querySelector(`.pictures`);

export const renderPhotos = (imgs) => {
  const pics = pictures.querySelectorAll(`.picture`);
  for (let pic of pics) {
    pic.parentNode.removeChild(pic);
  }
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < imgs.length; i++) {
    let img = renderPicture(imgs[i], i);
    img.addEventListener(`click`, () => {
      window.showBigPicture(imgs[i]);
    });
    fragment.appendChild(img);
  }
  return pictures.appendChild(fragment);
};
