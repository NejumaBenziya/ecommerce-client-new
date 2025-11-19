import React from 'react'

const OrderProductCard = ({ product, quantity, cancelled }) => {
  return (
    <div
      className={`card bg-base-100 shadow-md h-96 relative rounded-xl overflow-hidden transition 
        ${cancelled ? "border-2 border-red-500 opacity-80" : "hover:shadow-xl"}`}
    >
      {/* Product Image */}
      <figure className="relative">
        <img
          src={product.productImage}
          alt="product pic"
          className={`w-full h-48 object-cover transition ${
            cancelled ? "grayscale" : ""
          }`}
        />

        {/* Cancelled Badge */}
        {cancelled && (
          <span className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-md shadow">
            Cancelled
          </span>
        )}
      </figure>

      {/* Card Body */}
      <div className="card-body text-center">
        <h2 className="card-title text-lg font-bold text-gray-800">
          {product.brandName}
        </h2>
        <p className="text-gray-600">{product.productName}</p>
        <p className="text-sm text-gray-500">({product.weight})</p>
        <p className="text-sm text-gray-700">
          {quantity} item{quantity > 1 ? "s" : ""}
        </p>
       {/* Price Section */}
<div className="mt-2">
  {product.salePrice ? (
    <div className="flex items-center gap-2">
      <p className="text-lg font-bold text-red-600">
        ₹ {product.salePrice}
      </p>
      <p className="text-sm text-gray-500 line-through">
        ₹ {product.price}
      </p>
      <span className="text-xs bg-red-100 text-red-600 font-semibold px-2 py-0.5 rounded-full">
        {Math.round(((product.price - product.salePrice) / product.price) * 100)}% OFF
      </span>
    </div>
  ) : (
    <p className="text-lg font-bold text-green-600">₹ {product.price*quantity}</p>
  )}
</div>

      </div>
    </div>
  )
}

export default OrderProductCard
