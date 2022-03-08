import {createSelector} from "reselect";

const getPhotos = createSelector(
    (state) => state.photos,
    (photos) => photos
);

const getPhotosLoadIndicator = createSelector(
    (state) => state.isLoadedIndicator.arePhotosLoaded,
    (arePhotosLoaded) => arePhotosLoaded
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
  getFilter,
  getEffect,
};
