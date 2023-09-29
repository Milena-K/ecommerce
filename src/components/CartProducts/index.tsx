import { useAppDispatch, useAppSelector } from "hooks/hooks"
import "./style.scss"
import { RootState } from "redux/store"
import { useNavigate } from "react-router-dom"
import { useCallback } from "react"
import { CartProduct } from "definitions"
import Trash from "../../assets/ant-design_delete-filled.svg"
import { removeProduct } from "redux/cartSlice"
import { StyledLink } from "components/Header/Styles"
import { ToastContainer } from "react-toastify";
import { showSuccessToast } from "helpers/toast"

const CartProducts = () => {
    const totalPrice = useAppSelector((state: RootState) => state.cart.cart?.total)
    const products = useAppSelector((state: RootState) => state.cart.cart?.products)
    const allProducts = useAppSelector((state: RootState) => state.products.products)
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const handleRemove = (productId: number) => {
        dispatch(removeProduct(productId))
        showSuccessToast({ message: "The product is added to the cart!" })
    }

    const showProducts = useCallback(() => {
        if(products) {
            return products.map((p: CartProduct) => {
                const prod = allProducts.find((prod) => prod.id === p.id)
                return (
                    <tr className="product" key={p.id}>
                        <td className="product__image">
                            <StyledLink to={`/item/${p.id}`}>
                                <img src={prod?.images[0]} alt="product" />
                            </StyledLink>
                        </td>
                        <td className="product__name">{p.title}</td>
                        <td className="product__price">{p.price}Eu</td>
                        <td className="product__subtotal">{p.price * p.quantity}Eu</td>
                        <td className="product__remove">
                            <img src={Trash} alt="trash" onClick={() => handleRemove(p.id)}/>
                        </td>
                    </tr>
                )


            })

        }
    }, [products])

    return (
        <div className="cart-products">
            <table className="cart-products__table">
                <thead className="table-header">
                    <tr>
                        <th></th>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Subtotal</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                {showProducts()}
                </tbody>
            </table>
            <div className="cart__total">
                <div className="cart__total-title title-md">
                    Cart Totals
                </div>
                <div className="cart__total-price">
                    <p className="subtotal">
                        <span className="subtotal__title">Subtotal</span>
                        <span className="subtotal__price">{totalPrice}Eu</span>
                    </p>
                    <p className="total">
                        <span className="total__title">Total</span>
                        <span className="total__price">{totalPrice}Eu</span>
                    </p>
                </div>
                <button className="btn-line-black btn-sm"
                    onClick={() => navigate("/checkout")}>Check Out</button>

            </div>
            <ToastContainer />
        </div>
    )
}

export default CartProducts
