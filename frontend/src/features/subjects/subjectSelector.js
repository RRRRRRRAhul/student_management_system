export const selectSubjects = (state) => state.subject.subjects;

export const selectSelectedSubject = (state) =>
  state.subject.selectedSubject;

export const selectSubjectLoading = (state) => state.subject.loading;

export const selectSubjectError = (state) => state.subject.error;