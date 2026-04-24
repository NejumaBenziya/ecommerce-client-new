import MainCarousal from "../components/MainCarousal";
import ProductCard from "../components/ProductCard";
import React, { useEffect, useState, useRef } from "react";
import api from "../api/axios";
import Loader from "../components/Loader";

const Homepage = () => {
  // store products fetched from backend
  const [products, setProducts] = useState([]);

  // pagination state
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // loading state for API call
  const [loading, setLoading] = useState(false);

  // reference to scroll to product section
  const productsRef = useRef(null);

  // flag to control scroll behavior after page change
  const shouldScroll = useRef(false);

  // go to next page
  const nextClickHandler = () => {
    shouldScroll.current = true; // mark scroll needed
    setPage((prev) => prev + 1);
  };

  // go to previous page
  const prevClickHandler = () => {
    shouldScroll.current = true;
    setPage((prev) => prev - 1);
  };

  // fetch products when page changes
  useEffect(() => {
    setLoading(true);

    api.get("/api/user/product-list", {
      params: { page: page, limit: 8 }, // pagination params
      withCredentials: true
    })
      .then((res) => {
        console.log("FULL RESPONSE:", res.data); // debug

        // ensure products is always an array
        const safeProducts = Array.isArray(res.data.products)
          ? res.data.products
          : [];

        setProducts(safeProducts); // update products
        setTotalPages(res.data.totalPages || 1); // set total pages
        setLoading(false); // stop loader
      })
      .catch((err) => {
        setLoading(false);
        console.log(err.response); // log error (no UI handling yet)
      });
  }, [page]);

  // scroll to top of product list after pagination
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
    <>
      {/* show loader when fetching data */}
      {loading && <Loader />}

      <div>
        {/* top banner carousel */}
        <MainCarousal />

        {/* product section */}
        <div className="container mx-auto px-4" ref={productsRef}>
          <h1 className="text-2xl font-bold text-center mb-6">
            New Arrivals
          </h1>

          {/* show message if no products */}
          {!loading && products.length === 0 ? (
            <p className="text-center text-gray-500">
              No products found
            </p>
          ) : (
            <>
              {/* product grid */}
              <div className="
                grid gap-6 
                grid-cols-1      
                sm:grid-cols-2  
                md:grid-cols-3   
                lg:grid-cols-4  
              ">
                {
                  products
                    .slice() // creates shallow copy (not really needed)
                    .filter((item) => !item.isDeleted) // remove deleted items
                    .map((item) => (
                      <ProductCard product={item} key={item._id} />
                    ))
                }
              </div>

              {/* pagination controls */}
              <div className="flex justify-center gap-4 mt-6">
                <button
                  onClick={prevClickHandler}
                  disabled={page === 1} // disable at first page
                  className="px-4 py-2 bg-gray-200 rounded"
                >
                  Prev
                </button>

                <span>
                  Page {page} of {totalPages}
                </span>

                <button
                  onClick={nextClickHandler}
                  disabled={page === totalPages} // disable at last page
                  className="px-4 py-2 bg-gray-200 rounded"
                >
                  Next
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Homepage;