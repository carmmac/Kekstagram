"use strict";

window.load.get(successLoadHandler, errorLoadHandler);

function successLoadHandler(photos) {
  window.renderPhotos(photos);
  window.filters.show();
  const debounceRenderPhotos = window.debounce((images) => window.renderPhotos(images));
  window.filters.setHandler(debounceRenderPhotos, photos);
}

function errorLoadHandler(errorMessage) {
  window.showPopup(errorMessage);
}

window.form.setHandler(uploadFormChangeHandler);

function uploadFormChangeHandler() {
  window.form.open();
}
