// api/authApi.js
import api from "../api/axios";
api.defaults.withCredentials = true;

export const checkAuth = () => {
  return api.get("/api/user/me");
};
