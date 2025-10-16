import axios from "axios";

// Set the base URL of your API
axios.defaults.baseURL = "https://wave-drf-api-1157a4fa181b.herokuapp.com";

// Ensure cookies are sent with every request (cross-site)
axios.defaults.withCredentials = true;

// Ensure POST requests send correct content type
axios.defaults.headers.post["Content-Type"] = "application/json"; // Changed from multipart/form-data

// Optional: create instances if you want separate configurations
export const axiosReq = axios.create({
  withCredentials: true,
  baseURL: "https://wave-drf-api-1157a4fa181b.herokuapp.com",
});

export const axiosRes = axios.create({
  withCredentials: true,
  baseURL: "https://wave-drf-api-1157a4fa181b.herokuapp.com",
});
