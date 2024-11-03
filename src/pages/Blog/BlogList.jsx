import React, { useState, useEffect, useCallback, useContext } from "react";
import axios from "axios";
import "./BlogList.css";
import { StoreContext } from "../../context/storeContext";

const BlogList = () => {
    const [blogs, setBlogs] = useState([]);
    const [page, setPage] = useState(1);
    const { url } = useContext(StoreContext); // Access the URL from StoreContext

    const fetchBlogs = useCallback(async () => {
        try {
            const response = await axios.get(`${url}/blogs?page=${page}`);
            console.log("API Response:", response.data); // Log the API response to check its structure
            console.log("Blogs Data:", response.data.data); // Log the blogs specifically

            // Access blogs from response.data.data or adjust based on actual API structure
            const blogsData = Array.isArray(response.data.data) ? response.data.data : [];
            console.log("Number of blogs:", blogsData.length); // Log the number of blogs
            setBlogs(blogsData);
        } catch (error) {
            console.error("Error fetching blogs:", error);
            setBlogs([]); // Clear blogs in case of an error
        }
    }, [page, url]);

    useEffect(() => {
        fetchBlogs();
    }, [fetchBlogs]);

    const handleNextPage = () => setPage((prevPage) => prevPage + 1);
    const handlePreviousPage = () => setPage((prevPage) => (prevPage > 1 ? prevPage - 1 : 1));

    return (
        <div className="blog-list-container">
            <div className="blog-grid">
                {Array.isArray(blogs) && blogs.length > 0 ? (
                    blogs.map((blog) => (
                        <div className="blog-card" key={blog._id}>
                            <img src={blog.image} alt={blog.title} className="blog-image" />
                            <h3 className="blog-title">{blog.title}</h3>
                            <p className="blog-snippet">{blog.snippet}</p> {/* Short description */}
                        </div>
                    ))
                ) : (
                    <p>No blogs available.</p> // Message if there are no blogs
                )}
            </div>
            <div className="pagination-controls">
                <button onClick={handlePreviousPage} disabled={page === 1}>Previous</button>
                <button onClick={handleNextPage}>Next</button>
            </div>
        </div>
    );
};

export default BlogList;