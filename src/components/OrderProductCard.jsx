import React from 'react'

/**
 * OrderProductCard Component
 * 
 * Props:
 * - product → product details object
 * - quantity → number of items ordered
 * - cancelled → boolean (whether item is cancelled)
 * 
 * Purpose:
 * - Displays a product inside an order
 * - Shows image, name, quantity, and price
 * - Visually highlights cancelled items
 */
const OrderProductCard = ({ product, quantity, cancelled }) => {
  return (
    <div
      className={`card bg-base-100 shadow-md h-96 relative rounded-xl overflow-hidden transition 
        ${cancelled ? "border-2 border-red-500 opacity-80" : "hover:shadow-xl"}`}
      //  If cancelled → red border + reduced opacity
      //  Else → hover shadow effect
    >
      
      {/* Product Image Section */}
      <figure className="relative">
        <img
          src={product?.productImage} // optional chaining avoids crash if product is undefined
          alt={product.productName}   // product name for accessibility ( may crash if product is null)
          className={`w-full h-48 object-cover transition ${
            cancelled ? "grayscale" : ""
          }`} // grayscale effect if cancelled
        />

        {/*  Cancelled Badge */}
        {cancelled && (
          <span className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-md shadow">
            Cancelled
          </span>
        )}
      </figure>

      {/*  Card Body */}
      <div className="card-body text-center">

        {/* Brand Name */}
        <h2 className="card-title text-lg font-bold text-gray-800">
          {product.brandName}
        </h2>

        {/* Product Name */}
        <p className="text-gray-600">{product.productName}</p>

        {/* Product Weight */}
        <p className="text-sm text-gray-500">({product.weight})</p>

        {/* Quantity Display */}
        <p className="text-sm text-gray-700">
          {quantity} item{quantity > 1 ? "s" : ""} {/* plural handling */}
        </p>

        {/* Price Section */}
        <div className="mt-2">

          {/* If sale price exists */}
          {product.salePrice ? (
            <div className="flex items-center gap-2">

              {/* Sale Price */}
              <p className="text-lg font-bold text-red-600">
                ₹ {product.salePrice}
              </p>

              {/* Original Price (strikethrough) */}
              <p className="text-sm text-gray-500 line-through">
                ₹ {product.price}
              </p>

              {/* Discount Percentage */}
              <span className="text-xs bg-red-100 text-red-600 font-semibold px-2 py-0.5 rounded-full">
                {Math.round(((product.price - product.salePrice) / product.price) * 100)}% OFF
              </span>
            </div>
          ) : (

            // Normal price (multiplied by quantity)
            <p className="text-lg font-bold text-green-600">
              ₹ {product.price * quantity}
            </p>

          )}
        </div>

      </div>
    </div>
  )
}

export default OrderProductCard