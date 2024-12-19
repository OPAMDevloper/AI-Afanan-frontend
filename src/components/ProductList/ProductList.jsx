import { useState, useEffect, useCallback, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";
import { StoreContext } from "../../context/storeContext";
import "./ProductList.css";
import { Tabs, Tab } from "@mui/material";
import Card from "../Card/Card";

const ProductList = () => {
  const [products, setProducts] = useState({
    // data:[{
    //   '_id':"789789",
    //   name:'aliasgar',
    //   price:"7897"
    // }]
  });
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const { url ,token} = useContext(StoreContext);
  const navigate = useNavigate();

  // Fetch categories from API
  const fetchCategories = useCallback(async () => {
    try {
      console.log(token,'token');
      
      const response = await axios.get(`${url}/category`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCategories(response.data.data || []);
      if (response.data.data.length > 0) {
        setSelectedCategory(response.data.data[0]); // Select the first category by default
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }, [url]);

  // Fetch products from API
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const categoryFilter = selectedCategory ? `&category=${selectedCategory._id}` : "";
      const response = await axios.get(`${url}/product/all?page=${page}${categoryFilter}`);
      setProducts(response.data.data || []);
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [page, selectedCategory, url]);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory,page]);

  const handleNextPage = () => setPage((prevPage) => prevPage + 1);
  const handlePreviousPage = () =>
    setPage((prevPage) => (prevPage > 1 ? prevPage - 1 : 1));


  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`); 
  };

  const handleCategoryChange = (event, newValue) => {
    setSelectedCategory(categories[newValue] || "");
    setPage(1); // Reset page when category changes
  };

  return (
    <div className="product-list-container">
      {loading && <Loader />}
      <div className="categories-container">
      <Tabs
        value={categories.findIndex((cat) => cat._id === selectedCategory._id)}
        onChange={handleCategoryChange}
        textColor="inherit"
        indicatorColor="primary"
        variant="scrollable"
        scrollButtons
        sx={{
          mb: 2,
          "& .MuiTab-root": {
            color: "white",
            textTransform: "capitalize",
            fontFamily: "Poppins",
            fontWeight: 600,
            lineHeight: "28.8px",
            textAlign: "left",
            padding: "10px",
          },
          "& .MuiTabScrollButton-horizontal": { display: "none" },
          "& .MuiTabs-indicator": { backgroundColor: "#007bff" },
        }}
      >
        {categories.map((category, index) => (
          <Tab key={index} label={category.name} />
        ))}
      </Tabs>
      </div>
      {!loading && (
        <>
          <div className="product-grid">
            {products?.data?.length > 0 ? (
              products?.data?.map((product) => (
                <div
                  key={product._id}
                  style={{
                    padding: "20px",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Card
                    name={product.name}
                    price={product.price}
                    type={"Perfume"}
                    modelPath={product.imageModel ? `${url}/${product.imageModel}` : "/purple_perfume_bottle1.glb"}
                    text="Your Product Description"
                    onClick={() => handleProductClick(product._id)}
                  />
                </div>
              ))
            ) : (
              <p>No products available.</p>
            )}
          </div>
          <div className="pagination-controls">
            {products?.isPrevPage && <button onClick={handlePreviousPage} disabled={page === 1}>
              Previous
            </button>}
            {products?.isNextPage && <button onClick={handleNextPage}>Next</button>}
            
          </div>
        </>
      )}
    </div>
  );
};

export default ProductList;
