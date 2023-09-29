import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { Product } from "definitions"
import { API_BASE_URL } from "services/BaseService"

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL  }),
  endpoints: (builder) => ({
    getProducts: builder.query<ProductsApiResponse, string>({
      query: (query) => `products${query}`,
    }),
    getProductById: builder.query<Product, string>({
      query: (id: string) => `products/${id}`,
    }),

  }),
})

export type ProductsApiResponse = {
  products: Product[],
  total: number,
  skip: number,
  limit: number,
}

export const { useGetProductsQuery, useGetProductByIdQuery } = productsApi
