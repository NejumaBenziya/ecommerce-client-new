import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import OrderCard from '../components/OrderCard';

const Sellerpages = () => {
     const [orders, setOrders] = useState([]);
     const location = useLocation();
       const params = new URLSearchParams(location.search);
      const status=params.get("status");
     
      useEffect(() => {
  console.log("Fetching seller orders...");
  console.log("API Domain:", import.meta.env.VITE_API_DOMAIN);
  console.log("Token:", localStorage.getItem("token"));

  axios.get(`${import.meta.env.VITE_API_DOMAIN}/api/seller/orders-list`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    },
    withCredentials: true, params: {
    status: status  
  }
  })
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
    <div className='container m-auto'>
       <h1 className='text-2xl font-bold text-center mb-3'>Orders</h1>
       <div className=' gap-4'>
       {orders.slice().reverse().map((item) => (
          
        <OrderCard order={item} key={item._id}/>
         ))}
          
      
        
       
        
        
        </div>
       </div>
       
  )
}

export default Sellerpages