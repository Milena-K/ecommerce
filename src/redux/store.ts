import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import productsReducer, { ProductsState } from "./productsSlice";
import userReducer from "./userSlice";
import cartReducer from "./cartSlice";
import { productsApi } from "./productsApiSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    user: userReducer,
    cart: cartReducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),
});



export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
