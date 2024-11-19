import React, { useState } from "react";
import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  Box,
} from "@mui/material";
import ProfileCard from "../ProfileCard/ProfileCard";

import "../../pages/PersonalDetails/ProfilePage.css";

const CheckoutModal = () => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  const addToCart = (item) => {
    setCart([...cart, item]);
    setTotal(total + item.price);
  };

  const removeFromCart = (item) => {
    const updatedCart = cart.filter((cartItem) => cartItem !== item);
    setCart(updatedCart);
    setTotal(total - item.price);
  };

  const image = ""; // Placeholder for image URL
  const data = [
    {
      id: 123,
      name: "Ambar Ki Mas'huriyat",
      mrp: "67",
      type: "Perfume",
      quantity: "2",
      total: 100,
    },
  ];
  return (
    <div>
      <Typography variant="h4" align="center" gutterBottom>
        Perfume Brand
      </Typography>
      <Box
        display="grid"
        gridTemplateColumns="repeat(auto-fill, minmax(300px, 1fr))"
        gap={2}
        justifyItems="center"
      >
        {data.map((item, index, arr) => (
          <ProfileCard
            key={item.id}
            item={item}
            // activeTab={activeTab}
            handleRemove={removeFromCart}
            index={index}
            arr={arr}
          />
        ))}
      </Box>

      <Box mt={2}>
        <Typography variant="h6">Total: ₹{total}</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => alert("Proceeding to checkout")}
        >
          Checkout
        </Button>
      </Box>
    </div>
  );
};

export default CheckoutModal;
