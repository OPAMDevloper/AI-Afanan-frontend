import './Navbar.css';
import { assets } from '../../assets/assets';
import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import Wishlist from '../../pages/Wishlist/WishList';
import { StoreContext } from '../../context/storeContext';
import { Button, Drawer } from '@mui/material';
import CheckoutModal from '../CheckoutModal/CheckoutModal';

const Navbar = ({ setShowSignup }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const { token, setToken } = useContext(StoreContext);

  // Sample wishlist items for demonstration
  const [wishlistItems] = useState([
    { name: 'Sample Item 1', image: assets.CollectionFirst, price: 15 },
  ]);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleSearch = () => setSearchOpen(!searchOpen);
  const toggleUserDropdown = () => setUserDropdownOpen(!userDropdownOpen);
  const toggleWishlist = () => setWishlistOpen(!wishlistOpen);

  const handleLogout = () => {
    setToken('');
    setUserDropdownOpen(false);
  };
  const [open, setOpen] = useState(false);

  // Toggle drawer open/close
  const toggleDrawer = (openStatus) => {
    setOpen(openStatus);
  };

  return (
    <>
      <nav className="navbar">
        <div className="hamburger" onClick={toggleMenu}>
          <span className={menuOpen ? 'bar open' : 'bar'}></span>
          <span className={menuOpen ? 'bar open' : 'bar'}></span>
          <span className={menuOpen ? 'bar open' : 'bar'}></span>
        </div>

        <ul className={menuOpen ? 'navbar-links active' : 'navbar-links'}>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/shop">Shop</Link></li>
          <li><Link to="/about">About Us</Link></li>
          <li><Link to="/services">Services</Link></li>
          <li><Link to="/blog">Blog</Link></li>
        </ul>

        <div className="navbar-icons">
          {!token && (
            <button onClick={() => setShowSignup(true)}>Sign Up</button>
          )}

          <img
            src={assets.MagnifyingGlass}
            alt="Search"
            className="icon"
            onClick={toggleSearch}
          />
          {searchOpen && (
            <input
              type="text"
              placeholder="Search..."
              className="search-input"
            />
          )}

          {/* Wishlist Icon */}


          {token && (
            <>

              <img
                src={assets.Heart} // Replace with actual heart icon asset
                alt="Wishlist"
                className="icon wishlist-icon"
                onClick={toggleWishlist}
              />

              <img
                src={assets.User}
                alt="User Profile"
                className="icon"
                onClick={toggleUserDropdown}
              />

              {userDropdownOpen && (
                <div className={`user-dropdown ${userDropdownOpen ? 'open' : ''}`}>
                  <ul>
                    <li>
                      <Link to="/cart">Shopping Bag</Link>
                    </li>
                    <li>
                      <Link to="/personalDetails">Personal Details</Link>
                    </li>
                    <li>
                      <Link to="/profile">Profile</Link>
                    </li>
                    <li onClick={handleLogout}>Logout</li>
                  </ul>
                </div>
              )}
            </>
          )}
        </div>
      </nav>

      {/* Wishlist Overlay */}
      {wishlistOpen && (
        <Wishlist
          wishlistItems={wishlistItems}
          closeWishlist={() => setWishlistOpen(false)}
        />
      )}
      <Drawer anchor="right" open={open} onClose={() => toggleDrawer(false)} >
        <div style={{ width: 500, padding: 20 }}>
          <CheckoutModal/>
        </div>
      </Drawer>
    </>
  );
};

export default Navbar;