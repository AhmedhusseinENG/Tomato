import "./Cart.css";
import { StoreContext } from "../../Context/StoreContext.jsx";
import { useContext } from "react";
import { assets } from "../../assets/assets.js";
import CartTotal from "../../components/CartTotal/CartTotal.jsx";

const Cart = () => {
  const { cartItems, cartItemsLength, food_list, removeFromCart, removeAll } =
    useContext(StoreContext);

  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {cartItemsLength < 1 ? (
          <p className="cart-empty">Cart is empty</p>
        ) : null}
        {food_list.map((item, index) => {
          if (cartItems[item._id] > 0) {
            return (
              <div key={index}>
                <div className="cart-items-title cart-items-item">
                  <img src={item.image} alt="food-image" />
                  <p>{item.name}</p>
                  <p>${item.price}.00</p>
                  <p>{cartItems[item._id]}</p>
                  <p>${item.price * cartItems[item._id]}.00</p>
                  <p className="cross" onClick={() => removeFromCart(item._id)}>
                    <img
                      src={assets.delete_icon}
                      alt="delete-icon"
                      className="delete-icon"
                    />
                  </p>
                </div>
                <hr />
              </div>
            );
          }
        })}
        <button
          className={`remove-all ${cartItemsLength > 0 ? "d-block" : "d-none"}`}
          onClick={() => removeAll()}
        >
          Remove All
        </button>
      </div>
      <div className="cart-bottom">
        <CartTotal buttonText="PROCEED TO CHECKOUT" />
        <div className="cart-promocode">
          <div>
            <p>If you have a promo code, Enter it here</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder="promo code" />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
