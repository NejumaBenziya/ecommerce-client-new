import React, { useEffect, useState } from "react";
import OrderProductCard from "../components/OrderProductCard";
import { useLocation } from "react-router-dom";
import axios from "axios";

const OrderDetailspage = () => {
  const [order, setOrder] = useState(null);

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const orderId = params.get("orderId");

  useEffect(() => {
    if (orderId) {
      axios.get(
  "/api/seller/order-details",   // ✅ proxy-relative
  {
    params: { orderId },
    withCredentials: true,       // ✅ cookie auth only
  }
)
        .then((res) => setOrder(res.data.order))
        .catch((err) => console.log(err));
    }
  }, [orderId]);

  if (!order) return <p className="text-center mt-10">Loading...</p>;

  const clickHandler = async (event) => {
    const status = event.target.value;

    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_DOMAIN}/api/seller/status-update`,
        { orderId: order._id, status: status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true,
        }
      );

      console.log("Status updated:", res.data);
    } catch (err) {
      console.error("Error updating status:", err.response?.data || err.message);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="bg-white shadow-lg rounded-2xl p-6 max-w-4xl mx-auto">
        {/* Order products */}
        <h2 className="text-2xl font-semibold mb-4 text-center">Order Details</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {order.products?.map((item, index) => (
            <OrderProductCard
              key={index}
              product={item.productId}
              quantity={item.quantity}
              cancelled={item.cancelled}
            />
          ))}
        </div>

        {/* Customer info */}
        <div className="space-y-2 text-gray-700">
          <p><span className="font-semibold">Customer name:</span> {order.name}</p>
          <p><span className="font-semibold">Phone:</span> {order.phone}</p>
          <p className="font-semibold">Address:</p>
          <ul className="pl-4 list-disc text-gray-600">
            <li>House name: {order.houseName}</li>
            <li>Street: {order.street}</li>
            <li>Landmark: {order.landMark}</li>
            <li>Pincode: {order.pincode}</li>
            <li>City: {order.city}</li>
            <li>State: {order.state}</li>
          </ul>

          <p><span className="font-semibold">Payment method:</span> {order.paymentMethod}</p>
          <p>
            <span className="font-semibold">Ordered date:</span>{" "}
            {new Date(order.ordered_date).toLocaleDateString()}
          </p>
          <p><span className="font-semibold">Status:</span> {order.status}</p>
        </div>

        {order.status==="cancelled"?"":<div className="mt-6 flex justify-end">
          <select
            defaultValue="Update status"
            className="select select-bordered w-48"
            onChange={clickHandler}
          >
            <option disabled>Update status</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
          </select>
        </div>}
        
      </div>
    </div>
  );
};

export default OrderDetailspage;
