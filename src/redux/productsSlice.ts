import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Product } from "../definitions"
import { fetchProducts as fetchProductsApi  } from "api"
import { AppThunk, RootState } from "./store";
import { ProductsApiResponse } from "./productsApiSlice"
import { AxiosResponse } from "axios";

export interface ProductsState {
  status: "idle" | "loading" | "failed";
  products: Product[]
  total: number
}


const initialState: ProductsState = {
  status: "idle",
  products: [],
  total: 0
};

// export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
//   const response = await fetchProductsApi()
//   return response.data
// })
export const fetchProducts = (): AppThunk =>
  async dispatch => {
    const res1: AxiosResponse<ProductsApiResponse>  = await fetchProductsApi("?skip=0")
    const res2: AxiosResponse<ProductsApiResponse> = await fetchProductsApi("?skip=30")
    const res3: AxiosResponse<ProductsApiResponse> = await fetchProductsApi("?skip=60")
    const res4: AxiosResponse<ProductsApiResponse> = await fetchProductsApi("?skip=90")
    const urls = [res1, res2, res3, res4]
    Promise.all(urls).then(values => {
      const allProducts = values.map(el => el.data.products).flat()
      dispatch(productsSlice.actions.setProducts(allProducts))
    })
}

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) =>  {
      state.products = action.payload
      state.total = 100
    },
  },
},
);

export default productsSlice.reducer;
export const { setProducts } = productsSlice.actions
export const selectAllProducts = ( state: RootState )  => state.products.products;
export const getProductById = (state: RootState, productId: number) => {
  state.products.products.find((product) => product.id === productId)
}
