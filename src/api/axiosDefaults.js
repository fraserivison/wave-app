import axios from "axios";

// Base URL for deployed backend
const baseURL = "https://wave-drf-api-1157a4fa181b.herokuapp.com";

// Helper to read cookies
function getCookie(name) {
  const cookieValue = document.cookie
    .split("; ")
    .find((row) => row.startsWith(name + "="));
  return cookieValue ? decodeURIComponent(cookieValue.split("=")[1]) : null;
}

// Axios instance for requests that send data
export const axiosReq = axios.create({
  baseURL: baseURL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Axios instance for responses (could be used for read-only requests)
export const axiosRes = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

// Add CSRF token to axiosReq for unsafe methods
axiosReq.interceptors.request.use((config) => {
  const csrfToken = getCookie("csrftoken");
  if (csrfToken && ["post", "put", "patch", "delete"].includes(config.method)) {
    config.headers["X-CSRFToken"] = csrfToken;
  }
  return config;
});
