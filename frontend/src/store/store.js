import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import studentReducer from "../features/students/studentSlice";
import courseReducer from "../features/courses/courseSlice";
import applicationReducer from "../features/applications/applicationSlice";
import subjectReducer from "../features/subjects/subjectSlice";
import examReducer from "../features/exams/examSlice";
import marksReducer from "../features/marks/markSlice";


const store = configureStore({
  reducer: {
    auth: authReducer,
    students: studentReducer,
    course: courseReducer,
    application: applicationReducer,
    subject: subjectReducer,
    exam: examReducer,
    mark: marksReducer
  },
});

export default store;