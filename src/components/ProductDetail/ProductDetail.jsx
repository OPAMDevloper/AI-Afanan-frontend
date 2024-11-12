import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { StoreContext } from "../../context/storeContext";
import Loader from "../Loader/Loader"; // Assuming you have a custom Loader component
import "./ProductDetail.css";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { url } = useContext(StoreContext);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${url}/product/show/${id}`);
        setProduct(response.data.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, url]);

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const handleAddToCart = () => {
    console.log(`Adding ${quantity} of product ${product.name} to the cart.`);
  };

  if (loading) return <Loader />;

  if (!product) return <p>Product not found.</p>;

  const modelUrl = `${url}/${product.imageModel}`;

  return (
    <div className="product-detail-container">
      <div className="product-content">
        <div className="product-image">
          <img
            src={`${url}/${product.image}`}
            alt={product.name}
            className="product-detail-image"
          />
        </div>
        <div className="product-info">
          <h2 className="product-detail-name">{product.name}</h2>
          <p className="product-detail-price">${product.price}</p>
          {product.discountPrice && (
            <p className="product-detail-discount">
              Discount Price: ${product.discountPrice}
            </p>
          )}
          <p className="product-detail-description">{product.description}</p>
          <p className="product-detail-quantity">Quantity:</p>
          <div className="quantity-container">
            <button onClick={() => setQuantity(quantity - 1)}>-</button>
            <input
              type="number"
              value={quantity}
              onChange={handleQuantityChange}
              min="1"
            />
            <button onClick={() => setQuantity(quantity + 1)}>+</button>
          </div>
          <button className="add-to-cart-button" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
