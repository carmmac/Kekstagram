import {createReducer} from "@reduxjs/toolkit";
import {
  DEFAULT_EFFECT,
  DEFAULT_FILTER,
  DEFAULT_SCALE_VALUE,
} from "../_const";
import {
  effectSelect,
  filterChange,
  getPhotosList,
} from "./action";

const initialState = {
  photos: [],
  currentFilter: DEFAULT_FILTER.name, // ???
  currentEffect: DEFAULT_EFFECT,
  currentScale: DEFAULT_SCALE_VALUE,
  isLoadedIndicator: {
    arePhotosLoaded: false,
  },
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(getPhotosList, (state, action) => {
      state.photos = action.payload;
      state.isLoadedIndicator.arePhotosLoaded = true;
    })
    .addCase(filterChange, (state, action) => {
      state.currentFilter = action.payload;
    })
    .addCase(effectSelect, (state, action) => {
      state.currentEffect = action.payload;
    });
});

export default reducer;
