import { configureStore } from "@reduxjs/toolkit";
import sellerAuthReducer from "@/services/redux/slices/sellerSlices/sellerAuthSlice";
import sellerSignupReducer from "@/services/redux/slices/sellerSlices/sellerSignupSlice";

export function makeStore() {
  return configureStore({
    reducer: {
      sellerAuth: sellerAuthReducer,
      sellerSignup: sellerSignupReducer,
    },
  });
}

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
