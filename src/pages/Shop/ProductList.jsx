import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import "./ProductList.css"; // Import your CSS file for styling

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);

    // Wrap fetchProducts in useCallback to avoid it being re-created on every render
    const fetchProducts = useCallback(async () => {
        try {
            const response = await axios.get(`http://localhost:5000/products?page=${page}`);
            setProducts(response.data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    }, [page]); // page as a dependency to re-run when it changes

    // Call fetchProducts whenever `page` changes
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