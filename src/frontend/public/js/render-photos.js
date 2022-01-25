import {renderPicture} from './render-picture.js';
import {showBigPicture} from './show-big-picture';

const pictures = document.querySelector(`.pictures`);

export const renderPhotos = (imgs) => {
  const pics = pictures.querySelectorAll(`.picture`);

  for (let pic of pics) {
    pic.parentNode.removeChild(pic);
  }

  const fragment = document.createDocumentFragment();

  imgs.forEach((item) => {
    const img = renderPicture(item);

    img.addEventListener(`click`, () => {
      showBigPicture(item);
    });

    fragment.appendChild(img);
  });

  return pictures.appendChild(fragment);
};
