/** Relative paths — axios baseURL already includes `/backend/api`. */

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "seller/auth/login",
    REGISTER: "seller/auth/register",
    REFRESH_TOKEN: "admin/user/refresh-token",
  },
} as const;

export default API_ENDPOINTS;
