import axios from "axios";

/**
 * Axios instance
 * 
 * Centralized API configuration for the app
 * 
 * Features:
 * - Base URL from environment variables
 * - Sends cookies automatically (JWT auth)
 */
const api = axios.create({
  
  // Backend API base URL (from .env file)
  baseURL: import.meta.env.VITE_API_DOMAIN,

  // Required for sending cookies (JWT stored in cookies)
  withCredentials: true,
});

export default api;