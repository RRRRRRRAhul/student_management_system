// features/marks/markSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  marks: [],
  loading: false,
  error: null,
  selectedMark: null,
};

const markSlice = createSlice({
  name: "mark",
  initialState,
  reducers: {
    fetchMarkStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchMarksSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.marks = action.payload;
    },
    fetchMarkFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchSingleMark: (state, action) => {
      state.loading = false;
      state.error = null;
      state.selectedMark = action.payload;
    },
    clearSelectedMark: (state) => {
      state.selectedMark = null;
    },
  },
});

export const {
  fetchMarkStart,
  fetchMarksSuccess,
  fetchMarkFailure,
  fetchSingleMark,
  clearSelectedMark,
} = markSlice.actions;

const marksReducer = markSlice.reducer;
export default marksReducer;