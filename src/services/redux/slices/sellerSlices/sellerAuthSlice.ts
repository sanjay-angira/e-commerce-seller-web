import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import {
  API_ENDPOINTS,
  postData,
  putData,
  setJson,
  STORAGE_KEYS,
  tokenStorage,
} from "@/services/api";
import type { ApiErrorResponse } from "@/services/api/errors";
import {
  isSellerProfileComplete,
  type Seller,
} from "@/types/user";

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
      firstName?: string | null;
      lastName?: string | null;
      profileImage?: string | null;
    };
    seller?: {
      shopName?: string | null;
      firstName?: string | null;
      lastName?: string | null;
    };
    accessToken: string;
    refreshToken: string;
  };
};

export type CompleteSellerProfilePayload = {
  firstName: string;
  lastName: string;
  displayName: string;
  shopName: string;
  gstNumber?: string;
  panNumber?: string;
};

type SellerProfileResponse = {
  success: boolean;
  message?: string;
  data?: {
    sellerProfile?: {
      firstName?: string | null;
      lastName?: string | null;
      displayName?: string | null;
      shopName?: string | null;
      profileImage?: string | null;
    };
  };
};

const initialState: SellerAuthState = {
  seller: null,
  accessToken: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

function persistSeller(seller: Seller) {
  setJson(STORAGE_KEYS.sellerUser, seller);
  tokenStorage.setSellerProfileComplete(isSellerProfileComplete(seller));
}

type LoginUser = {
  id: number;
  email: string;
  firstName?: string | null;
  lastName?: string | null;
  profileImage?: string | null;
};

type LoginSeller = {
  shopName?: string | null;
  firstName?: string | null;
  lastName?: string | null;
};

export function mapSellerUser(user: LoginUser, seller?: LoginSeller): Seller {
  const firstName = (seller?.firstName || user.firstName || "").trim();
  const lastName = (seller?.lastName || user.lastName || "").trim();
  return {
    id: String(user.id),
    email: user.email,
    firstName,
    lastName,
    name: `${firstName} ${lastName}`.trim() || user.email,
    shopName: seller?.shopName?.trim() || undefined,
    avatar: user.profileImage ?? undefined,
  };
}

function getErrorMessage(error: unknown, fallback: string) {
  if (error && typeof error === "object" && "message" in error) {
    const message = (error as ApiErrorResponse).message;
    if (message) return message;
  }
  if (error instanceof Error && error.message) {
    return error.message;
  }
  return fallback;
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

    const mapped = mapSellerUser(user, seller);
    tokenStorage.setSellerAccessToken(accessToken);
    tokenStorage.setSellerRefreshToken(refreshToken);
    persistSeller(mapped);

    return { seller: mapped, accessToken };
  } catch (error) {
    return rejectWithValue(getErrorMessage(error, "Login failed. Please check your credentials."));
  }
});

export const completeSellerProfile = createAsyncThunk<
  Seller,
  CompleteSellerProfilePayload,
  { state: { sellerAuth: SellerAuthState }; rejectValue: string }
>("sellerAuth/completeProfile", async (payload, { getState, rejectWithValue }) => {
  const current = getState().sellerAuth.seller;
  if (!current) {
    return rejectWithValue("Please login again to complete your profile");
  }

  try {
    const response = (await putData(API_ENDPOINTS.PROFILE.UPDATE, {
      firstName: payload.firstName,
      lastName: payload.lastName,
      displayName: payload.displayName,
      shopName: payload.shopName,
      gstNumber: payload.gstNumber || undefined,
      panNumber: payload.panNumber || undefined,
    })) as SellerProfileResponse;

    if (!response?.success) {
      return rejectWithValue(response?.message ?? "Could not save your profile");
    }

    const profile = response.data?.sellerProfile;
    const mapped: Seller = {
      ...current,
      firstName: profile?.firstName?.trim() || payload.firstName,
      lastName: profile?.lastName?.trim() || payload.lastName,
      shopName: profile?.shopName?.trim() || payload.shopName,
      name:
        `${profile?.firstName || payload.firstName} ${profile?.lastName || payload.lastName}`.trim() ||
        current.email,
      avatar: profile?.profileImage ?? current.avatar,
    };
    persistSeller(mapped);
    return mapped;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error, "Could not save your profile"));
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
      .addCase(completeSellerProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(completeSellerProfile.fulfilled, (state, action) => {
        state.seller = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(completeSellerProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? "Could not save your profile";
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
