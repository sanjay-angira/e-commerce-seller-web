import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { API_ENDPOINTS, postData } from "@/services/api";
import type { ApiErrorResponse } from "@/services/api/errors";

export type SignupStep = 1 | 2 | 3 | 4;

export type SellerSignupState = {
  step: SignupStep;
  otpSent: boolean;
  phone: string;
  otp: string;
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  shopName: string;
  isLoading: boolean;
  error: string | null;
  successMessage: string | null;
};

const initialState: SellerSignupState = {
  step: 1,
  otpSent: false,
  phone: "",
  otp: "",
  email: "",
  password: "",
  confirmPassword: "",
  firstName: "",
  lastName: "",
  shopName: "",
  isLoading: false,
  error: null,
  successMessage: null,
};

function getErrorMessage(error: unknown, fallback: string) {
  if (error && typeof error === "object" && "message" in error) {
    const message = (error as ApiErrorResponse).message;
    if (message) return message;
  }
  if (error instanceof Error && error.message) return error.message;
  return fallback;
}

export const registerSeller = createAsyncThunk<
  string,
  void,
  { state: { sellerSignup: SellerSignupState }; rejectValue: string }
>("sellerSignup/register", async (_void, { getState, rejectWithValue }) => {
  const form = getState().sellerSignup;
  try {
    const response = await postData(
      API_ENDPOINTS.AUTH.REGISTER,
      {
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        email: form.email.trim(),
        password: form.password,
        shopName: form.shopName.trim(),
        phone: form.phone.replace(/\s/g, ""),
      },
      { auth: false }
    );
    if (!response?.success) {
      return rejectWithValue(response?.message ?? "Registration failed");
    }
    return String(response.message ?? "Seller registered. Waiting for admin approval.");
  } catch (error) {
    return rejectWithValue(getErrorMessage(error, "Registration failed"));
  }
});

const sellerSignupSlice = createSlice({
  name: "sellerSignup",
  initialState,
  reducers: {
    updateSignupField(
      state,
      action: PayloadAction<{
        field: keyof Omit<
          SellerSignupState,
          "step" | "otpSent" | "isLoading" | "error" | "successMessage"
        >;
        value: string;
      }>
    ) {
      state[action.payload.field] = action.payload.value;
      state.error = null;
    },
    setSignupError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    markOtpSent(state) {
      state.otpSent = true;
      state.error = null;
    },
    goToSignupStep(state, action: PayloadAction<SignupStep>) {
      state.step = action.payload;
      state.error = null;
    },
    resetSignup() {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerSeller.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerSeller.fulfilled, (state, action) => {
        state.isLoading = false;
        state.step = 4;
        state.successMessage = action.payload;
      })
      .addCase(registerSeller.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? "Registration failed";
      });
  },
});

export const {
  updateSignupField,
  setSignupError,
  markOtpSent,
  goToSignupStep,
  resetSignup,
} = sellerSignupSlice.actions;

export default sellerSignupSlice.reducer;
