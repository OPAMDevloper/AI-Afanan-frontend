import { useState, useEffect, useCallback, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";
import { StoreContext } from "../../context/storeContext";
import "./ProductList.css";

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
  const handlePreviousPage = () => setPage((prevPage) => (prevPage > 1 ? prevPage - 1 : 1));

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
                  className="product-card"
                  key={product._id}
                  onClick={() => handleProductClick(product._id)}
                >
                  <img src={`${url}/${product.image}`} alt={product.name} className="product-image" />
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-price">${product.price}</p>
                </div>
              ))
            ) : (
              <p>No products available.</p>
            )}
          </div>
          <div className="pagination-controls">
            <button onClick={handlePreviousPage} disabled={page === 1}>Previous</button>
            <button onClick={handleNextPage}>Next</button>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductList;