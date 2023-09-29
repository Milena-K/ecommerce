import { Product } from "../definitions";
import { instances } from "./BaseService";

const { baseApiInstance } = instances;

const PRODUCTS_URL = "products";

const getAllProducts = (urlString: string) => {
  return baseApiInstance.get(PRODUCTS_URL + urlString);
};

const getProductDetails = (id: string) => {
  return baseApiInstance.get(`${PRODUCTS_URL}/${id}`);
};


const getProductCategories = () => {
  return baseApiInstance.get(`${PRODUCTS_URL}/categories`).then(
    res => res.data
  );
}

const getProductById = (id: string) => {
  return baseApiInstance.get(`${PRODUCTS_URL}/${id}`).then(
    res => res.data
  );
}

export const ProductsService = {
  getAllProducts,
  getProductDetails,
  getProductById,
  getProductCategories,
};
