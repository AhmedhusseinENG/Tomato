import { createContext, useState, useEffect } from "react";
import { food_list } from "../assets/assets.js";

export const StoreContext = createContext(null);
const StoreContextProvider = ({ children }) => {
  const defaultValue = () => {
    const localData = localStorage.getItem("cartItems");
    return localData ? JSON.parse(localData) : {};
  };

  const [cartItems, setCartItems] = useState(defaultValue());
  let cartItemsLength = Object.keys(cartItems).length;
  const addToCart = (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
  };

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const removeFromCart = (itemId) => {
    setCartItems((prev) => {
      const updatedCart = { ...prev };
      if (updatedCart[itemId] <= 1) {
        delete updatedCart[itemId];
      } else {
        updatedCart[itemId] = updatedCart[itemId] - 1;
      }
      return updatedCart;
    });
  };

  const getTotalItemsCount = () => {
    return (cartItemsLength = Object.values(cartItems).reduce(
      (acc, curr) => acc + curr,
      0
    ));
  };

  getTotalItemsCount();

  const removeAll = () => {
    setCartItems({});
  };
  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        totalAmount += itemInfo.price * cartItems[item];
      }
    }
    return totalAmount;
  };
  const contextValue = {
    food_list,
    cartItems,
    cartItemsLength,
    setCartItems,
    addToCart,
    removeFromCart,
    removeAll,
    getTotalCartAmount,
  };
  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};
export default StoreContextProvider;
