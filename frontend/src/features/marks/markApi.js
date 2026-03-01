// features/marks/markThunk.js
import {
  fetchMarkStart,
  fetchMarksSuccess,
  fetchMarkFailure,
  fetchSingleMark,
} from "./markSlice";
import { fetchFromApi } from "../../service/api";

// GET all marks
export const getMarks = () => async (dispatch) => {
  try {
    dispatch(fetchMarkStart());
    const data = await fetchFromApi("/academics/marks/");
    dispatch(fetchMarksSuccess(data));
  } catch (error) {
    dispatch(fetchMarkFailure(error.message));
  }
};

// GET mark by ID
export const getMarkById = (id) => async (dispatch) => {
  try {
    dispatch(fetchMarkStart());
    const data = await fetchFromApi(`/marks/${id}/`);
    dispatch(fetchSingleMark(data));
  } catch (error) {
    dispatch(fetchMarkFailure(error.message));
  }
};

// CREATE mark
export const createMark = (markData) => async (dispatch) => {
  try {
    dispatch(fetchMarkStart());
    await fetchFromApi("/academics/marks/", {
      method: "POST",
      body: JSON.stringify(markData),
    });
    dispatch(getMarks()); // refetch
  } catch (error) {
    dispatch(fetchMarkFailure(error.message));
  }
};

// UPDATE mark
export const updateMark = (id, markData) => async (dispatch) => {
  try {
    dispatch(fetchMarkStart());
    await fetchFromApi(`/academics/marks/${id}/`, {
      method: "PUT",
      body: JSON.stringify(markData),
    });
    dispatch(getMarks());
    return { success: true };
  } catch (error) {
    dispatch(fetchMarkFailure(error.message));
    return { success: false };
  }
};

// DELETE mark
export const deleteMark = (id) => async (dispatch) => {
  try {
    dispatch(fetchMarkStart());
    await fetchFromApi(`/academics/marks/${id}/`, {
      method: "DELETE",
    });
    dispatch(getMarks());
  } catch (error) {
    dispatch(fetchMarkFailure(error.message));
  }
};
