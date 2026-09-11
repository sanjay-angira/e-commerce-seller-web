import Cookies from "js-cookie";

const AUTH_COOKIE_OPTIONS = { expires: 7, path: "/", sameSite: "lax" as const };

export const STORAGE_KEYS = {
  sellerAccessToken: "seller_access_token",
  sellerRefreshToken: "seller_refresh_token",
  sellerUser: "seller_user",
  sellerSession: "seller_session",
  sellerProfileComplete: "seller_profile_complete",
} as const;

function isBrowser() {
  return typeof window !== "undefined";
}

function setCookie(key: string, value: string) {
  if (!isBrowser()) return;
  Cookies.set(key, value, AUTH_COOKIE_OPTIONS);
}

function removeCookie(key: string) {
  if (!isBrowser()) return;
  Cookies.remove(key, { path: "/" });
}

export function getItem(key: string): string | null {
  if (!isBrowser()) return null;
  return localStorage.getItem(key);
}

export function setItem(key: string, value: string) {
  if (!isBrowser()) return;
  localStorage.setItem(key, value);
}

export function removeItem(key: string) {
  if (!isBrowser()) return;
  localStorage.removeItem(key);
}

export function getJson<T>(key: string): T | null {
  const raw = getItem(key);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export function setJson<T>(key: string, value: T) {
  setItem(key, JSON.stringify(value));
}

export const tokenStorage = {
  getSellerAccessToken: () => Cookies.get(STORAGE_KEYS.sellerAccessToken) ?? null,
  setSellerAccessToken: (token: string) => {
    setCookie(STORAGE_KEYS.sellerAccessToken, token);
    setCookie(STORAGE_KEYS.sellerSession, "1");
  },
  setSellerProfileComplete: (complete: boolean) => {
    setCookie(STORAGE_KEYS.sellerProfileComplete, complete ? "1" : "0");
  },
  getSellerRefreshToken: () =>
    Cookies.get(STORAGE_KEYS.sellerRefreshToken) ?? null,
  setSellerRefreshToken: (token: string) => {
    setCookie(STORAGE_KEYS.sellerRefreshToken, token);
  },
  clearSeller: () => {
    removeItem(STORAGE_KEYS.sellerUser);
    removeCookie(STORAGE_KEYS.sellerAccessToken);
    removeCookie(STORAGE_KEYS.sellerRefreshToken);
    removeCookie(STORAGE_KEYS.sellerSession);
    removeCookie(STORAGE_KEYS.sellerProfileComplete);
  },
  hasSellerSession: () => tokenStorage.getSellerAccessToken() !== null,
};
