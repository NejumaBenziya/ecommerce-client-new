import React, { useState, useEffect } from 'react'
import { useLocation } from "react-router-dom";
import api from "../api/axios";
import ProductCard from '../components/ProductCard';
 const SearchPage = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const location = useLocation();
    const query = new URLSearchParams(location.search).get("q");
    console.log(query);
    
    useEffect(() => {

        if (query.trim() === "") {
            setProducts([]);
            return;
        }
        api.get("/api/user/search", {
  params: { q: query ,page: 1, limit: 10}
})
      .then((res) => {
         console.log("FULL RESPONSE:", res.data);

        

        setProducts(res.data);
        setTotalPages(res.data.totalPages || 1);
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
      ) : (<>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((item) => (
            <ProductCard product={item} key={item._id} />
          ))}
          
        </div>
        {/* ✅ Pagination Buttons */}
        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            className="px-4 py-2 bg-gray-200 rounded"
          >
            Prev
          </button>

          <span>
            Page {page} of {totalPages}
          </span>

          <button
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
            className="px-4 py-2 bg-gray-200 rounded"
          >
            Next
          </button>
        </div>
        </>
      )}
    </div>
    )
}
export default SearchPage;
