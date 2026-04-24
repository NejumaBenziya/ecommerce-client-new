import { useLocation } from "react-router-dom";
import AdminProductCard from "../components/AdminProductCard";
import React, { useEffect, useState } from "react";
import api from "../api/axios";

const Categoriespage = () => {

  // State to store products fetched from backend
  const [products, setProducts] = useState([]);

  //  State to store error message (if API fails)
  const [error, setError] = useState(null);

  //  Get current URL (to read query params like ?category=makeup)
  const location = useLocation();

  //  Parse query params
  const params = new URLSearchParams(location.search);

  //  Extract category value from URL
  const category = params.get("category");

  // Fetch products whenever category changes
  useEffect(() => {

    api.get(
      "/api/user/product-list", // API endpoint to fetch products
      {
        params: { productCategory: category }, // send category as query param
        withCredentials: true, // optional (used for cookies if needed)
      }
    )

      //  If success → store products in state
      .then((res) => setProducts(res.data.products))

      //  If error → store error message
      .catch((err) =>
        setError(err.response?.data?.message || "Something went wrong")
      );

  }, [category]); // re-run when category changes


  return (
    <div className="container mx-auto px-4 py-8">

      {/*  Page heading (dynamic category name) */}
      <h1 className="text-3xl font-bold text-center mb-8 capitalize text-gray-800">
        {category}
      </h1>

      {/* Show error if exists */}
      {error && (
        <p className="text-center text-red-500 font-medium mb-6">
          {error}
        </p>
      )}

      {/*  If no products found */}
      {products.length === 0 ? (
        <p className="text-center text-gray-500">
          No products found in this category.
        </p>
      ) : (

        //  Grid layout for products
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

          {/*  Reverse to show latest products first */}
          {products.slice().reverse().map((item) => (

            <div
              key={item._id} // unique key for React rendering
              className="transition-transform transform hover:scale-105"
            >

              {/* Render product card */}
              <AdminProductCard product={item} />

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Categoriespage;