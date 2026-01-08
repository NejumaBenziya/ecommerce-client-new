import { useLocation } from "react-router-dom";
import AdminProductCard from "../components/AdminProductCard";
import React, { useEffect, useState } from "react";
import api from "../api/axios";
const Categoriespage = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const category = params.get("category");

  useEffect(() => {
   api.get(
  "/api/user/product-list",
  {
    params: { productCategory: category },
    withCredentials: true, // optional here, but OK to keep
  }
)

      .then((res) => setProducts(res.data.products))
      .catch((err) => setError(err.response?.data?.message || "Something went wrong"));
  }, [category]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 capitalize text-gray-800">
        {category}
      </h1>

      {error && (
        <p className="text-center text-red-500 font-medium mb-6">{error}</p>
      )}

      {products.length === 0 ? (
        <p className="text-center text-gray-500">No products found in this category.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.slice().reverse().map((item) => (
            <div
              key={item._id}
              className="transition-transform transform hover:scale-105"
            >
              <AdminProductCard product={item} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Categoriespage;
