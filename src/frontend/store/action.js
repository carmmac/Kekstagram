import {createAction} from "@reduxjs/toolkit";

const ActionType = {
  GET_PHOTOS_LIST: `main/getPhotosList`,
  GET_PHOTO: `main/getPhoto`,
  CLEAR_PHOTO: `main/clearPhoto`,
  FILTER_CHANGE: `main/filterChange`,
  EFFECT_SELECT: `upload/effectSelect`,
  SCALE_INCREASE: `upload/scaleIncrease`,
  SCALE_DECREASE: `upload/scaleDecrease`,
};

const getPhotosList = createAction(ActionType.GET_PHOTOS_LIST, (photos) => ({payload: photos}));

const getPhoto = createAction(ActionType.GET_PHOTO, (photo) => ({payload: photo}));

const clearPhoto = createAction(ActionType.CLEAR_PHOTO);

const filterChange = createAction(ActionType.FILTER_CHANGE, (filter) => ({payload: filter}));

const effectSelect = createAction(ActionType.EFFECT_SELECT, (selectedEffect) => ({payload: selectedEffect}));

export {
  getPhotosList,
  getPhoto,
  clearPhoto,
  filterChange,
  effectSelect,
};
