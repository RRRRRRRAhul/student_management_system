export const selectExams = (state) => state.exam.exams;

export const selectSelectedExam = (state) =>
  state.exam.selectedExam;

export const selectExamLoading = (state) => state.exam.loading;

export const selectExamError = (state) => state.exam.error;