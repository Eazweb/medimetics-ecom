import { configureStore } from "@reduxjs/toolkit";
import { UserRegisterSlice } from "../features/RegisterUserSlice";
import { CreateProductSlice } from "../features/CreateProductSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      user: UserRegisterSlice.reducer,
      product: CreateProductSlice.reducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
