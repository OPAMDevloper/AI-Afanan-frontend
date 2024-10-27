import './Footer.css'; // Make sure to update your CSS
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-subscribe">
          <h2>Local Face</h2>
          <p>Subscribe to Our Newsletter:</p>
          <p>Receive Updates on New Arrivals and Special Promotions!</p>
          <form className="newsletter-form">
            <input type="email" placeholder="Your email here" />
            <button type="submit">Submit</button>
          </form>
          <div className="social-icons">
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaLinkedinIn /></a>
            <a href="#"><FaInstagram /></a>
          </div>
        </div>

        <div className="footer-links">
          <div className="footer-column">
            <h3>Categories</h3>
            <ul>
              <li><a href="#">Fashion</a></li>
              <li><a href="#">Jewelry</a></li>
              <li><a href="#">Sports</a></li>
              <li><a href="#">Electronics</a></li>
              <li><a href="#">Indoor</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>Shopping</h3>
            <ul>
              <li><a href="#">Payments</a></li>
              <li><a href="#">Delivery options</a></li>
              <li><a href="#">Buyer protection</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>Customer care</h3>
            <ul>
              <li><a href="#">Help center</a></li>
              <li><a href="#">Terms & Conditions</a></li>
              <li><a href="#">Privacy policy</a></li>
              <li><a href="#">Returns & refund</a></li>
              <li><a href="#">Survey & feedback</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>Pages</h3>
            <ul>
              <li><a href="/About">About Us</a></li>
              <li><a href="#">Shop</a></li>
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">Services</a></li>
              <li><a href="#">Blog</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Divider line */}
      <hr />

      <div className="footer-bottom">
        <p>© 2023 Local Face Inc. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;