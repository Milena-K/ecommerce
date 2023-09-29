import { Product } from "../../definitions";
import { FC, useState } from "react";
import Heart from "../../assets/Heart.svg"
import Compare from "../../assets/compare-svgrepo-com 1.svg"
import Share from "../../assets/gridicons_share.svg"
import "./style.scss"
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "hooks/hooks";
import { RootState } from "redux/store";
import { updateCart } from "redux/cartSlice";
import LoginModal from "components/LoginModal";
import { ToastContainer } from "react-toastify";
import { showSuccessToast } from "helpers/toast";

type Props = {
  product: Product
}

const Card: FC<Props> = ({ product }) => {
  const navigate = useNavigate()
  const isAuthenticated: boolean = useAppSelector((state: RootState) => state.user.isAuthenticated)
  const userId = useAppSelector((state: RootState) => state.user.user?.id)
  const dispatch = useAppDispatch()
  const [openLoginModal, setOpenLoginModal] = useState<boolean>(false)

  const goToDetails = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget)
      e.stopPropagation()
    const path = `/item/${product.id}`
    navigate(path)
  }
  const handleCart = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (e.target === e.currentTarget)
      e.stopPropagation()
    if (isAuthenticated && userId) {
      dispatch(updateCart({productId: product.id, userId}))
      showSuccessToast({ message: "The product is added to the cart!" })
    } else {
      setOpenLoginModal(true)
    }
  }

  return <div className="card">
    <ToastContainer />
    <div className="overlay" onClick={(e) => goToDetails(e)}>
      <button className="overlay__btn btn" onClick={(e) => handleCart(e)}>
        {isAuthenticated ? "Add to Cart" : "Sign in"}
      </button>
      { isAuthenticated && (
        <div className="overlay__btn-group">
          <button className="share btn">
            <img src={Share} alt="share" /> Share
          </button>
          <button className="compare btn">
            <img src={Compare} alt="compare" /> Compare
          </button>
          <button className="like btn">
            <img src={Heart} alt="heart" /> Like
          </button>
        </div>
      )}
    </div>
    <div className="card__img">
      <div className="discount">
              {`-${product.discountPercentage.toFixed(0)}%`}
      </div>
      <img src={product.images[0]} alt="" />
    </div>
    <div className="card__content">
      <h3 className="card__title title_sm">{product.title}</h3>
      <p className="card__desc"> {product.description} </p>
      <h3 className="card__price title_sm">{product.price}Eu</h3>
    </div>
    {openLoginModal && <LoginModal closeModal={() => setOpenLoginModal(false)} />}
  </div>

}

export default Card
