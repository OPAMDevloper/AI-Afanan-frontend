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
            console.log("API Response:", response.data); // Log the API response to check its structure
            console.log("Products Data:", response.data.data); // Log the products specifically

            // Access products from response.data.data.data
            const productsData = Array.isArray(response.data.data.data) ? response.data.data.data : [];
            console.log("Number of products:", productsData.length); // Log the number of products
            setProducts(productsData);
        } catch (error) {
            console.error("Error fetching products:", error);
            // Ensure products is an empty array in case of an error
            setProducts([]);
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
                {Array.isArray(products) && products.length > 0 ? (
                    products.map((product) => (
                        <div className="product-card" key={product._id}>
                            <img src={product.image} alt={product.name} className="product-image" />
                            <h3 className="product-name">{product.name}</h3>
                            <p className="product-price">${product.price}</p>
                        </div>
                    ))
                ) : (
                    <p>No products available.</p> // Message if there are no products
                )}
            </div>
            <div className="pagination-controls">
                <button onClick={handlePreviousPage} disabled={page === 1}>Previous</button>
                <button onClick={handleNextPage}>Next</button>
            </div>
        </div>
    );
};

export default ProductList;