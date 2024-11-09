import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { View } from '@react-three/drei';
import Scene from '../../pages/SceneFive';
import axios from "axios";
import Loader from "../Loader/Loader";
import { StoreContext } from "../../context/storeContext";
import "./ProductDetail.css";

const ProductDetail = () => {
  const { id } = useParams(); // Fetch the product ID from the URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { url } = useContext(StoreContext);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${url}/product/show/${id}`);
        console.log("Product data:", response.data.data); // Log the product data structure
        setProduct(response.data.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, url]);

  if (loading) return <Loader />;

  if (!product) return <p>Product not found.</p>;

  return (
    <div className="product-detail-container">
  <div className="product-content">
    <img src={`${url}/${product.image}`} alt={product.name} className="product-detail-image" />
    <h2 className="product-detail-name">{product.name}</h2>
    <p className="product-detail-price">${product.price}</p>
    <p className="product-detail-description">{product.description}</p>
    <p className="product-detail-discount">Discount Price: ${product.discountPrice}</p>
    <p className="product-detail-quantity">Quantity: {product.quantity}</p>
  </div>

  <div className="ModelContainer">
    <View className="Model">
      <Scene />
    </View>
  </div>
</div>
  );
};

export default ProductDetail;