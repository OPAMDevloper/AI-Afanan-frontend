import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom'; 
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import About from './pages/About/AboutSection';
import Signup from './components/signUp/signUp' // Import Signup component
import Wishlist from './pages/Wishlist/WishList';

const App = () => {
  // State to control the visibility of Signup component
  const [showSignup, setShowSignup] = useState(false);

  return (
    <>
      {/* Pass setShowSignup to Navbar for controlling Signup popup */}
      <Navbar setShowSignup={setShowSignup} /> 

      {/* Conditional rendering for Signup component */}
      {showSignup && <Signup setShowSignup={setShowSignup} />}

      {/* Define routes for different pages */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/About" element={<About />} />
        <Route path='/Wishlist' element={<Wishlist />} />
      </Routes>
    </>
  );
};

export default App;