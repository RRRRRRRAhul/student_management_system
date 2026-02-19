import { fetchFromApi } from "../../service/api";
import { authSuccess, authFailure, authStart, logout } from "./authSlice";
import { authInit } from "./authSlice";

export const loginUser = (credentials) => async (dispatch) => {
  try {
    dispatch(authStart());

    const data = await fetchFromApi("/auth/login/", {
      method: "POST",
      body: credentials,
      auth: false,
    });

    dispatch(
      authSuccess({
        user: data.user,
        accessToken: data.tokens.access,
        refreshToken: data.tokens.refresh,
      })
    );
  } catch (error) {
    dispatch(authFailure(error.data?.detail || "Login failed"));
  }
};

export const registerUser = (userInfo) => async (dispatch) => {
  try {
    dispatch(authStart());

    const data = await fetchFromApi("/auth/register/", {
      method: "POST",
      body: userInfo,
      auth: false,
    });

    dispatch(
      authSuccess({
        user: data.user,
        accessToken: data.tokens.access,
        refreshToken: data.tokens.refresh,
      })
    );
  } catch (error) {
    dispatch(authFailure(JSON.stringify(error.data)));
  }
};

export const logoutUser = () => async (dispatch) => {
  try {
    const refreshToken = localStorage.getItem("refreshToken");

    if (refreshToken) {
      const data = await fetchFromApi("/auth/logout/", {
        method: "POST",
        body: { refresh: refreshToken },
      });
    }

    dispatch(logout());
  } catch (error) {
    // Even if logout API fails, proceed to clear local state or forced logout
    dispatch(logout());
  }
};

export const initializeAuth = () => async (dispatch) => {
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) return;

  try {
    const user = await fetchFromApi("/auth/user/");

    dispatch(
      authInit({
        user,
        accessToken,
      })
    );
  } catch (error) {
    dispatch(logout());
  }
};
