import api from "../api/axios";
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import CancelModal from './CancelModal';

const UserOrdercard = ({ product, productStatus ,orderId }) => {
   
    console.log(product.productId);
    console.log(product);
    
    const [rating, setRating] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
     const handleCancel = async (event) => {
  try {
   const res = await api.put(
  "/api/user/cancel-order",
  { orderId, productId: product.productId._id },
  { withCredentials: true }
);



    console.log(res.data);
     setIsModalOpen(false);
  } catch (err) {
    console.log(err.response);
  }
};

   
  const handleRatingChange = async (value) => {
    setRating(value);
   
    try {
    const res = await api.post(
  "/api/user/review",
  { product_id: product.productId._id, rating: value },
  { withCredentials: true }
);


    console.log("  Rating done :", res.data);
  } catch (err) {
    console.error(" Error on rating :", err.response?.data || err.message);
  }
    
   
  };
 
  return (
    <div className="card bg-base-100 w-96 shadow-sm">
         <div className='grid grid-cols-4 gap-4'>
      
          <figure >
    <img
      src={product.productId.productImage}
      alt="" />
  </figure>
       
        
          
        
</div>
  <div className="card-body">
     
    <h2 className="card-title">{product.productId.productName}</h2>

{/* ✅ Price Section */}
<div className="mt-2">
  {product.productId.salePrice ? (
    <div className="flex flex-col">
      {/* Discounted Price */}
      <div className="flex items-center gap-2">
        <p className="text-lg font-bold text-red-600">
          ₹ {product.productId.salePrice}
        </p>
        <p className="text-sm text-gray-500 line-through">
          ₹ {product.productId.price}
        </p>
      </div>

      {/* Subtotal */}
      <p className="text-sm text-gray-700">
        Qty: {product.quantity} × ₹ {product.productId.salePrice} ={" "}
        <span className="font-semibold">
          ₹ {product.quantity * product.productId.salePrice}
        </span>
      </p>
    </div>
  ) : (
    <div className="flex flex-col">
      <p className="text-lg font-bold text-green-600">
        ₹ {product.productId.price}
      </p>
      <p className="text-sm text-gray-700">
        Qty: {product.quantity} × ₹ {product.productId.price} ={" "}
        <span className="font-semibold">
          ₹ {product.quantity * product.productId.price}
        </span>
      </p>
    </div>
  )}
</div>


       
    <p>{product.cancelled===false?productStatus:"cancelled"}</p>
    <div className="card-actions justify-end">
        {productStatus === "delivered"&&product.reviewDone===false ? (
  <>
    <div className="rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <input
          key={star}
          type="radio"
          name="rating"
          className="mask mask-star"
          aria-label={`${star} star`}
          checked={rating === star}
          onChange={() => handleRatingChange(star)}
        />
      ))}
    </div>
    <Link to={`/review?productId=${product.productId._id}&rating=${rating}&orderId=${orderId}`}>
      Add a review
    </Link>
  </>
) : productStatus === "cancelled"||product.cancelled===true ||product.reviewDone===true? (
  ""
) : (
  <div className="card-actions justify-end">
    <button
      onClick={() => setIsModalOpen(true)}
      className="btn btn-error btn-sm mt-3"
    >
      Cancel
    </button>
    <CancelModal
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      onConfirm={handleCancel}
      itemName={product.productId.productName}
    />
  </div>
)}

      
    </div>
  </div>
</div>
  )
}

export default UserOrdercard