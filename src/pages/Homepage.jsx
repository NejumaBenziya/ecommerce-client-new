import MainCarousal from "../components/MainCarousal";
import ProductCard from "../components/ProductCard";
import React, { useEffect, useState } from "react";
import api from "../api/axios";

const Homepage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get("/api/user/product-list", { withCredentials: true })
      .then((res) => {
        console.log("FULL RESPONSE:", res.data);
        const safeProducts = Array.isArray(res.data.products)
        ? res.data.products
        : [];

      setProducts(safeProducts);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, []);

  return (
    <>
      <MainCarousal />
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold text-center mb-6">New Arrivals</h1>

        <div
          className="
            grid gap-6 
            grid-cols-1      
            sm:grid-cols-2  
            md:grid-cols-3   
            lg:grid-cols-4  
          "
        >
          {(Array.isArray(products) ? products : [])
  .slice()
  .reverse()
  .filter((item) => !item.isDeleted)
  .map((item) => (
    <ProductCard product={item} key={item._id} />
  ))}


        </div>
      </div>
    </>
  );
};

export default Homepage;
