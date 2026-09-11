/** Relative paths — axios baseURL already includes `/backend/api`. */

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "seller/auth/login",
    REGISTER: "seller/auth/register",
    CHECK_PHONE: "seller/auth/check-phone",
    CHECK_EMAIL: "seller/auth/check-email",
    REFRESH_TOKEN: "admin/user/refresh-token",
  },
  PROFILE: {
    GET: "seller/profile",
    UPDATE: "seller/profile",
  },
} as const;

export default API_ENDPOINTS;
