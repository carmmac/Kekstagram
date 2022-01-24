import {renderPicture} from './render-picture.js';
import {showBigPicture} from './show-big-picture';

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
      showBigPicture(imgs[i]);
    });
    fragment.appendChild(img);
  }
  return pictures.appendChild(fragment);
};
