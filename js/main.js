"use strict";

const successLoadHandler = (photos) => {
  window.renderPhotos(photos);
  window.filters.show();
  const debounceRenderPhotos = window.debounce((images) => window.renderPhotos(images));
  window.filters.setHandler(debounceRenderPhotos, photos);
};

const errorLoadHandler = (errorMessage) => {
  window.showPopup(errorMessage);
};

window.load.get(successLoadHandler, errorLoadHandler);

const uploadFormChangeHandler = () => {
  window.form.open();
  window.form.uploadPhoto();
};

window.form.setHandler(uploadFormChangeHandler);
