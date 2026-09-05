import type { RootState } from "@/services/redux";

export const selectSellerAuth = (state: RootState) => state.sellerAuth;
export const selectSeller = (state: RootState) => state.sellerAuth.seller;
export const selectSellerIsAuthenticated = (state: RootState) =>
  state.sellerAuth.isAuthenticated;
export const selectSellerAuthLoading = (state: RootState) =>
  state.sellerAuth.isLoading;
export const selectSellerAuthError = (state: RootState) => state.sellerAuth.error;
