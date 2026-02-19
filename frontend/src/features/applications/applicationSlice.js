import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  applications: [], // admin: list of all applications
  application: null, // student: single application (own)
  loading: false, // API loading state
  error: null, // API errors
};

const applicationSlice = createSlice({
  name: "application",
  initialState,
  reducers: {
    fetchApplicationsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchApplicationsSuccess: (state, action) => {
      state.loading = false;
      state.applications = action.payload;
      state.error = null;
    },
    fetchApplicationsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchSingleApplicationStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchSingleApplicationSuccess: (state, action) => {
      state.loading = false;
      state.application = action.payload;
      state.error = null;
    },
    fetchSingleApplicationFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteApplicationSuccess: (state, action) => {
      state.applications = state.applications.filter(
        (a) => a.id !== action.payload,
      );
      state.application = null;
      state.error = null;
      state.loading = false;
    },
    clearApplicationState: (state) => {
      state.applications = [];
      state.application = null;
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  fetchApplicationsStart,
  fetchApplicationsSuccess,
  fetchApplicationsFailure,
  fetchSingleApplicationStart,
  fetchSingleApplicationSuccess,
  fetchSingleApplicationFailure,
  deleteApplicationSuccess,
} = applicationSlice.actions;
const applicationReducer = applicationSlice.reducer;
export default applicationReducer;
