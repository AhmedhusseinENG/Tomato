import "./Header.css";
import { StoreContext } from "../../Context/StoreContext.jsx";
import { useState, useContext, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { assets } from "../../assets/assets.js";

const Header = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const { getTotalCartAmount, food_list, cartItems, cartItemsLength } =
    useContext(StoreContext);

  const itemsInCart = food_list
    .map((item) => cartItems[item._id])
    .filter((item) => item !== undefined)
    .reduce((acc, current) => acc + current, 0);

  const location = useLocation();
  let sharedLocalSection = "#footer";
  if (location.pathname !== "/") {
    sharedLocalSection = `${location.pathname + sharedLocalSection}`;
  }
  const navigate = useNavigate();
  let timerRef = useRef(null);

  const scrollToElement = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const handleMenuClick = (menuItem, sectionId) => {
    setMenu(menuItem);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (location.pathname !== "/") {
      navigate("/");
      timerRef.current = setTimeout(() => {
        scrollToElement(sectionId);
      }, 300);
    } else {
      scrollToElement(sectionId);
    }
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, []);
  return (
    <div className="header">
      <HashLink to="/">
        {" "}
        <img src={assets.logo} alt="logo" className="logo" />{" "}
      </HashLink>
      <ul className="header-menu">
        <HashLink
          to="/"
          onClick={() => setMenu("home")}
          className={menu === "home" ? "active" : ""}
        >
          home{" "}
        </HashLink>
        <li
          onClick={() => handleMenuClick("menu", "explore-menu")}
          className={menu === "menu" ? "active pointer" : "pointer"}
        >
          menu
        </li>
        <li
          onClick={() => handleMenuClick("mobile-app", "app-download")}
          className={menu === "mobile-app" ? "active pointer" : "pointer"}
        >
          mobile-app
        </li>
        <HashLink
          replace={true}
          to={sharedLocalSection}
          onClick={() => setMenu("contact-us")}
          className={menu === "contact-us" ? "active" : ""}
        >
          contact us
        </HashLink>
      </ul>
      <div className="header-right">
        <HashLink to={"/#food-display"}>
          <img src={assets.search_icon} alt="icon" />
        </HashLink>
        <div className="header-search-icon">
          <HashLink to="/cart">
            {" "}
            <img src={assets.basket_icon} alt="basket-icon" />
            <div className={getTotalCartAmount() === 0 ? "dot-0" : "dot-1"}>
              {cartItemsLength > 0 ? itemsInCart : ""}
            </div>
          </HashLink>
        </div>
        <button onClick={() => setShowLogin(true)}>Log in</button>
      </div>
    </div>
  );
};

export default Header;
