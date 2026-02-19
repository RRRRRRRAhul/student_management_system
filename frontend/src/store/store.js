import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import studentReducer from "../features/students/studentSlice";
import courseReducer from "../features/courses/courseSlice";
import applicationReducer from "../features/applications/applicationSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    students: studentReducer,
    course: courseReducer,
    application: applicationReducer,
  },
});

export default store;