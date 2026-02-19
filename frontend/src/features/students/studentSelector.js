// base selector
export const selectStudentState = (state) => state.students;

// list (admin can access only)
export const selectStudents = (state) =>
  state.students.students;

// single student (for profile / edit)
export const selectStudent = (state) =>
  state.students.student;

// loading state
export const selectStudentLoading = (state) =>
  state.students.loading;

// error state
export const selectStudentError = (state) =>
  state.students.error;
