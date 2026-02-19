import { fetchFromApi } from "../../service/api";
import {
  fetchSingleStudentFailure,
  fetchSingleStudentStart,
  fetchSingleStudentSuccess,
  fetchStudentsFailure,
  fetchStudentsStart,
  fetchStudentsSuccess,
  deleteStudentSuccess,
} from "./studentSlice";

export const getStudents = () => async (dispatch) => {
  try {
    dispatch(fetchStudentsStart());

    const data = await fetchFromApi("/student/");

    dispatch(fetchStudentsSuccess(data));
  } catch (error) {
    dispatch(
      fetchStudentsFailure(error.data?.detail || "Failed to fetch students"),
    );
  }
};

export const createStudent = (studentInfo) => async (dispatch) => {
  try {
    dispatch(fetchSingleStudentStart());

    const data = await fetchFromApi("/student/", {
      method: "POST",
      body: studentInfo,
    });

    dispatch(fetchSingleStudentSuccess(data));
  } catch (error) {
    dispatch(
      fetchSingleStudentFailure(
        error.data?.detail || "Failed to create student",
      ),
    );
  }
};

export const getStudentById = (id) => async (dispatch) => {
  try {
    dispatch(fetchSingleStudentStart());

    const data = await fetchFromApi(`/student/${id}/`);
    dispatch(fetchSingleStudentSuccess(data));
  } catch (error) {
    dispatch(
      fetchSingleStudentFailure(
        error.data?.detail || "Failed to fetch student",
      ),
    );
  }
};

export const updateStudent = ({id, studentInfo}) => async (dispatch) => {
  try {
    dispatch(fetchSingleStudentStart());

    const data = await fetchFromApi(`/student/${id}/`, {
      method: "PATCH",
      body: studentInfo,
    });

    dispatch(fetchSingleStudentSuccess(data));
  } catch (error) {
    dispatch(
      fetchSingleStudentFailure(
        error.data?.detail || "Failed to update student",
      ),
    );
  }
};

export const deleteStudent = (id) => async (dispatch) => {
  try {
    await fetchFromApi(`/student/${id}/`, {
      method: "DELETE",
    });
    dispatch(deleteStudentSuccess(id));
  } catch (error) {
    dispatch(
      fetchSingleStudentFailure(
        error.data?.detail || "Failed to delete student",
      ),
    );
  }
};
