import { fetchFromApi } from "../../service/api";
import {
  fetchApplicationsStart,
  fetchApplicationsSuccess,
  fetchApplicationsFailure,
  fetchSingleApplicationStart,
  fetchSingleApplicationSuccess,
  fetchSingleApplicationFailure,
} from "./applicationSlice";

export const getApplications = () => async (dispatch) => {
    try {
        dispatch(fetchApplicationsStart());

        const data = await fetchFromApi("/student/applications/");

        dispatch(fetchApplicationsSuccess(data));
    } catch (error) {
        dispatch(
            fetchApplicationsFailure(
                error.data?.detail || "Failed to fetch applications",
            ),
        );
    }
};


export const createApplication = (applicationInfo) => async (dispatch) => {
    try {
        dispatch(fetchSingleApplicationStart());
        const data = await fetchFromApi("/student/applications/", {
            method: "POST",
            body: applicationInfo,
        });
        dispatch(fetchSingleApplicationSuccess(data));
    } catch (error) {
        dispatch(
            fetchSingleApplicationFailure(
                error.data?.detail || "Failed to create application",
            ),
        );
    }
};


export const processApplication = (id, payload) => async (dispatch) => {
  try {
    dispatch(fetchSingleApplicationStart());

    await fetchFromApi(`/student/applications/${id}/approve/`, {
      method: "POST",
      body: payload, // { choices: "approve/reject", remarks: "..." }
    });

    dispatch(getApplications()); // refresh admin list
  } catch (error) {
    dispatch(
      fetchSingleApplicationFailure(
        error.data?.detail || "Failed to approve application"
      )
    );
  }
};
