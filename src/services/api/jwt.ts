import axios from "axios";
import { tokenStorage } from "./storage";
import { API_BASE_URL } from "./config";
import API_ENDPOINTS from "./API_ENDPOINT";

export async function getNewAccessToken(refreshToken: string) {
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
  }
}
