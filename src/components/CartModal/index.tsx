import { FC, useCallback, useEffect, useState } from "react"
import "./style.scss"
import { useAppDispatch, useAppSelector } from "hooks/hooks"
import { RootState } from "redux/store"
import { useNavigate } from "react-router-dom"
import CloseCart from  "../../assets/Group.svg"
import { removeProduct } from "redux/cartSlice"
import { CartProduct } from "definitions"

type Props = {
    closeModal: () => void
}

// TODO: closing animation
const CartModal: FC<Props> = ({ closeModal }) => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const user = useAppSelector(( state: RootState ) => state.user.user)
    const products = useAppSelector((state: RootState) => state.cart.cart?.products)
    const allProducts = useAppSelector((state: RootState) => state.products)
    const totalPrice = useAppSelector((state: RootState) => state.cart.cart?.total)

    const showCartProducts = useCallback(() => {
        return products?.map((product, index) => {
            const prod = allProducts.products.find((prod) => prod.id === product.id)
            return (
                <div key={index} className="cart-side__item">
                    <div className="cart-side__item-details" >
                        <div className="cart-side__item-img">
                            <img src={prod?.images[0]} alt="" />
                        </div>
                        <div className="cart-side__item-text">
                            <p className="cart-side__item-title">
                                {product.title}
                            </p>
                            <p className="cart-side__item-price">
                                1 X <span className="price">{product.price} Eu</span>
                            </p>
                        </div>
                    </div>
                    <button className="remove-item" onClick={() => dispatch(removeProduct(product.id))}>X</button>
                </div>
            )
        })
    }, [products])

    return (
        <>
            <div className="overlay" onClick={closeModal} />
            <div className="cart-side">
                <div className="cart-side__top">
                    <h3 className="title-md">Shopping Cart</h3>
                    <button className="close" onClick={closeModal}>
                        <img src={CloseCart} alt="close" />
                    </button>
                </div>
                <div className="cart-side__items">
                    {showCartProducts()}
                </div>
                <div className="cart-side__bottom">
                    <p className="cart-side__price">
                        <span className="total"> Subtotal </span>
                        <span className="total-price">{totalPrice} Eu</span>
                    </p>
                    <button className="btn-line-black btn-sm" onClick={() => {navigate("/cart"); closeModal()}}>Go to your cart</button>
                </div>
            </div>
        </>
    )
}

export default CartModal
