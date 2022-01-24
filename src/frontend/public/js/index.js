import {getAPI} from './api';
import {form} from './form';
import {renderPhotos} from './render-photos';
import {filters} from './filters';
import {debounce} from './debounce';
import {showPopup} from './show-popup';

const api = getAPI();

const uploadFormChangeHandler = () => {
  form.open();
  form.uploadPhoto();
};

const successLoadHandler = (photos) => {
  renderPhotos(photos);
  filters.show();
  const debounceRenderPhotos = debounce((images) => renderPhotos(images));
  filters.setHandler(debounceRenderPhotos, photos);
};

window.onload = async () => {
  try {
    const photos = await api.getPhotos();
    successLoadHandler(photos);
  } catch (error) {
    showPopup(error.message);
  }
  form.setHandler(uploadFormChangeHandler);
};
