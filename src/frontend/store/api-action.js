import {getPhoto, getPhotosList} from "./action";

const fetchPhotosList = () => (next, _getState, api) => {
  api.getPhotos().then((photos) => next(getPhotosList(photos)));
};

const fetchPhoto = (id) => (next, _getState, api) => {
  api.getPhoto(id).then((photo) => next(getPhoto(photo)));
};

export {fetchPhotosList, fetchPhoto};
