import {createReducer} from "@reduxjs/toolkit";
import {
  DEFAULT_EFFECT,
  DEFAULT_FILTER,
  DEFAULT_SCALE_VALUE,
} from "../_const";
import {
  clearPhoto,
  effectSelect,
  filterChange,
  getPhoto,
  getPhotosList,
} from "./action";

const initialState = {
  photos: [],
  photo: undefined,
  currentFilter: DEFAULT_FILTER.name, // ???
  currentEffect: DEFAULT_EFFECT,
  currentScale: DEFAULT_SCALE_VALUE,
  isLoadedIndicator: {
    arePhotosLoaded: false,
    isPhotoLoaded: false,
  },
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(getPhotosList, (state, action) => {
      state.photos = action.payload;
      state.isLoadedIndicator.arePhotosLoaded = true;
    })
    .addCase(getPhoto, (state, action) => {
      state.photo = action.payload;
      state.isLoadedIndicator.isPhotoLoaded = true;
    })
    .addCase(clearPhoto, (state) => {
      state.photo = initialState.photo;
      state.isLoadedIndicator.isPhotoLoaded = initialState.isLoadedIndicator.isPhotoLoaded;
    })
    .addCase(filterChange, (state, action) => {
      state.currentFilter = action.payload;
    })
    .addCase(effectSelect, (state, action) => {
      state.currentEffect = action.payload;
    });
});

export default reducer;
