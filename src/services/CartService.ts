import { AxiosResponse } from "axios";
import { Cart, CartProduct, Product, Values } from "../definitions";
import { instances } from "./BaseService";

const { baseApiInstance } = instances;

type CartsResponse = {
  carts: Cart[],
  total: number,
  skip: number,
  limit: number,
}

const addProductToNewCart = (productId: number, userId: number)=> {
  const quantity = 1;
  return baseApiInstance.post("/carts/add", {
    userId,
    products: [
      {
        id: productId,
        quantity,
      },
    ]
  })
}

const updateCart = (productId: number, cartId: number)=> {
  const quantity = 1;
  return baseApiInstance.patch(`/carts/${cartId}`, {
    merge: true,
    products: [
      {
        id: productId,
        quantity,
      },
    ]
  })
}

const getCart = async (userId: number) => {
  // why does a user need multiple carts?
  return await baseApiInstance.get(`/carts/user/${userId}`).then((res: AxiosResponse<CartsResponse>) => res.data.carts[0])
}

export const removeProduct = async (cartProducts: CartProduct[], cartId: number) => {
  const quantity = 1;
  const products = cartProducts.map(prod => ({id: prod.id, quantity}))
  return await baseApiInstance.patch(`/carts/${cartId}`, {
    merge: false,
    products
  })
}

type Order = {
  userId: number,
  products: Array<{
    id: number,
    quantity: number
  }>,
  form: Values
}

export const makeOrder = async (data: Order) => {
  return await baseApiInstance.post("/carts/add", data).then(res => res.data)
}


export const CartService = {
  updateCart,
  addProductToNewCart,
  getCart,
  removeProduct,
  makeOrder
}
