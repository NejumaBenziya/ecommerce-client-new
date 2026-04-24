import api from "../api/axios";
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import OrderCard from '../components/OrderCard';

const Sellerpages = () => {

  //  state to store orders
  const [orders, setOrders] = useState([]);

  //  get current URL location
  const location = useLocation();

  //  extract query params from URL
  const params = new URLSearchParams(location.search);

  //  get order status from query (?status=...)
  const status = params.get("status");

  //  fetch orders when status changes
  useEffect(() => {

    
    //  API call with status filter
    api.get(
      "/api/seller/orders-list",
      {
        params: { status }, // send status as query param
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
          // backend error response
          console.error("Error Response:", err.response.data);
        } else {
          // network or unknown error
          console.error("Error:", err.message);
        }
      });

  }, [status]); //  re-run when status changes

  return (
    <div className='container m-auto'>

      {/*  page title */}
      <h1 className='text-2xl font-bold text-center mb-3'>Orders</h1>

      {/* container for order cards */}
      <div className=' gap-4'>

        {/*  reverse orders to show latest first */}
        {orders.slice().reverse().map((item) => (

          //  render each order
          <OrderCard order={item} key={item._id}/>

        ))}

      </div>
    </div>
  )
}

export default Sellerpages