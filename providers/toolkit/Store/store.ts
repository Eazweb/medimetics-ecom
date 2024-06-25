import { configureStore } from "@reduxjs/toolkit";
import { UserRegisterSlice } from "../features/RegisterUserSlice";
import { CreateProductSlice } from "../features/CreateProductSlice";
import { productsApi } from "../features/GetAllProductsSlice";
import { userAPI } from "../features/GetAllUserSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      [productsApi.reducerPath]: productsApi.reducer,
      [userAPI.reducerPath]: userAPI.reducer,
      user: UserRegisterSlice.reducer,
      product: CreateProductSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(productsApi.middleware, userAPI.middleware),
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
