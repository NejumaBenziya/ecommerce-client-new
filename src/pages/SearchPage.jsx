import React, { useState, useEffect, useRef } from 'react'
import { useLocation } from "react-router-dom";
import api from "../api/axios";
import ProductCard from '../components/ProductCard';
import Loader from "../components/Loader";

const SearchPage = () => {

  //  store search results
  const [products, setProducts] = useState([]);

  //  store error message
  const [error, setError] = useState("");

  //  current page number
  const [page, setPage] = useState(1);

  //  loading state for API
  const [loading, setLoading] = useState(false);

  //  total pages from backend
  const [totalPages, setTotalPages] = useState(1);

  //  access URL query params
  const location = useLocation();

  // reference for scrolling to product section
  const productsRef = useRef(null);

  //  flag to trigger scroll after pagination
  const shouldScroll = useRef(false);

  //  extract search query from URL (?q=...)
  const query = new URLSearchParams(location.search).get("q");

  console.log(query); 

  //  go to next page
  const nextClickHandler = () => {
    shouldScroll.current = true; // mark scroll needed
    setPage((prev) => prev + 1);
  };

  //  go to previous page
  const prevClickHandler = () => {
    shouldScroll.current = true; // mark scroll needed
    setPage((prev) => prev - 1);
  };

  //  fetch search results when query changes
  useEffect(() => {

    setLoading(true); // start loading

   
    if (query.trim() === "") {
      setProducts([]);   // clear products
      setLoading(false); // stop loading
      return;
    }

    //  API call to backend search endpoint
    api.get("/api/user/search", {
      params: { q: query, page: 1, limit: 10 }
    })
      .then((res) => {

        console.log("FULL RESPONSE:", res.data); // debug response

        
        setProducts(res.data);

        //  set total pages (fallback to 1)
        setTotalPages(res.data.totalPages || 1);

        setLoading(false); // stop loading

      })
      .catch((err) => {

        setLoading(false); // stop loading on error

        //  set user-friendly error message
        setError(err.response?.data?.message || "Something went wrong");

      });

  }, [query]); 

  // scroll to top when page changes
  useEffect(() => {
    if (shouldScroll.current && products.length > 0) {
      setTimeout(() => {
        productsRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
        shouldScroll.current = false; // reset flag
      }, 50);
    }
  }, [products]);

  return (
    <div className="container mx-auto px-4">

      {/*  show loader */}
      {loading && <Loader />}

      {/*  page title */}
      <h1 className="text-2xl font-bold text-center mb-6" ref={productsRef}>
        Search Results for "{query}"
      </h1>

      {/*  show error message */}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {/*  empty state */}
      {products.length === 0 ? (
        <p className="text-center text-gray-500">No products found.</p>
      ) : (
        <>
          {/*  product grid */}
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products.map((item) => (
              <ProductCard product={item} key={item._id} />
            ))}
          </div>

          {/*  pagination */}
          <div className="flex justify-center gap-4 mt-6">

            {/* previous button */}
            <button
              onClick={prevClickHandler}
              disabled={page === 1} // disable on first page
              className="px-4 py-2 bg-gray-200 rounded"
            >
              Prev
            </button>

            {/*  page info */}
            <span>
              Page {page} of {totalPages}
            </span>

            {/*  next button */}
            <button
              onClick={nextClickHandler}
              disabled={page === totalPages} // disable on last page
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