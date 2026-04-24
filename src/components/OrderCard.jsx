import React from 'react'
import { useNavigate } from 'react-router-dom'

/**
 * OrderCard Component
 * 
 * Purpose:
 * - Displays a summary of an order (seller view)
 * - Shows product images, quantity, cancelled status, and order info
 * - Navigates to order details page when clicked
 */
const OrderCard = ({order}) => {

  // Hook to programmatically navigate between routes
  const navigate = useNavigate()

  /**
   *  Click handler for entire card
   * - Navigates to order details page
   * - Passes orderId in query string
   */
  const clickHandler = (event) => {
    navigate(`/seller/order-details?orderId=${order._id}`)
  }

  return (
    <div
      className="card bg-white w-full shadow-md hover:shadow-xl hover:scale-[1.01] transition duration-300 cursor-pointer"
      onClick={clickHandler} // clicking card triggers navigation
    >
      <div className="flex items-center gap-5 p-5">

        {/*  Product Images Section */}
        <div className="flex -space-x-3">

          {/* Show only first 3 products */}
          {order.products.slice(0, 3).map((item) => (
            <figure
              key={item._id} // unique key for React list rendering
              className="relative w-16 h-16 rounded-lg overflow-hidden border shadow-sm"
            >

              {/* Product Image */}
              <img
                src={item.productId?.productImage} // optional chaining prevents crash if null
                alt={item.productId.productName} // product name for accessibility
                className={`w-full h-full object-cover transition ${
                  item.cancelled ? "opacity-50 grayscale" : ""
                }`} // dim + grayscale if cancelled
              />

              {/* Cancelled Label */}
              {item.cancelled && (
                <span className="absolute top-1 left-1 bg-red-600 text-white text-[10px] font-semibold px-1.5 py-0.5 rounded">
                  Cancelled
                </span>
              )}

              {/*  Quantity Badge */}
              <span className="absolute bottom-1 right-1 bg-green-600 text-white text-[10px] px-1.5 py-0.5 rounded-full">
                ×{item.quantity}
              </span>
            </figure>
          ))}

          {/*  Show remaining count if more than 3 products */}
          {order.products.length > 3 && (
            <span className="flex items-center justify-center w-16 h-16 bg-gray-100 text-gray-600 text-sm rounded-lg border">
              +{order.products.length - 3}
            </span>
          )}
        </div>

        {/* Order Info Section */}
        <div className="flex-1">

          {/* Customer Name */}
          <h2 className="text-lg font-semibold text-gray-800">
            {order.name}
          </h2>

          {/* Order Date (formatted from ISO string) */}
          <p className="text-sm text-gray-500 mt-1">
            <b>Ordered on:</b> {order.ordered_date.split("T")[0]}
          </p>

          {/*  Status Badge */}
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