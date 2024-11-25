import { StoreContext } from "../../Context/StoreContext.jsx";
import { useContext } from "react";
import { useLocation } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import "./CartTotal.css";

const CartTotal = ({ buttonText }) => {
  const { getTotalCartAmount, removeAll } = useContext(StoreContext);
  const location = useLocation();
  const checkTotal = () => {
    if (getTotalCartAmount() === 0) {
      return false;
    }
    return true;
  };

  const goPage = () => {
    if (location.pathname === "/order") {
      localStorage.clear();
      removeAll();
      return;
    }
    return;
  };

  return (
    <div className="cart-total">
      <h2>Cart Totals</h2>
      <div>
        <div className="cart-total-details">
          <p>Subtotal</p>
          <p>${getTotalCartAmount()}.00</p>
        </div>
        <hr />

        <div className="cart-total-details">
          <p>Delivery Fee</p>
          <p>${getTotalCartAmount() === 0 ? 0 : 2}.00</p>
        </div>
        <hr />

        <div className="cart-total-details total">
          <p>Total</p>
          <p>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}.00</p>
        </div>
      </div>
      <HashLink
        to={location.pathname === "/order" ? "/" : "/order"}
        replace={
          location.pathname === "/order" ||
          location.pathname === "/order#footer"
            ? true
            : false
        }
        className={`${checkTotal() ? "" : "disabled"} link `}
        onClick={goPage}
      >
        {checkTotal() ? buttonText : "Cart is empty"}
      </HashLink>
    </div>
  );
};

export default CartTotal;
