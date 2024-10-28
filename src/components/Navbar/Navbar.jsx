import './Navbar.css';
import { assets } from '../../assets/assets';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Wishlist from '../../pages/Wishlist/WishList';

const Navbar = ({ setShowSignup }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [wishlistItems, setWishlistItems] = useState([
    { name: 'Sample Item 1', image: '../../assets/CollectionFirst.png', price: 15 }
  ]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <nav className="navbar">
        {/* Hamburger Menu Icon for Small Screens */}
        <div className="hamburger" onClick={toggleMenu}>
          <span className={menuOpen ? 'bar open' : 'bar'}></span>
          <span className={menuOpen ? 'bar open' : 'bar'}></span>
          <span className={menuOpen ? 'bar open' : 'bar'}></span>
        </div>

        {/* Links */}
        <ul className={menuOpen ? 'navbar-links active' : 'navbar-links'}>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/shop">Shop</Link></li>
          <li><Link to="/about">About Us</Link></li>
          <li><Link to="/services">Services</Link></li>
          <li><Link to="#blog">Blog</Link></li>
        </ul>

        {/* Sign-Up Button and Icons */}
        <div className="navbar-icons">
          {!loggedIn ? (
            <>
              <div className="signUp">
                <button onClick={() => setShowSignup(true)}>Sign Up</button>
              </div>
              <img 
                src={assets.MagnifyingGlass} 
                alt="Search" 
                className="logo" 
                onClick={() => setSearchOpen(!searchOpen)} 
              />
              {searchOpen && (
                <input
                  type="text"
                  placeholder="Search..."
                  className="search-input"
                />
              )}
            </>
          ) : (
            <>
              <img 
                src={assets.Heart} 
                alt="Wishlist" 
                className="logo" 
                onClick={() => setWishlistOpen(true)} 
              />
              <img src={assets.User} alt="User" className="logo" />
              <img src={assets.Bag} alt="Itembag" className="logo" />
            </>
          )}
        </div>
      </nav>

      {/* Wishlist Modal */}
      {wishlistOpen && (
        <Wishlist
          wishlistItems={wishlistItems}
          closeWishlist={() => setWishlistOpen(false)}
        />
      )}
    </>
  ); 
};

export default Navbar;