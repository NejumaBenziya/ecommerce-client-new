import React, { useState, useEffect } from 'react'
import { useLocation } from "react-router-dom";
import api from "../api/axios";
import ProductCard from '../components/ProductCard';
 const SearchPage = () => {
    const [products, setProducts] = useState([]);
     const [error, setError] = useState("");
    const location = useLocation();
    const query = new URLSearchParams(location.search).get("q");
    console.log(query);
    
    useEffect(() => {

        if (query.trim() === "") {
            setProducts([]);
            return;
        }
        api.get("/api/user/search", {
  params: { q: query }
})
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log("catch is working")
        setError(err.response?.data?.message || "Something went wrong");
      });
    }, [query]);
    return (
       <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold text-center mb-6">
        Search Results for "{query}"
      </h1>

      {error && <p className="text-red-500 text-center">{error}</p>}

      {products.length === 0 ? (
        <p className="text-center text-gray-500">No products found.</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((item) => (
            <ProductCard product={item} key={item._id} />
          ))}
        </div>
      )}
    </div>
    )
}
export default SearchPage;
