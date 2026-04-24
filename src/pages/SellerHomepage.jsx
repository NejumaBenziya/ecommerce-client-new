import React, { useEffect, useState } from 'react'
import MainCarousal from '../components/MainCarousal'
import OrderCard from '../components/OrderCard'
import api from "../api/axios";

const SellerHomepage = () => {

  //  state to store seller orders
  const [orders, setOrders] = useState([]);

  //  fetch orders when component mounts
  useEffect(() => {

    //  API call to get seller orders
    api.get(
      "/api/seller/orders-list",
      {
        withCredentials: true, //  cookie-based authentication
      }
    )
      .then(res => {

        //  store orders in state
        setOrders(res.data.orders);

      })
      .catch(err => {

        //  error handling
        if (err.response) {
          // backend returned an error response
          console.error("Error Response:", err.response.data);
        } else {
          // network or unknown error
          console.error("Error:", err.message);
        }
      });

  }, []); // run only once when component mounts

  return (
    <>
      {/*  carousel at the top */}
      <MainCarousal />

      <div className="container mx-auto px-4">

        {/*  page title */}
        <h1 className="text-2xl font-bold text-center mb-6">New Orders</h1>

        {/*  grid layout (center aligned items) */}
        <div className="grid gap-6 place-items-center">

          {/*  reverse array to show latest orders first */}
          {orders.slice().reverse().map((item) => (

            // render each order using OrderCard component
            <OrderCard order={item} key={item._id} />

          ))}

        </div>
      </div>
    </>
  )
}

export default SellerHomepage