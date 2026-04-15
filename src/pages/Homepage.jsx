import MainCarousal from "../components/MainCarousal";
import ProductCard from "../components/ProductCard";
import React, { useEffect, useState, useRef } from "react";
import api from "../api/axios";
import Loader from "../components/Loader";

const Homepage = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const productsRef = useRef(null);
  const shouldScroll = useRef(false);
   
 const nextClickHandler = () => {
  shouldScroll.current = true;
  setPage((prev) => prev + 1);
};

const prevClickHandler = () => {
  shouldScroll.current = true;
  setPage((prev) => prev - 1);
};
  useEffect(() => {
    setLoading(true);
    api.get("/api/user/product-list", {
      params: { page: page, limit: 8 },
      withCredentials: true
    })
      .then((res) => {
        console.log("FULL RESPONSE:", res.data);
        
        console.log(loading);
        

        const safeProducts = Array.isArray(res.data.products)
          ? res.data.products
          : [];

        setProducts(safeProducts);
        setTotalPages(res.data.totalPages || 1);
        setLoading(false)
      
        
      })
      .catch((err) => {
        setLoading(false)
        console.log(err.response);
        
      });
  }, [page]);
 useEffect(() => {
  if (shouldScroll.current && products.length > 0) {
    setTimeout(() => {
      productsRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      shouldScroll.current = false; // reset
    }, 50);
  }
}, [products]);
  return (
    <> {loading && <Loader />}
           
  
              <div >
      <MainCarousal />
      <div className="container mx-auto px-4" ref={productsRef}>
        <h1 className="text-2xl font-bold text-center mb-6" >
          New Arrivals
        </h1>

        <div
          className="
            grid gap-6 
            grid-cols-1      
            sm:grid-cols-2  
            md:grid-cols-3   
            lg:grid-cols-4  
          "
        >
         {
        products
        .slice()
            .filter((item) => !item.isDeleted)
            .map((item) => (
        <ProductCard product={item} key={item._id} />
            ))}
      </div>

      {/* ✅ Pagination Buttons */}
      <div className="flex justify-center gap-4 mt-6">
        <button
          onClick={prevClickHandler}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-200 rounded"
        >
          Prev
        </button>

        <span>
          Page {page} of {totalPages}
        </span>

        <button
          onClick={nextClickHandler}
          disabled={page === totalPages}
          className="px-4 py-2 bg-gray-200 rounded"
        >
          Next
        </button>
      </div>
    </div >
        </div>
    </>
  );
};

export default Homepage;