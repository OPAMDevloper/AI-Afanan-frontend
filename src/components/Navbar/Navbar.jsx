import './Navbar.css';
import { assets } from '../../assets/assets';
import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import Wishlist from '../../pages/Wishlist/WishList';
import { StoreContext } from '../../context/storeContext';

const Navbar = ({ setShowSignup }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { token } = useContext(StoreContext);
  const [wishlistItems] = useState([
    { name: 'Sample Item 1', image: '../../assets/CollectionFirst.png', price: 15 }
  ]);

  const toggleMenu = () => setMenuOpen(!menuOpen);

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
          {!token ? (
            <>
              <button onClick={() => setShowSignup(true)}>Sign Up</button>
              <img src={assets.MagnifyingGlass} alt="Search" className="logo" onClick={() => setSearchOpen(!searchOpen)} />
              {searchOpen && <input type="text" placeholder="Search..." className="search-input" />}
            </>
          ) : (
            <>
              <img src={assets.Heart} alt="Wishlist" className="logo" onClick={() => setWishlistOpen(true)} />
              <img src={assets.User} alt="User" className="logo" />
              <img src={assets.Bag} alt="Itembag" className="logo" />
            </>
          )}
        </div>
      </nav>

      {wishlistOpen && (
        <Wishlist wishlistItems={wishlistItems} closeWishlist={() => setWishlistOpen(false)} />
      )}
    </>
  );
};

export default Navbar;