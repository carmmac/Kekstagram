import {createAction} from "@reduxjs/toolkit";

const ActionType = {
  GET_PHOTOS_LIST: `main/getPhotosList`,
  FILTER_CHANGE: `main/filterChange`,
  EFFECT_SELECT: `upload/effectSelect`,
  SCALE_INCREASE: `upload/scaleIncrease`,
  SCALE_DECREASE: `upload/scaleDecrease`,
};

const getPhotosList = createAction(ActionType.GET_PHOTOS_LIST, (photos) => ({payload: photos}));

const filterChange = createAction(ActionType.FILTER_CHANGE, (filter) => ({payload: filter}));

const effectSelect = createAction(ActionType.EFFECT_SELECT, (selectedEffect) => ({payload: selectedEffect}));

export {
  getPhotosList,
  filterChange,
  effectSelect,
};
