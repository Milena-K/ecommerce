import { useDetailsPageContext } from "pages/detailspage/context"
import "./style.scss"
import StyledProductPictureDiv, { StyledSelectedImg } from "./Styled"
import { useEffect, useState } from "react"
import ReactStars from 'react-stars'
import { StyledButton } from "styles/StyledButton"
import FB from "../../assets/akar-icons_facebook-fill.svg"
import LinkedIn from "../../assets/akar-icons_linkedin-box-fill.svg"
import Twitter from "../../assets/ant-design_twitter-circle-filled.svg"
import { ProductsService } from "services/ProductService"
import { updateCartProducts } from "api"
import { useAppSelector } from "hooks/hooks"
import { RootState } from "redux/store"
import { showSuccessToast } from "helpers/toast"


const ProductMain = () => {
  const { product, productComments } = useDetailsPageContext()
  const [selectedImg, setSelectedImg] = useState<string | undefined>()
  const sizes = ["L", "XL", "XS"]
  const [size, setSize] = useState<string>("L")
  const isAuthenticated: boolean = useAppSelector((state: RootState) => state.user.isAuthenticated)
  const userId = useAppSelector((state: RootState) => state.user.user?.id)

  useEffect(() => {
    if(!selectedImg)
      setSelectedImg(product?.images[0])
  },[product])

  const handleAddToCart = () => {
    if(product && userId) {
      updateCartProducts(product.id, userId)
      showSuccessToast({ message: "Product added to cart!" })
    }
  }

  return (
    <div className="product-main">
      <div className="left">
          <div className="image-viewer">
            <div className="image-btns">
              {
                product?.images.map((img, index) => (
                <button className="image-btn" onClick={() => setSelectedImg(img)} key={index}>
                    <StyledProductPictureDiv $img={img}/>
                  </button>
                ))
              }
            </div>
            <StyledSelectedImg $img={selectedImg}/>
          </div>
      </div>
      <div className="right">
        <div className="right__title title-lg">
            {product?.title}
        </div>
        <div className="right__price">
            {product?.price}Eu
        </div>
        <div className="right__rating">
          <div className="stars">
              <ReactStars value={product?.rating} size={20} />
          </div>
          <div className="reviews">
              {/* TODO: add number of customer reviews */}
              {productComments?.length} Customer Reviews

          </div>
        </div>
        <div className="right__description">
            {product?.description}
        </div>
        <div className="right__sizes">
            <p>Size:</p>
            {
              sizes.map((s, index) => (
                <StyledButton onClick={() => setSize(s)} className={size === s ? 'active' : ''} key={index}>
                  {s}
                </StyledButton>
              ))
            }
        </div>
        <div className="right__toCart">
          { isAuthenticated &&
            <button className="btn-sm btn-line-black" onClick={handleAddToCart}>Add To Cart</button>
          }
        </div>
        <div className="right__details">
            <div className="detail">
              <p className="name">In Stock</p><span>: {product?.stock}</span>
            </div>
            <div className="detail">
              <p className="name">Category</p><span>: {product?.category}</span>
            </div>
            <div className="detail">
              <p className="name">Brand</p><span>: {product?.brand}</span>
            </div>
            <div className="detail">
              <p className="name">Share</p>
              <div className="social-media">
                :
                <img className="facebook" alt="facebook" src={FB} />
                <img className="linkedIn" alt="linkedIn" src={LinkedIn} />
                <img className="twitter" alt="twitter" src={Twitter} />
              </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default ProductMain
