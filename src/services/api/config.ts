import Cookies from "js-cookie";
import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios";
import { STORAGE_KEYS } from "./storage";
import { ensureSellerAccessToken, getNewAccessToken } from "./jwt";
import { tokenStorage } from "./storage";

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://e-commerce-backend-y8r8.onrender.com/backend/api";

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

type RetryConfig = InternalAxiosRequestConfig & {
  skipAuth?: boolean;
  _retry?: boolean;
};

axiosInstance.interceptors.request.use(
  async (req) => {
    const config = req as RetryConfig;
    if (config.skipAuth) {
      return req;
    }

    const accessToken = await ensureSellerAccessToken();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const config = error.config as RetryConfig | undefined;
    const status = error.response?.status;

    if (!config || config.skipAuth || config._retry || status !== 401) {
      return Promise.reject(error);
    }

    const refreshToken =
      Cookies.get(STORAGE_KEYS.sellerRefreshToken) ||
      tokenStorage.getSellerRefreshToken();

    if (!refreshToken) {
      tokenStorage.clearSeller();
      return Promise.reject(error);
    }

    config._retry = true;
    const refreshed = await getNewAccessToken(refreshToken);
    if (!refreshed.success || !refreshed.data) {
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
      return Promise.reject(error);
    }

    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${refreshed.data}`;
    return axiosInstance.request(config);
  }
);
