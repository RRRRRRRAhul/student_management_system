import { fetchFromApi } from "../../service/api";
import {
  fetchCoursesStart,
  fetchCoursesSuccess,
  fetchCoursesFailure,
  fetchSingleCourseStart,
  fetchSingleCourseSuccess,
  fetchSingleCourseFailure,
  deleteCourseSuccess,
} from "./courseSlice";

export const getCourses = () => async (dispatch) => {
  try {
    dispatch(fetchCoursesStart());
    const data = await fetchFromApi("/course/");
    dispatch(fetchCoursesSuccess(data));
  } catch (error) {
    dispatch(
      fetchCoursesFailure(error.data?.detail || "Failed to fetch courses"),
    );
  }
};

export const getCourseById = (id) => async (dispatch) => {
  try {
    dispatch(fetchSingleCourseStart());
    const data = await fetchFromApi(`/course/${id}/`);
    dispatch(fetchSingleCourseSuccess(data));
  } catch (error) {
    dispatch(
      fetchSingleCourseFailure(error.data?.detail || "Failed to fetch course"),
    );
  }
};

export const createCourse = (courseInfo) => async (dispatch) => {
  try {
    dispatch(fetchSingleCourseStart());
    const data = await fetchFromApi("/course/", {
      method: "POST",
      body: courseInfo,
    });
    dispatch(fetchSingleCourseSuccess(data));
  } catch (error) {
    dispatch(
      fetchSingleCourseFailure(error.data?.detail || "Failed to create course"),
    );
  }
};

export const updateCourse = (id, courseInfo) => async (dispatch) => {
  try {
    dispatch(fetchSingleCourseStart());
    const data = await fetchFromApi(`/course/${id}/`, {
      method: "PATCH",
      body: courseInfo,
    });
    dispatch(fetchSingleCourseSuccess(data));
  } catch (error) {
    dispatch(
      fetchSingleCourseFailure(error.data?.detail || "Failed to update course"),
    );
  }
};

export const deleteCourse = (id) => async (dispatch) => {
  try {
    await fetchFromApi(`/course/${id}/`, {
      method: "DELETE",
    });
    dispatch(deleteCourseSuccess(id));
  } catch (error) {
    dispatch(
      fetchSingleCourseFailure(error.data?.detail || "Failed to delete course"),
    );
  }
};
