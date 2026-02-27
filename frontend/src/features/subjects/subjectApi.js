import { fetchFromApi } from "../../service/api";
import {
  fetchSubjectStart,
  fetchSingleSubject,
  fetchSubjectFailure,
  fetchSubjectsSuccess,
} from "./subjectSlice";


export const getSubjects = () => async (dispatch) => {
  try {
    dispatch(fetchSubjectStart());
    const data = await fetchFromApi("/academics/subjects/");
    dispatch(fetchSubjectsSuccess(data));
  } catch (error) {
    dispatch(
      fetchSubjectFailure(error?.message || "Failed to fetch subjects")
    );
  }
};


export const getSubjectById = (id) => async (dispatch) => {
  try {
    dispatch(fetchSubjectStart());
    const data = await fetchFromApi(`/academics/subjects/${id}/`);
    dispatch(fetchSingleSubject(data));
  } catch (error) {
    dispatch(
      fetchSubjectFailure(error?.message || "Failed to fetch subject")
    );
  }
};


export const createSubject = (subjectInfo) => async (dispatch) => {
  try {
    dispatch(fetchSubjectStart());

    await fetchFromApi("/academics/subjects/", {
      method: "POST",
      body: subjectInfo,
    });

    dispatch(getSubjects());
  } catch (error) {
    dispatch(
      fetchSubjectFailure(error?.message || "Failed to create subject")
    );
  }
};


export const updateSubject = (id, subjectInfo) => async (dispatch) => {
  try {
    dispatch(fetchSubjectStart());

    await fetchFromApi(`/academics/subjects/${id}/`, {
      method: "PATCH",
      body: subjectInfo,
    });

    dispatch(getSubjects());
  } catch (error) {
    dispatch(
      fetchSubjectFailure(error?.message || "Failed to update subject")
    );
  }
};


export const deleteSubject = (id) => async (dispatch) => {
  try {
    dispatch(fetchSubjectStart());

    await fetchFromApi(`/academics/subjects/${id}/`, {
      method: "DELETE",
    });

    dispatch(getSubjects());
  } catch (error) {
    dispatch(
      fetchSubjectFailure(error?.message || "Failed to delete subject")
    );
  }
};