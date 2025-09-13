import React from 'react'
import { useNavigate } from 'react-router-dom'

const OrderCard = ({order}) => {
  const navigate=useNavigate()
  const clickHandler=(event)=>{
 navigate(`/seller/order-details?orderId=${order._id}`)
}
  return (
    <div
  className="card bg-white w-full shadow-md hover:shadow-xl hover:scale-[1.01] transition duration-300 cursor-pointer"
  onClick={clickHandler}
>
  <div className="flex items-center gap-5 p-5">
    {/* Product Images */}
    <div className="flex -space-x-3">
      {order.products.slice(0, 3).map((item) => (
        <figure
          key={item._id}
          className="relative w-16 h-16 rounded-lg overflow-hidden border shadow-sm"
        >
          {/* Product Image */}
          <img
            src={item.productId.productImage}
            alt=""
            className={`w-full h-full object-cover transition ${
              item.cancelled ? "opacity-50 grayscale" : ""
            }`}
          />

          {/* Cancelled Ribbon */}
          {item.cancelled && (
            <span className="absolute top-1 left-1 bg-red-600 text-white text-[10px] font-semibold px-1.5 py-0.5 rounded">
              Cancelled
            </span>
          )}

          {/* Quantity Badge */}
          <span className="absolute bottom-1 right-1 bg-green-600 text-white text-[10px] px-1.5 py-0.5 rounded-full">
            ×{item.quantity}
          </span>
        </figure>
      ))}
      {order.products.length > 3 && (
        <span className="flex items-center justify-center w-16 h-16 bg-gray-100 text-gray-600 text-sm rounded-lg border">
          +{order.products.length - 3}
        </span>
      )}
    </div>

    {/* Order Info */}
    <div className="flex-1">
      <h2 className="text-lg font-semibold text-gray-800">{order.name}</h2>
      <p className="text-sm text-gray-500 mt-1">
        <b>Ordered on:</b> {order.ordered_date.split("T")[0]}
      </p>

      {/* Status Badge */}
      <div className="mt-3">
        <span
          className={`px-3 py-1 text-xs font-semibold rounded-full shadow-sm
            ${
              order.status === "ordered"
                ? "bg-blue-100 text-blue-600"
                : order.status === "shipped"
                ? "bg-purple-100 text-purple-600"
                : order.status === "delivered"
                ? "bg-green-100 text-green-600"
                : order.status === "cancelled"
                ? "bg-red-100 text-red-600"
                : "bg-gray-100 text-gray-600"
            }`}
        >
          {order.status}
        </span>
      </div>
    </div>
  </div>
</div>


  )
}

export default OrderCard