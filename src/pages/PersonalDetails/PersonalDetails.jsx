// src/components/ProfilePage.js
import React, { useState, useEffect, useContext } from "react";
import { Tabs, Tab, Box, Typography, IconButton ,List, ListItem, ListItemText, } from "@mui/material";
import { motion } from "framer-motion";
import { MdChevronRight } from "react-icons/md";
import { fetchWishlistData, fetchOrderHistoryData, fetchPendingOrdersData, fetchAccountSettingsData } from "../../Helper/Profile";
import "./ProfilePage.css";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import { StoreContext } from "../../context/storeContext";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [data, setData] = useState([]);
  const { url,token } = useContext(StoreContext);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const fetchTabData = async (tabIndex) => {
    let response;
    switch (tabIndex) {
      case 0:
        response = await fetchWishlistData();
        break;
      case 1:
        response = await fetchOrderHistoryData(url,token);
        console.log(response,'response');
        break;
      case 2:
        response = await fetchPendingOrdersData();
        break;
      case 3:
        response = await fetchAccountSettingsData();
        break;
      default:
        response = [];
    }
    setData(response);
  };

  useEffect(() => {
    fetchTabData(activeTab);
  }, [activeTab]);

  const handleRemove = (id) => {
    console.log(`Remove product with ID: ${id}`);
  };

  return (
    <Box className="profile-container" sx={{ bgcolor: "black", color: "white", minHeight: "100vh", position: "relative", overflow: "hidden" }}>
      <Box className="profile-top-row" display="flex" gap={2} mb={3}>
        <Box className="profile-box" flex={1} p={3} border={1} borderColor="white" borderRadius={3}>
          <Typography variant="h6">Personal Details</Typography>
          <Typography>Name: John Doe</Typography>
          <Typography>Email: john.doe@example.com</Typography>
          <Typography>Phone: +91-9876543210</Typography>
          <Typography>Location: Mumbai, India</Typography>
        </Box>
        <Box className="profile-box" flex={2} p={3} border={1} borderColor="white" borderRadius={3}>
          <Typography variant="h6">Saved Address</Typography>
          <Typography>Home Address:</Typography>
          <Typography>123 Street, City, Country</Typography>
          <Typography>Office Address:</Typography>
          <Typography>19B, Tower C, Business Park, Mumbai, India</Typography>
        </Box>
      </Box>

      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        textColor="inherit"
        indicatorColor="primary"
        variant="scrollable"
        scrollButtons
        sx={{
          mb: 2,
          "& .MuiTab-root": {
            color: "white",
            textTransform: "none",
            fontFamily: "Poppins",
            fontWeight: 600,
            lineHeight: "28.8px",
            textAlign: "left",
            textDecoration: "none", 
            textUnderlinePosition: "from-font",
            textDecorationSkipInk: "none",
            padding: "10px",
          },
          "& .MuiTabScrollButton-horizontal": { display: "none" },
          "& .MuiTabs-indicator": { backgroundColor: "transparent" },
        }}
      >
        <Tab label="Wishlist" />
        <Tab label="Order History" />
        <Tab label="Pending Orders" />
        <Tab label="Account Settings" />
      </Tabs>

      <Box sx={{ backgroundColor: activeTab !== 3 ? "#FFFFFF0D" : "transparent", padding: activeTab !== 3 ? 2 : 0, borderRadius: 2 }}>
        {activeTab === 3 ? (
           <List>
           {data.map((item) => (
             <ListItem
               key={item.id}
               sx={{
                 display: "flex",
                 justifyContent: "space-between",
                 bgcolor: '#FFFFFF0D',
                 mb: 1,
                 borderRadius: 2,
                 px: 2,
               }}
             >
               <ListItemText primary={item.label} sx={{ color: "white" }} />
               <IconButton sx={{ color: "white" }}>
                 <MdChevronRight />
               </IconButton>
             </ListItem>
           ))}
         </List>
        ) : (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            {data.map((item, index,arr) => (
              <ProfileCard key={item.id} item={item} activeTab={activeTab} handleRemove={handleRemove} index={index} arr={arr}/>
            ))}
          </motion.div>
        )}
      </Box>
    </Box>
  );
};

export default ProfilePage;
