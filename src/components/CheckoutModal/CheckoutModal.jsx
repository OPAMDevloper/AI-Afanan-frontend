import React, { useContext, useEffect, useState } from "react";
import ProfileCard from "../ProfileCard/ProfileCard";
import { Drawer, List, ListItem, ListItemText, IconButton, Typography, Box, Divider, Button } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { AddShoppingCart } from "@mui/icons-material";


import "../../pages/PersonalDetails/ProfilePage.css";
import axios from "axios";
import { StoreContext } from "../../context/storeContext";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";

const CheckoutModal = ({onClose}) => {
  const [cartItems, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { url ,token, toggleDrawer } = useContext(StoreContext);
  const navigate = useNavigate(); // React Router's hook for navigation

  const calculateTotal = (cartItems) => {
    return cartItems.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
  };

  const handleToggleDrawer = () => {
    onClose();
  };

  const addToCart = (product) => {
    const updatedCart = [...cartItems, product];
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setTotal(calculateTotal(updatedCart));
  };


  useEffect(() => {
    // Retrieve the cart from localStorage when the drawer is opened
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(savedCart);
    setTotal(calculateTotal(savedCart));
  }, []);

  const handleRemoveItem = (productId) => {
    const updatedCart = cartItems.filter(item => item._id !== productId);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handleCheckout = async () => {
    setLoading(true);
    setError(null);

    const payload = {
      products: cartItems.map(item => ({
        productId: item._id,
        quantity: item.quantity,
      })),
      amount: total,
      address: 'Indore, Madhya Pradesh',
    };

    try {
      const response = await axios.post(`${url}/order/create`, payload,{
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      // Handle success response (e.g., redirect to order confirmation page)
      console.log('Order created successfully:', response.data);
      setLoading(false);
      localStorage.removeItem('cart'); 
      navigate('/personalDetails');
      toggleDrawer();
      
      // Optionally close the drawer after successful order creation
      setOpen(false);
    } catch (err) {
      // Handle error
      setLoading(false);
      setError('Something went wrong while creating the order.');
      console.error(err);
    }
  };



  return (
    <div className="cart-drawer">
       {loading && <Loader />}
    <Box display="flex" justifyContent="space-between" alignItems="center">
    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Your Cart</Typography>
    <IconButton onClick={handleToggleDrawer}>
      <CloseIcon sx={{ color: '#fff' }} />
    </IconButton>
  </Box>
  <Divider sx={{ my: 2, backgroundColor: '#424242' }} />
  
  <List>
    {cartItems?.map((item, index) => (
      <>
      <ListItem key={index} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' ,color:'#fff'}}>
          <img src={`${url}/${item.image}`} alt={item.name} style={{ width: 40, height: 40, marginRight: 10 }} />
          <ListItemText
            primary={item.name}
            secondary={`Qty: ${item.quantity} | M.R.P: ₹${item.price}`}
            primaryTypographyProps={{ fontWeight: 'bold', fontSize: '16px',color:'#fff' }}
            secondaryTypographyProps={{ fontSize: '14px' ,color:'#fff' }}
          />
        </Box>
        <IconButton edge="end" sx={{ color: '#fff' }} onClick={()=>handleRemoveItem(item._id)}>
          <CloseIcon />
        </IconButton>
      </ListItem>
     <Divider sx={{ my: 2, backgroundColor: '#424242' }} />
     </>
    ))}
    
  </List>


 {cartItems.length > 0 ? <> <Box display="flex" justifyContent="space-between" alignItems="center">
    <Typography variant="h6">Total</Typography>
    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>₹{total}</Typography>
  </Box>

  <Button
        variant="contained"
        sx={{
          width: "80%", // 80% width
          borderRadius: "20px", // Border radius 20px
          backgroundColor: "#fff", // Initial background color (color can be changed here)
          color: "black", // Initial text color black
          textTransform: "none", // To prevent uppercase text transformation
          display: "flex",
          alignItems: "center", // Align icon and text
          justifyContent: "center",
          padding: "10px",
          marginTop: "16px",
          marginBottom: "2px",
          margin: "auto",
          "&:hover": {
            backgroundColor: "#FF6347", // On hover background color changes to orange
            color: "white", // On hover text color changes to white
          },
        }}
        startIcon={<AddShoppingCart />} // Icon before text
         onClick={handleCheckout} // Handle add to cart functionality
      >
        CHECK OUT
      </Button> </> : <Typography variant="h6">No Item Selected</Typography>}
  </div>
  );
};

export default CheckoutModal;
