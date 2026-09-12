import axios from "axios";
import { tokenStorage } from "./storage";
import API_ENDPOINTS from "./API_ENDPOINT";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://e-commerce-backend-y8r8.onrender.com/backend/api";

let refreshInFlight: Promise<{ success: boolean; data: string | null }> | null =
  null;

export function isAccessTokenExpired(token: string, skewSeconds = 30): boolean {
  try {
    const payload = JSON.parse(atob(token.split(".")[1] || "")) as {
      exp?: number;
    };
    if (!payload.exp) return false;
    return payload.exp * 1000 <= Date.now() + skewSeconds * 1000;
  } catch {
    return true;
  }
}

export async function getNewAccessToken(refreshToken: string) {
  if (refreshInFlight) {
    return refreshInFlight;
  }

  refreshInFlight = (async () => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/${API_ENDPOINTS.AUTH.REFRESH_TOKEN}`,
        { refreshToken },
        { headers: { "Content-Type": "application/json" } }
      );
      const parsedResponse = response.data;
      const accessToken =
        parsedResponse?.data?.accessToken || parsedResponse?.data?.token;
      const nextRefreshToken = parsedResponse?.data?.refreshToken;

      if (parsedResponse?.success && accessToken) {
        tokenStorage.setSellerAccessToken(accessToken);
        if (nextRefreshToken) {
          tokenStorage.setSellerRefreshToken(nextRefreshToken);
        }
        return { success: true, data: accessToken as string };
      }

      throw new Error("Refresh token response was invalid");
    } catch {
      tokenStorage.clearSeller();
      return { success: false, data: null };
    } finally {
      refreshInFlight = null;
    }
  })();

  return refreshInFlight;
}

/** Ensure a valid access token exists, refreshing when missing or expired. */
export async function ensureSellerAccessToken(): Promise<string | null> {
  const accessToken = tokenStorage.getSellerAccessToken();
  const refreshToken = tokenStorage.getSellerRefreshToken();

  if (accessToken && !isAccessTokenExpired(accessToken)) {
    return accessToken;
  }

  if (!refreshToken) {
    return null;
  }

  const refreshed = await getNewAccessToken(refreshToken);
  return refreshed.success ? refreshed.data : null;
}
