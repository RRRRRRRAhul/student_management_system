import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  courses: [], // list page (admin + student)
  course: null, // single course (detail / edit)
  loading: false, // API loading state
  error: null, // API errors
};

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    fetchCoursesStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchCoursesSuccess: (state, action) => {
      state.loading = false;
      state.courses = action.payload;
      state.error = null;
    },
    fetchCoursesFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchSingleCourseStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchSingleCourseSuccess: (state, action) => {
      state.loading = false;
      state.course = action.payload;
      state.error = null;
    },
    fetchSingleCourseFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteCourseSuccess: (state, action) => {
      state.courses = state.courses.filter((c) => c.id !== action.payload);
      state.course = null;
      state.error = null;
      state.loading = false;
    },
  },
});

export const {
  fetchCoursesFailure,
  fetchCoursesSuccess,
  fetchSingleCourseFailure,
  fetchSingleCourseStart,
  fetchSingleCourseSuccess,
  deleteCourseSuccess,
  fetchCoursesStart,
} = courseSlice.actions;
const courseReducer = courseSlice.reducer;
export default courseReducer;
