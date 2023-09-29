import "./style.scss"
import { useDetailsPageContext } from "pages/detailspage/context"
import { StyledLink } from "components/Header/Styles"

const Breadcrumbs = () => {
  const { product } = useDetailsPageContext()

  return (
    <div className="breadcrumbs">
      <div className="breadcrumbs__text">
        <div className="path">
          <StyledLink to="/">Home</StyledLink>
          <span className="arrows">&gt;</span>
          <StyledLink to="/shop">Shop</StyledLink>
          <span className="arrows">&gt;</span>
        </div>
        <div className="product-title"> {product?.title} </div>
      </div>
    </div>
  )
}

export default Breadcrumbs
