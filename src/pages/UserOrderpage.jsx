import axios from 'axios';
import React, { useEffect, useState } from 'react'
import UserOrdercard from '../components/UserOrdercard';

const UserOrderpage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_DOMAIN}/api/user/user-orders`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      withCredentials: true
    })
      .then(res => {
        setOrders(res.data.orders);
        console.log("Response:", res.data);
      })
      .catch(err => {
        if (err.response) {
          console.error("Error Response:", err.response);
        } else {
          console.error("Error:", err.message);
        }
      });
  }, []);

  return (
    <div className="container mx-auto mt-10"> 
     
      <h1 className="text-2xl font-bold text-center mb-6">My Orders</h1>

      <div className="flex flex-col items-center gap-6">
       {orders
  .slice()
  .reverse()
  .map((item) =>
    item.products.map((itm) => (
      <UserOrdercard
        product={itm}
        productStatus={item.status} 
        orderId={item._id}
        key={itm._id}
      />
    ))
  )}

      </div>
    </div>
  );
}

export default UserOrderpage;
