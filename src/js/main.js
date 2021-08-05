import {form} from "./form.js";
import {filters} from "./filters.js";
import {debounce} from "./debounce.js";
import {renderPhotos} from "./render-photos.js";
import {showPopup} from "./show-popup.js";
import {load} from "./load.js";

const successLoadHandler = (photos) => {
  renderPhotos(photos);
  filters.show();
  const debounceRenderPhotos = debounce((images) => renderPhotos(images));
  filters.setHandler(debounceRenderPhotos, photos);
};

const errorLoadHandler = (errorMessage) => {
  showPopup(errorMessage);
};

load.get(successLoadHandler, errorLoadHandler);

const uploadFormChangeHandler = () => {
  form.open();
  form.uploadPhoto();
};

form.setHandler(uploadFormChangeHandler);
