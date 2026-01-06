// api/authApi.js
import axios from "axios";

axios.defaults.withCredentials = true;

export const checkAuth = () => {
  return axios.get("/api/user/me");
};
