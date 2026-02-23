import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  exams: [],
  loading: false,
  error: null,
  selectedExam: null,
};

const examSlice = createSlice({
  name: "exam",
  initialState,
  reducers: {
    fetchExamStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchExamSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.exams = action.payload;
    },
    fetchExamFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchSingleExam: (state, action) => {
      state.loading = false;
      state.error = null;
      state.selectedExam = action.payload;
    },
    clearExam: (state, action) => {
      state.exams = state.exams.filter((e) => e.id != action.payload); // action payload is a id
      state.selectedExam = null;
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  fetchExamFailure,
  fetchExamStart,
  fetchExamSuccess,
  fetchSingleExam,
  clearExam,
} = examSlice.actions;
const examReducer = examSlice.reducer;
export default examReducer