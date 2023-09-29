import Banner from "components/Banner";
import CartProducts from "components/CartProducts";
import Landing from "components/Landing";

export const CartPage = () => {
  return (
    <div>
        <Landing />
        <CartProducts />
        <Banner />
    </div>
  );
};

export default CartPage
