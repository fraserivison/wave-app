import axios from "axios";

axios.defaults.baseURL = "https://wave-django-backend-69f2b8961b57.herokuapp.com/";
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.withCredentials = true;

console.log("Axios defaults configured!");