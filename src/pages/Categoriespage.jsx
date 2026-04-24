import { useLocation } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import React, { useEffect, useState, useRef } from "react";
import api from "../api/axios";
import Loader from "../components/Loader";

const Categoriespage = () => {

  //  Store fetched products
  const [products, setProducts] = useState([]);

  //  Store error message
  const [error, setError] = useState("");

  //  Current page number for pagination
  const [page, setPage] = useState(1);

  //  Total pages from backend
  const [totalPages, setTotalPages] = useState(1);

  //  Loading state
  const [loading, setLoading] = useState(false);

  //  Get current URL (to read category)
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  //  Extract category from query params
  const category = params.get("category");

  //  Ref to scroll to products section
  const productsRef = useRef(null);

  //  Flag to control scroll behavior
  const shouldScroll = useRef(false);


  // Next page handler (not used in UI currently)
  const nextClickHandler = () => {
    shouldScroll.current = true;
    setPage((prev) => prev + 1);
  };

  //  Previous page handler (not used in UI currently)
  const prevClickHandler = () => {
    shouldScroll.current = true;
    setPage((prev) => prev - 1);
  };


  // Fetch products when category or page changes
  useEffect(() => {

    setLoading(true);

    api.get(
      "/api/user/product-list",
      {
        params: {
          productCategory: category,
          page: 1,  
          limit: 10
        },
      }
    )
      .then((res) => {
        console.log("FULL RESPONSE:", res.data);

        //  Ensure products is always an array
        const safeProducts = Array.isArray(res.data.products)
          ? res.data.products
          : [];

        setProducts(safeProducts);

        //  Set total pages
        setTotalPages(res.data.totalPages || 1);

        setLoading(false);
      })

      .catch((err) => {
        setLoading(false);
        setError(err.response?.data?.message || "Something went wrong");
      });

  }, [category, page]); // runs when category or page changes


  // Scroll to top of product list after page change
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

      {/*  Show loader while fetching */}
      {loading ? (
        <Loader />
      ) : (

        <div ref={productsRef}>

          {/*  Category title */}
          <h1 className="text-2xl font-bold text-center mb-6 capitalize">
            {category}
          </h1>

          {/*  Error message */}
          {error && (
            <p className="text-red-500 text-center">{error}</p>
          )}

          {/*  If no products */}
          {products.length === 0 ? (
            <p className="text-center text-gray-500">
              No products found.
            </p>
          ) : (
            <>
              {/*  Products grid */}
              <div
                className="
                  grid gap-6
                  grid-cols-1       
                  sm:grid-cols-2    
                  md:grid-cols-3    
                  lg:grid-cols-4   
                "
              >
                {products
                  .slice() //  create copy before reverse
                  .reverse() //  show latest first
                  .map((item) => (
                    <ProductCard
                      product={item}
                      key={item._id}
                    />
                  ))}
              </div>

              {/*  Pagination */}
              <div className="flex justify-center gap-4 mt-6">

                {/* Previous Button */}
                <button
                  onClick={() => setPage(page - 1)}
                  disabled={page === 1}
                  className="px-4 py-2 bg-gray-200 rounded"
                >
                  Prev
                </button>

                {/* Page Info */}
                <span>
                  Page {page} of {totalPages}
                </span>

                {/* Next Button */}
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
      )}
    </div>
  );
};

export default Categoriespage;