import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  subjects: [],
  loading: false,
  error: null,
  selectedSubject: null,
};

const subjectSlice = createSlice({
  name: "subject",
  initialState,
  reducers: {
    fetchSubjectStart: (state) => {
      state.error = null;
      state.loading = true;
    },

    fetchSubjectsSuccess: (state, action) => {
      state.error = null;
      state.loading = false;
      state.subjects = action.payload;
    },

    fetchSubjectFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    fetchSingleSubject: (state, action) => {
      state.error = null;
      state.loading = false;
      state.selectedSubject = action.payload;
    },

    clearSubject: (state, action) => {
      state.subjects = state.subjects.filter((s) => s.id !== action.payload);
      state.selectedSubject = null;
      state.error = null;
      state.loading = false;
    },
  },
});

export const {
  fetchSingleSubject,
  fetchSubjectFailure,
  fetchSubjectStart,
  fetchSubjectsSuccess,
  clearSubject,
} = subjectSlice.actions;

export default subjectSlice.reducer;
