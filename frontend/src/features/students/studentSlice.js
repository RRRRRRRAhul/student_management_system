import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  students: [],        // for admin (list page)
  student: null,       // single student (profile / edit)
  loading: false,      // global loading for student ops
  error: null,         // API errors
};

const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    fetchStudentsStart: (state) => {
        state.loading = true;
        state.error = null;
    },
    fetchStudentsSuccess: (state, action) => {
        state.loading = false;
        state.students = action.payload;
        state.error = null;
    },
    fetchStudentsFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    fetchSingleStudentStart: (state) => {
        state.loading = true;
        state.error = null;
    },
    fetchSingleStudentSuccess: (state, action) => {
        state.loading = false;
        state.student = action.payload;
        state.error = null;
    },
    fetchSingleStudentFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    deleteStudentSuccess: (state) => {
        state.students = state.students.filter(s => s.id !== state.student.id);
        state.student = null;
        state.error = null;
        state.loading = false;
    },
  }
});

export const {
    fetchSingleStudentStart,
    fetchSingleStudentSuccess,
    fetchSingleStudentFailure,
    fetchStudentsStart,
    fetchStudentsSuccess,
    fetchStudentsFailure,
    deleteStudentSuccess
} = studentSlice.actions;

const studentReducer = studentSlice.reducer;
export default studentReducer;