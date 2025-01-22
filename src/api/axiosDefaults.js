import axios from "axios";

axios.defaults.baseURL = "https://wave-drf-api-1157a4fa181b.herokuapp.com";
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.withCredentials = true;

export const axiosReq = axios.create();
export const axiosRes = axios.create();
