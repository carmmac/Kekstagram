import {getPhotosList} from "./action";

const fetchPhotosList = () => (next, _getState, api) => {
  api.getPhotos().then((photos) => next(getPhotosList(photos)));
};

export {fetchPhotosList};
