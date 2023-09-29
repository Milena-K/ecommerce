import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Cart, CartProduct, Product } from "../definitions"
import { RootState, store } from "./store";
import { fetchCart, removeProductFromCart, updateCartProducts } from "api";

export interface CartState {
  cart: Cart | null,
}

type UserIdCartProductId = {
  productId: number,
  userId: number,
}

export const updateCart = createAsyncThunk(
  'cart/addProductToCart',
  async ({productId, userId}: UserIdCartProductId, thunkApi) => {
    const res = await updateCartProducts(productId, userId)
    return res
  }
)

export const removeProduct = createAsyncThunk(
  'cart/removeProductFromCart',
  async (productId: number, thunkApi) => {

    const cartId = store.getState().cart.cart?.id
    const products = store.getState().cart.cart?.products

    if(products && cartId) {
      const newProducts = products.filter(
        (product: CartProduct) => product.id !== productId
      )
      const res = await removeProductFromCart(newProducts, cartId)
      return res.data
    }
  }
)


export const setCart = createAsyncThunk(
  'cart/setCart',
  async ( userId: number, thunkApi) => {
    const res = await fetchCart(userId)
    return res
  }
)

const initialState: CartState = {
  cart: null,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    emptyCart: () => initialState
  },
  extraReducers: (builder) => {
    builder.addCase(updateCart.fulfilled, (state, action) => {
      state.cart = action.payload
    })
    .addCase(setCart.fulfilled, (state, action) => {
      state.cart = action.payload
    })
    .addCase(removeProduct.fulfilled, (state, action) => {
      state.cart = action.payload
    })
  }
},
);

export default cartSlice.reducer;
export const { emptyCart } = cartSlice.actions
