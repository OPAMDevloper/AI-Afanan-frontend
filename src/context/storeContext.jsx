import { createContext, useEffect, useState } from "react";

// Helper functions for managing cookies
const setCookie = (name, value, days) => {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
};

const getCookie = (name) => {
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? match[2] : null;
};

const deleteCookie = (name) => {
  document.cookie = name + "=; Max-Age=-99999999;";
};

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const url = 'https://alafnanperfume.com';
  const [token, setToken] = useState("");
  const [cartItems, setCartItems] = useState({});
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // Drawer state
  const [showSignup, setShowSignup] = useState(false); // Drawer state

 // Function to open and close the drawer
 const toggleDrawer = () => {
  setIsDrawerOpen((prev) => !prev); // Toggle drawer state
};

  // Load token from cookies on initial render
  useEffect(() => {
    const savedToken = getCookie("token");
    if (savedToken) {
      setToken(savedToken); // Set token state from cookie
    }
  }, []);

  // Update cookie whenever token state changes
  useEffect(() => {
    if (token) {
      setCookie("token", token, 7); // Save token to cookies for 7 days
    } else {
      deleteCookie("token"); // Remove token from cookies if token state is empty
    }
  }, [token]);


  
  const addToCart = (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }))
    }
    else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
    }
  }
  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
  }


  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const Items in cartItems) {
      if (cartItems[Items] > 0) {

        let itemInfo = food_list.find((product) => product._id === Items)
        totalAmount += itemInfo.price * cartItems[Items];
      }
    }
    return totalAmount;
  }

  const contextValue = {
    url,
    token,
    setToken,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    toggleDrawer,
    isDrawerOpen,
    showSignup,
    setShowSignup,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;