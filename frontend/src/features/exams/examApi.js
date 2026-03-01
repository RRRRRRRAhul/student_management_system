import { fetchFromApi } from "../../service/api";
import {
  fetchExamStart,
  fetchExamSuccess,
  fetchExamFailure,
  fetchSingleExam,
} from "./examSlice";

export const getExams = () => async (dispatch) => {
  try {
    dispatch(fetchExamStart());
    const data = await fetchFromApi("/academics/exams/");
    dispatch(fetchExamSuccess(data));
  } catch (error) {
    dispatch(
      fetchExamFailure(error?.message || "Failed to fetch exams")
    );
  }
};


export const getExamById = (id) => async (dispatch) => {
  try {
    dispatch(fetchExamStart());
    const data = await fetchFromApi(`/academics/exams/${id}/`);
    dispatch(fetchSingleExam(data));
  } catch (error) {
    dispatch(
      fetchExamFailure(error?.message || "Failed to fetch exam")
    );
  }
};


export const createExam = (examInfo) => async (dispatch) => {
  try {
    dispatch(fetchExamStart());

    await fetchFromApi("/academics/exams/", {
      method: "POST",
      body: examInfo,
    });

    dispatch(getExams());
  } catch (error) {
    dispatch(
      fetchExamFailure(error?.message || "Failed to create exam")
    );
  }
};


export const updateExam = (id, examInfo) => async (dispatch) => {
  try {
    dispatch(fetchExamStart());

    const response = await fetchFromApi(`/academics/exams/${id}/`, {
      method: "PATCH",
      body: examInfo,
    });

    dispatch(getExams());

    return { success: true, data: response };
  } catch (error) {
    dispatch(
      fetchExamFailure(error?.message || "Failed to update exam")
    );
    return { success: false, error };
  }
};


export const deleteExam = (id) => async (dispatch) => {
  try {
    dispatch(fetchExamStart());

    await fetchFromApi(`/academics/exams/${id}/`, {
      method: "DELETE",
    });

    dispatch(getExams());

    return { success: true };
  } catch (error) {
    dispatch(
      fetchExamFailure(error?.message || "Failed to delete exam")
    );
    return { success: false};
  }
};