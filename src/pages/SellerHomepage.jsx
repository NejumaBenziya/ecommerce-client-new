import React, { useEffect, useState } from 'react'
import MainCarousal from '../components/MainCarousal'
import OrderCard from '../components/OrderCard'
import api from "../api/axios";
const SellerHomepage = () => {
  const [orders, setOrders] = useState([]);
  
  useEffect(() => {
    console.log("Fetching seller orders...");
    api.get(
  "/api/seller/orders-list",
  {
    withCredentials: true, // ✅ cookie-based auth
  }
)
    .then(res => {
      setOrders(res.data.orders);
      console.log("Orders fetched:", res.data.orders);
    })
    .catch(err => {
      if (err.response) {
        console.error("Error Response:", err.response.data);
      } else {
        console.error("Error:", err.message);
      }
    });
  }, []);

  return (
    <>
      <MainCarousal />
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold text-center mb-6">New Orders</h1>

        {/* Center contents with grid */}
        <div className="grid gap-6 place-items-center">
          {orders.slice().reverse().map((item) => (
            <OrderCard order={item} key={item._id} />
          ))}
        </div>
      </div>
    </>
  )
}

export default SellerHomepage
