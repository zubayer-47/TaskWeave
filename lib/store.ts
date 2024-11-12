import { configureStore } from "@reduxjs/toolkit";
import { apiService } from "./api/apiServices";
import authSlice from "./auth/authSlice";

export const makeStore = () => {
  return configureStore({
    devTools: process.env.NODE_ENV === "development",
    reducer: {
      [apiService.reducerPath]: apiService.reducer,
      auth: authSlice,
    },

    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(apiService.middleware),
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
