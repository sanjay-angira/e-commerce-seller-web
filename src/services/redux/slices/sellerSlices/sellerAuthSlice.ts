import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import {
  API_ENDPOINTS,
  postData,
  setJson,
  STORAGE_KEYS,
  tokenStorage,
} from "@/services/api";
import type { ApiErrorResponse } from "@/services/api/errors";
import type { Seller } from "@/types/user";

export interface SellerAuthState {
  seller: Seller | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

type LoginPayload = {
  email: string;
  password: string;
};

type LoginResult = {
  seller: Seller;
  accessToken: string;
};

type SellerLoginResponse = {
  success: boolean;
  message?: string;
  data?: {
    user: {
      id: number;
      email: string;
      firstName?: string;
      lastName?: string;
      profileImage?: string;
    };
    seller?: { shopName?: string };
    accessToken: string;
    refreshToken: string;
  };
};

const initialState: SellerAuthState = {
  seller: null,
  accessToken: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

function mapSellerUser(
  user: NonNullable<SellerLoginResponse["data"]>["user"],
  shopName?: string
): Seller {
  return {
    id: String(user.id),
    email: user.email,
    name: `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim() || user.email,
    shopName,
    avatar: user.profileImage ?? undefined,
  };
}

function getErrorMessage(error: unknown): string {
  if (error && typeof error === "object" && "message" in error) {
    const message = (error as ApiErrorResponse).message;
    if (message) return message;
  }
  if (error instanceof Error && error.message) {
    return error.message;
  }
  return "Login failed. Please check your credentials.";
}

export const loginSeller = createAsyncThunk<
  LoginResult,
  LoginPayload,
  { rejectValue: string }
>("sellerAuth/login", async ({ email, password }, { rejectWithValue }) => {
  try {
    const response = (await postData(
      API_ENDPOINTS.AUTH.LOGIN,
      { email, password },
      { auth: false }
    )) as SellerLoginResponse;

    if (!response?.success || !response.data) {
      return rejectWithValue(response?.message ?? "Invalid email or password");
    }

    const { user, seller, accessToken, refreshToken } = response.data;
    if (!accessToken || !refreshToken) {
      return rejectWithValue("Login response did not include tokens");
    }

    const mapped = mapSellerUser(user, seller?.shopName);
    tokenStorage.setSellerAccessToken(accessToken);
    tokenStorage.setSellerRefreshToken(refreshToken);
    setJson(STORAGE_KEYS.sellerUser, mapped);

    return { seller: mapped, accessToken };
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

export const logoutSeller = createAsyncThunk("sellerAuth/logout", async () => {
  tokenStorage.clearSeller();
});

const sellerAuthSlice = createSlice({
  name: "sellerAuth",
  initialState,
  reducers: {
    setSellerCredentials(
      state,
      action: PayloadAction<{ seller: Seller; accessToken: string }>
    ) {
      state.seller = action.payload.seller;
      state.accessToken = action.payload.accessToken;
      state.isAuthenticated = true;
      state.isLoading = false;
      state.error = null;
    },
    clearSellerAuth(state) {
      state.seller = null;
      state.accessToken = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginSeller.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginSeller.fulfilled, (state, action) => {
        state.seller = action.payload.seller;
        state.accessToken = action.payload.accessToken;
        state.isAuthenticated = true;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(loginSeller.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.seller = null;
        state.accessToken = null;
        state.error = action.payload ?? "Login failed";
      })
      .addCase(logoutSeller.fulfilled, (state) => {
        state.seller = null;
        state.accessToken = null;
        state.isAuthenticated = false;
        state.isLoading = false;
        state.error = null;
      });
  },
});

export const { setSellerCredentials, clearSellerAuth } = sellerAuthSlice.actions;

export default sellerAuthSlice.reducer;
