import "./Footer.css";
import { assets } from "../../assets/assets.js";

const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-contet">
        <div className="footer-content-left">
          <img src={assets.logo} alt="logo" />
          <p className="about">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni ea
            tenetur neque repellendus illum praesentium perferendis dignissimos
            libero consequatur obcaecati sunt recusandae, minima quis reiciendis
            incidunt eaque commodi, sit non.
          </p>
          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="facebook-icon" />
            <div className="x-icon-container">
              <img
                className="x-icon"
                src={assets.twitter_icon}
                alt="twitter-icon"
              />
            </div>
            <img src={assets.linkedin_icon} alt="linkedin-icon" />
          </div>
        </div>

        <div className="footer-content-center">
          <h2>COMPANY</h2>
          <ul>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>

        <div className="footer-content-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>+20-101-062-5137</li>
            <li>contact@tomato.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">
        Copyright © 2024 Tomato.com - All Rights Reserved.
      </p>
    </div>
  );
};

export default Footer;
