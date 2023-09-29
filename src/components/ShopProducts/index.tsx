import Card from "components/Card";
import { Product } from "definitions";
import "./style.scss"
import Pagination from "components/Pagination";
import { useEffect, useState } from "react";
import { useAppSelector } from "hooks/hooks";
import { RootState } from "redux/store";
import { useShopPageContext } from "pages/shoppage/context";
import { ThreeDots } from 'react-loader-spinner'

export const ShopProducts = () => {
  const { sortBy, filterCategories, numOfProdPerPage, pageNumber } = useShopPageContext()
  const { sort } = sortBy
  const { filter } = filterCategories
  const { prodPerPage } = numOfProdPerPage
  const { currentPage, setCurrentPage } = pageNumber
  const totalNumProd = useAppSelector((state: RootState) => state.products.total)
  const fromPage = (currentPage - 1) * prodPerPage
  const toPage = fromPage + prodPerPage
  const storeProducts = useAppSelector((state: RootState) => state.products.products)
  const [products, setProducts] = useState<Product[]>([])
  const [currentProducts, setCurrentProducts] = useState<Product[]>(products.slice(fromPage,toPage))
  const [filteredProductsLength, setFilteredProductsLength] = useState<number>(totalNumProd)
  const lastPage = Math.ceil(totalNumProd / prodPerPage)

  const filterProducts = (filter: string) => {
    if(filter === "Show All") {
      setCurrentProducts(products.slice(fromPage, toPage))
      return products
    }
    const filteredProducts = products.filter(p => p.category === filter)
    setCurrentProducts(filteredProducts)
    return filteredProducts
  }

  const sortProducts = (): Product[] => {
      const prod = [...storeProducts]
      if(sort === "Default") {
          return prod;
      }

      if(sort === "Highest price") {
          const sorted = [...storeProducts].sort((a,b) => b.price - a.price)
          return sorted
      }else if(sort === "Lowest price") {
          const sorted = [...storeProducts].sort((a,b) => a.price - b.price)
          return sorted
      }else{
        const alpha = [...storeProducts].sort((a, b) => a.title.toUpperCase() < b.title.toUpperCase() ? -1 : 1)
        if(sort === "From A to Z") {
            return alpha
        }else if(sort === "From Z to A") {
            return alpha.reverse()
        }
      }
      return prod
  }

  useEffect(() => {
      setProducts(sortProducts())
  }, [sort, storeProducts])

  useEffect(() => {
    const filtered = filterProducts(filter)
    setFilteredProductsLength(filtered.length)
  }, [filter, products, currentPage, prodPerPage])

  const changePage = (page: number) => {
    if(page === -1 ) {
        if(currentPage !== 1) {
          setCurrentPage(currentPage-1)
        }
    } else if (page === 0) {
        if(currentPage < lastPage ) {
          setCurrentPage(currentPage+1)
        }
    }else if (page > 0 && page <= lastPage){
      setCurrentPage(page)
    }
  }

   return (
     <>
       <div className="shop-products">
         {
           currentProducts.length === 0 ?
              <ThreeDots
                height="80"
                width="80"
                radius="9"
                color="#9F9F9F"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                visible={true}
              /> :
              currentProducts.map((product, index) => (
                <Card product={product} key={index} />
           ))
         }
       </div>
       <Pagination onPress={page => changePage(page)}
                   prodPerPage={prodPerPage}
                   currentPage={currentPage}
                   numOfProducts={filteredProductsLength}
                   totalNumOfProd={totalNumProd} />
     </>
   );
};

export default ShopProducts
