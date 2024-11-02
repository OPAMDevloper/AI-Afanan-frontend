import React, { useState, useEffect, useCallback, useContext } from "react";
import axios from "axios";
import "./ProductList.css";
import { StoreContext } from "../../context/storeContext";

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const { url } = useContext(StoreContext); // Access the URL from StoreContext

    const fetchProducts = useCallback(async () => {
        try {
            const response = await axios.get(`${url}/product/all?page=${page}`);
            setProducts(response.data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    }, [page, url]);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const handleNextPage = () => setPage((prevPage) => prevPage + 1);
    const handlePreviousPage = () => setPage((prevPage) => (prevPage > 1 ? prevPage - 1 : 1));

    return (
        <div className="product-list-container">
            <div className="product-grid">
                {products.map((product) => (
                    <div className="product-card" key={product._id}>
                        <img src={product.image} alt={product.name} className="product-image" />
                        <h3 className="product-name">{product.name}</h3>
                        <p className="product-price">${product.price}</p>
                    </div>
                ))}
            </div>
            <div className="pagination-controls">
                <button onClick={handlePreviousPage} disabled={page === 1}>Previous</button>
                <button onClick={handleNextPage}>Next</button>
            </div>
        </div>
    );
};

export default ProductList;