import Header from "../../components/Header/Header";
import OverLay from "../../components/OverLay/OverLay";
import LoginPopup from "../../components/LoginPopup/LoginPopup";
import Footer from "../../components/Footer/Footer";
import { Fragment, useState } from "react";
import { createPortal } from "react-dom";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <Fragment>
      {showLogin &&
        createPortal(
          <Fragment>
            <OverLay />
            <LoginPopup setShowLogin={setShowLogin} />
          </Fragment>,
          document.getElementById("overlay")
        )}

      <div className={`page ${showLogin ? "overlay-blur" : ""}`}>
        <Header setShowLogin={setShowLogin} />

        <div className="wrapper">
          <Outlet />
        </div>

        <Footer />
      </div>
    </Fragment>
  );
};

export default MainLayout;
