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
  emailOtpSent: boolean;
  emailOtp: string;
  emailVerified: boolean;
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
  emailOtpSent: false,
  emailOtp: "",
  emailVerified: false,
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

export const checkSellerPhone = createAsyncThunk<
  void,
  void,
  { state: { sellerSignup: SellerSignupState }; rejectValue: string }
>("sellerSignup/checkPhone", async (_void, { getState, rejectWithValue }) => {
  const phone = getState().sellerSignup.phone.replace(/\s/g, "");
  try {
    const response = await postData(
      API_ENDPOINTS.AUTH.CHECK_PHONE,
      { phone },
      { auth: false }
    );
    if (!response?.success) {
      return rejectWithValue(
        response?.message ??
          "This phone number is already registered as a seller. Please login."
      );
    }
  } catch (error) {
    return rejectWithValue(
      getErrorMessage(
        error,
        "This phone number is already registered as a seller. Please login."
      )
    );
  }
});

export const checkSellerEmail = createAsyncThunk<
  void,
  void,
  { state: { sellerSignup: SellerSignupState }; rejectValue: string }
>("sellerSignup/checkEmail", async (_void, { getState, rejectWithValue }) => {
  const email = getState().sellerSignup.email.trim();
  try {
    const response = await postData(
      API_ENDPOINTS.AUTH.CHECK_EMAIL,
      { email },
      { auth: false }
    );
    if (!response?.success) {
      return rejectWithValue(
        response?.message ??
          "This email is already registered as a seller. Please login."
      );
    }
  } catch (error) {
    return rejectWithValue(
      getErrorMessage(
        error,
        "This email is already registered as a seller. Please login."
      )
    );
  }
});

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
        email: form.email.trim(),
        password: form.password,
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
          | "step"
          | "otpSent"
          | "emailOtpSent"
          | "emailVerified"
          | "isLoading"
          | "error"
          | "successMessage"
        >;
        value: string;
      }>
    ) {
      if (
        action.payload.field === "phone" &&
        state.phone !== action.payload.value
      ) {
        state.otpSent = false;
        state.otp = "";
      }
      if (
        action.payload.field === "email" &&
        state.email !== action.payload.value
      ) {
        state.emailOtpSent = false;
        state.emailVerified = false;
        state.emailOtp = "";
      }
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
    markEmailOtpSent(state) {
      state.emailOtpSent = true;
      state.emailVerified = false;
      state.emailOtp = "";
      state.error = null;
    },
    markEmailVerified(state) {
      state.emailVerified = true;
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
      .addCase(checkSellerPhone.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(checkSellerPhone.fulfilled, (state) => {
        state.isLoading = false;
        state.otpSent = true;
        state.error = null;
      })
      .addCase(checkSellerPhone.rejected, (state, action) => {
        state.isLoading = false;
        state.otpSent = false;
        state.error = action.payload ?? "This phone number is already registered as a seller. Please login.";
      })
      .addCase(checkSellerEmail.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(checkSellerEmail.fulfilled, (state) => {
        state.isLoading = false;
        state.emailOtpSent = true;
        state.error = null;
      })
      .addCase(checkSellerEmail.rejected, (state, action) => {
        state.isLoading = false;
        state.emailOtpSent = false;
        state.error =
          action.payload ??
          "This email is already registered as a seller. Please login.";
      })
      .addCase(registerSeller.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerSeller.fulfilled, (state, action) => {
        state.isLoading = false;
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
  markEmailOtpSent,
  markEmailVerified,
  goToSignupStep,
  resetSignup,
} = sellerSignupSlice.actions;

export default sellerSignupSlice.reducer;
