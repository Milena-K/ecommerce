import { Product } from "definitions";
import { useEffect, useState } from "react";
import { ProductsService } from "services/ProductService";

const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([])

  const getData = async () => {
    try {
      const res = await ProductsService.getAllProducts("")
      const data = res.data.products
      const newProducts = data
      setProducts(newProducts)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getData()
  }, [])
  return products
}

export default useProducts
