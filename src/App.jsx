import { useState, Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom'; 
import Navbar from './components/Navbar/Navbar';
import Loader from './components/Loader/Loader'; // Import your custom Loader component



// Lazy load the components
const Home = lazy(() => import('./pages/Home/Home'));
const About = lazy(() => import('./pages/About/AboutSection'));
const Signup = lazy(() => import('./components/signUp/signUp'));
const Wishlist = lazy(() => import('./pages/Wishlist/WishList'));
const BlogAll = lazy(() => import('./pages/BlogAll/BlogAll'));
const Shop = lazy(() => import('./pages/Shop/Shop'));
const ProductDetail = lazy(() => import('./pages/ProductDetail/ProductDetails'));
const Cart = lazy(() => import('./pages/Cart/Cart'));
const Profile = lazy(() => import('./components/Profile/Profile'));

const App = () => {
  const [showSignup, setShowSignup] = useState(false); // Controls Signup popup visibility

  return (
    <>
      <Navbar setShowSignup={setShowSignup} /> 
      
      {/* Conditionally render Signup component */}
      {showSignup && (
        <Suspense fallback={<Loader />}>
          <Signup setShowSignup={setShowSignup} />
        </Suspense>
      )}

      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/about" element={<About />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/blog" element={<BlogAll />} />
          <Route path="/product/:id" element={<ProductDetail />} /> {/* Route for ProductDetail */}
          {/* <Route path="/cart" element={<Cart />} /> */}
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
