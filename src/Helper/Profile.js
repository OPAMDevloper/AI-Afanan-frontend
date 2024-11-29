// src/helpers/profileApi.js

import axios from "axios";

// Fetch data for Wishlist
export const fetchWishlistData = async () => {
  const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
  return savedCart;
};

// Fetch data for Order History
export const fetchOrderHistoryData = async (url,tokn) => {
  try {
    const response = await axios.get(`${url}/order`, {
      headers: {
        Authorization: `Bearer ${tokn}`,
      },
    });
    console.log(response,'fetchOrderHistoryData');
    
    return response?.data?.data?.data;
  } catch (error) {
    console.error("Error fetching product details:", error);
  } finally {
  }
};

// Fetch data for Pending Orders
export const fetchPendingOrdersData = async () => {
  return [
    {
      id: 2,
      name: "Product 2",
      date: "Oct 10, 2020",
      quantity: 2,
      total: "$156",
      status: "Pending",
      image: "/path/to/image4.jpg",
    },
  ];
};

// Fetch data for Account Settings
export const addToCart = (product) => {
  // Get existing cart from localStorage, or initialize an empty array if no cart exists
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  // Check if the product is already in the cart
  const productIndex = cart.findIndex(item => item._id === product._id);

  if (productIndex !== -1) {
    // If the product is already in the cart, update its quantity
    cart[productIndex].quantity += 1;
  } else {
    // If the product is not in the cart, add it
    cart.push({ ...product, quantity: 1 });
  }

  // Save the updated cart back to localStorage
  localStorage.setItem('cart', JSON.stringify(cart));

};

