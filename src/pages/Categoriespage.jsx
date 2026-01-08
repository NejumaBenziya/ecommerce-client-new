import { useLocation } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import React, { useEffect, useState } from "react";
import api from "../api/axios";

const Categoriespage = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const category = params.get("category");

  useEffect(() => {
   api.get(
  "/api/user/product-list",
  {
    params: { productCategory: category },
    // withCredentials optional here
  }
)
      .then((res) => {
        setProducts(res.data.products);
      })
      .catch((err) => {
        setError(err.response?.data?.message || "Something went wrong");
      });
  }, [category]); 

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold text-center mb-6 capitalize">
        {category}
      </h1>

      {error && <p className="text-red-500 text-center">{error}</p>}

      {products.length === 0 ? (
        <p className="text-center text-gray-500">No products found.</p>
      ) : (
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
            .slice()
            .reverse()
            .map((item) => (
              <ProductCard product={item} key={item._id} />
            ))}
        </div>
      )}
    </div>
  );
};

export default Categoriespage;
