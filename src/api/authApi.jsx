/**
 * Auth API utility
 * 
 * Handles authentication-related API calls
 */

import api from "../api/axios";

// Ensure cookies (JWT token) are sent with every request
api.defaults.withCredentials = true;

/**
 * Check if user is authenticated
 * 
 * Calls:
 * GET /api/user/me
 * 
 * Returns:
 * - user data if logged in
 * - error if not authenticated
 */
export const checkAuth = () => {
  return api.get("/api/user/me");
};