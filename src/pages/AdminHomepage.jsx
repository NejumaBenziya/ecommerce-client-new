import api from "../api/axios";
import React, { useEffect, useState } from 'react'
import MainCarousal from '../components/MainCarousal';
import AdminProductCard from '../components/AdminProductCard';

const AdminHomepage = () => {

  //  State to store all products
  const [products, setProducts] = useState([]);

  //  Fetch products only ONCE when component loads
  useEffect(() => {

    api.get(
      "/api/user/product-list", // API to fetch all products
      { withCredentials: true } // optional (cookies)
    )
      //  Save products in state
      .then(res => setProducts(res.data.products))

      //  Log error if API fails
      .catch(err => console.log(err.response));

  }, [products]); 
  return (
    <>
      {/*  Top banner / carousel */}
      <MainCarousal />

      <div className="container mx-auto px-4 py-8">

        {/*  Page title */}
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          New Arrivals
        </h1>

        {/*  Products grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

          {/*  Reverse to show latest first */}
          {products.slice().reverse().map((item) =>

            //  Hide deleted products
            !item.isDeleted ? (

              <div
                key={item._id} // unique key for React
                className="transition-transform transform hover:scale-105"
              >
                {/*  Product card */}
                <AdminProductCard product={item} />
              </div>

            ) : null
          )}

        </div>
      </div>
    </>
  );
};

export default AdminHomepage;