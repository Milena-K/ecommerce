import { Cart, CartProduct, Product, UserData, Values } from "definitions";
import { CartService } from "services/CartService";
import { CommentService } from "services/CommentService";
import { ProductsService } from "services/ProductService";
import { UserService } from "services/UserService";

export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export function fetchProducts(urlString: string) {
  const res = ProductsService.getAllProducts(urlString);
  return res
}

export function fetchProductCategories() {
  return ProductsService.getProductCategories();
}

export function fetchProductById(id: string) {
  return ProductsService.getProductById(id);
}

export function fetchCommentsByProductId(id: string) {
  return CommentService.getCommentsForProduct(id);
}

export async function loginUser(username: string, password: string, expiresInMins:number=10000) {
  const data = {
    username,
    password,
    expiresInMins
  }
  return await UserService.loginUser(data)
}

export async function fetchUserByEmail (email: string)  {
  return await UserService.getUserByEmail(email)
    .then(users => {
      if(users.length === 0) {
        return ;
      }
      return users[0]
    })
}
export async function fetchCart (userId: number): Promise<Cart> {
  return await CartService.getCart(userId)
}

export async function updateCartProducts (productId: number, userId: number): Promise<Cart> {
  // check if userId has a cart
  const cart = await CartService.getCart(userId)
  if(typeof cart !== "undefined") {
    return await CartService.updateCart(productId, cart.id).then(res => res.data)
  }
  return await CartService.addProductToNewCart(productId, userId).then(res => res.data)
}

export async function removeProductFromCart (products: CartProduct[], cartId: number) {

  return await CartService.removeProduct(products, cartId)
}

export async function makeOrder(userId: number, products: Array<{id: number, quantity: number}>, form: Values) {
  const data = {userId, products, form}
  return await CartService.makeOrder(data)
}

// atuny0@sohu.com
// 9uQFF1Lh
