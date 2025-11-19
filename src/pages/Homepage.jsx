import MainCarousal from "../components/MainCarousal";
import ProductCard from "../components/ProductCard";
import React, { useEffect, useState } from "react";
import axios from "axios";

const Homepage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_DOMAIN}/api/user/product-list`, {
        withCredentials: true,
      })
      .then((res) => {
        setProducts(res.data.products);
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
          {products
  .slice()
  .reverse()
  .map((item) =>
    !item.isDeleted ? (
      <ProductCard product={item} key={item._id} />
    ) : null
  )}

        </div>
      </div>
    </>
  );
};

export default Homepage;
