import { useState, useEffect, useCallback, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";
import { StoreContext } from "../../context/storeContext";
import "./ProductList.css";
import Card from "../Card/Card";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const { url } = useContext(StoreContext);
  const navigate = useNavigate();

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${url}/product/all?page=${page}`);
    console.log(response.data.data.data,'response.data.data.data');
    
      setProducts(response.data.data.data || []);
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [page, url]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleNextPage = () => setPage((prevPage) => prevPage + 1);
  const handlePreviousPage = () =>
    setPage((prevPage) => (prevPage > 1 ? prevPage - 1 : 1));

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`); // Navigate to ProductDetail page with product ID
  };

  return (
    <div className="product-list-container">
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="product-grid">
            {products.length > 0 ? (
              products.map((product) => (
                <div
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
                    modelPath={product.imageModel ?`${url}/${product.imageModel}`:'/purple_perfume_bottle1.glb'}
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
            <button onClick={handlePreviousPage} disabled={page === 1}>
              Previous
            </button>
            <button onClick={handleNextPage}>Next</button>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductList;
