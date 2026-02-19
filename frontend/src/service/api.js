const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchFromApi = async (
  endpoint,
  { method = "GET", body = null, auth = true, retry = true } = {}
) => {
  const headers = { "Content-Type": "application/json" };

  let accessToken = localStorage.getItem("accessToken");

  if (auth && accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }

  let response = await fetch(`${BASE_URL}${endpoint}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : null,
  });

  // ✅ SUCCESS
  if (response.ok) {
    return response.json().catch(() => null);
  }

  // 🔁 ACCESS TOKEN EXPIRED → REFRESH
  if (response.status === 401 && auth && retry) {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) {
      forceLogout();
      throw { status: 401 };
    }

    const refreshRes = await fetch(`${BASE_URL}/auth/token/refresh/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh: refreshToken }),
    });

    if (!refreshRes.ok) {
      forceLogout();
      throw { status: 401 };
    }

    const refreshData = await refreshRes.json();

    // 🔐 SAVE NEW TOKENS (VERY IMPORTANT)
    localStorage.setItem("accessToken", refreshData.access);
    if (refreshData.refresh) {
      localStorage.setItem("refreshToken", refreshData.refresh);
    }

    // 🔁 Retry original request ONCE
    return fetchFromApi(endpoint, {
      method,
      body,
      auth,
      retry: false,
    });
  }

  const data = await response.json().catch(() => null);
  throw { status: response.status, data };
};

// 🚪 Centralized logout helper
const forceLogout = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("user");
  window.location.href = "/login"; // or dispatch(logout())
};
