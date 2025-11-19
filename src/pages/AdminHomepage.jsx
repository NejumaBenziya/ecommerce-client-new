import axios from 'axios';
import React, { useEffect, useState } from 'react'
import MainCarousal from '../components/MainCarousal';
import AdminProductCard from '../components/AdminProductCard';

const AdminHomepage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_DOMAIN}/api/user/product-list`, { withCredentials: true })
      .then(res => setProducts(res.data.products))
      .catch(err => console.log(err.response));
  }, []);

  return (
    <>
      <MainCarousal />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          New Arrivals
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.slice().reverse().map((item) => !item.isDeleted ?(
            <div key={item._id} className="transition-transform transform hover:scale-105">
              <AdminProductCard product={item} />
            </div>
          ): null)}
          

        </div>
      </div>
    </>
  );
};

export default AdminHomepage;
