export const selectCourseState = (state) => state.course;

export const selectCourses = (state) =>
  state.course.courses;

export const selectSingleCourse = (state) =>
  state.course.course;

export const selectCourseLoading = (state) =>
  state.course.loading;

export const selectCourseError = (state) =>
  state.course.error;
