import api from "../api/axios";
import React, { useEffect, useState } from 'react'
import UserOrdercard from '../components/UserOrdercard';

const UserOrderpage = () => {

  //  state to store all user orders
  const [orders, setOrders] = useState([]);

  //  fetch orders from backend
  useEffect(() => {

    //  API call to get user orders
    api.get(
      "/api/user/user-orders",
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
          // backend error response
          console.error("Error Response:", err.response);
        } else {
          // network or unknown error
          console.error("Error:", err.message);
        }
      });

  }, [orders]);
  return (
    <div className="container mx-auto mt-10"> 

      {/* page title */}
      <h1 className="text-2xl font-bold text-center mb-6">My Orders</h1>

      {/*  container for order cards */}
      <div className="flex flex-col items-center gap-6">

        {/*  reverse orders to show latest first */}
        {orders
          .slice()
          .reverse()
          .map((item) =>

            //  each order may contain multiple products
            item.products.map((itm) => (

              //  render each product inside order
              <UserOrdercard
                product={itm}                 // individual product
                productStatus={item.status}  // overall order status
                orderId={item._id}           // order id
                key={itm._id}               
              />

            ))
          )}

      </div>
    </div>
  );
}

export default UserOrderpage;