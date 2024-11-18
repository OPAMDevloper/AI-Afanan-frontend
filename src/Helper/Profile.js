// src/helpers/profileApi.js

import axios from "axios";

// Fetch data for Wishlist
export const fetchWishlistData = async () => {
  return [
    {
      id: 1,
      name: "Wishlist Item 1",
      mrp: "$25",
      type: "Attract",
      image: "/path/to/image1.jpg",
    },
    {
      id: 2,
      name: "Wishlist Item 2",
      mrp: "$50",
      type: "Attract",
      image: "/path/to/image2.jpg",
    },
  ];
};

// Fetch data for Order History
export const fetchOrderHistoryData = async (url,tokn) => {
  try {
    const response = await axios.get(`${url}/order`, {
      headers: {
        Authorization: `Bearer ${tokn}`,
      },
    });

    return response?.data;
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
export const fetchAccountSettingsData = async () => {
  return [
    { id: 1, label: "Edit Personal Details" },
    { id: 2, label: "Manage Addresses" },
    { id: 3, label: "Change Password" },
    { id: 4, label: "Log Out" },
  ];
};
