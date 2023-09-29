import { ProductsService } from "services/ProductService";
import "./style.scss"
import { useEffect, useState } from "react";
import Card from "components/Card";
import { type Product } from "../../definitions";
import useProducts from "hooks/productsHook";
import { ToastContainer } from 'react-toastify';
import { ThreeDots } from 'react-loader-spinner'
import { showErrorToast } from "helpers/toast";

const OurProducts = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [productNum, setProductNum] = useState(8)
  const data: Product[] = useProducts()

  const getMoreData = async () => {
    try {
      const res = await ProductsService.getAllProducts("")
      const data = res.data.products
      const newProducts = products.concat(data.slice(productNum, productNum+8))
      setProductNum(productNum + 8)
      setProducts(newProducts)
    } catch (error) {
      showErrorToast({ message: "Something went wrong." })
    }
  };

  useEffect(() => {
    setProducts(data.slice(0,8))
  }, [data])

  return (
    <div className="products">
      <h2 className="products__title title_md">Our Products</h2>
      {
        products.length === 0 ?
          <ThreeDots
            height="80"
            width="80"
            radius="9"
            color="#9F9F9F"
            ariaLabel="three-dots-loading"
            wrapperStyle={{margin: "0 auto"}}
            visible={true}
          /> : null
      }
      <ToastContainer />
      <div className="products__cards">
      {
        products.map((item, index) => (
          <Card product={item} key={index} />
        ))
      }
      </div>
          <button className="btn-line-primary btn-sm" onClick={getMoreData}>Show more</button>
    </div>
  )
}

export default OurProducts
