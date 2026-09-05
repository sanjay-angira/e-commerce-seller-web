import { configureStore } from "@reduxjs/toolkit";
import sellerAuthReducer from "@/services/redux/slices/sellerSlices/sellerAuthSlice";

export function makeStore() {
  return configureStore({
    reducer: {
      sellerAuth: sellerAuthReducer,
    },
  });
}

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
