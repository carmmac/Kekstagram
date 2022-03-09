import {createSelector} from "reselect";

const getPhotos = createSelector(
    (state) => state.photos,
    (photos) => photos
);

const getPhoto = createSelector(
    (state) => state.photo,
    (photo) => photo
);

const getPhotosLoadIndicator = createSelector(
    (state) => state.isLoadedIndicator.arePhotosLoaded,
    (arePhotosLoaded) => arePhotosLoaded
);

const getPhotoLoadIndicator = createSelector(
    (state) => state.isLoadedIndicator.isPhotoLoaded,
    (isPhotoLoaded) => isPhotoLoaded
);

const getFilter = createSelector(
    (state) => state.filter,
    (filter) => filter
);

const getEffect = createSelector(
    (state) => state.currentEffect,
    (currentEffect) => currentEffect
);

export {
  getPhotos,
  getPhotosLoadIndicator,
  getPhoto,
  getPhotoLoadIndicator,
  getFilter,
  getEffect,
};
