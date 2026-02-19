export const selectApplications = (state) =>
  state.application.applications;

export const selectApplication = (state) =>
  state.application.application;

export const selectApplicationLoading = (state) =>
  state.application.loading;

export const selectApplicationError = (state) =>
  state.application.error;
