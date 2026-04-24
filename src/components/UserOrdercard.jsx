import api from "../api/axios";
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import CancelModal from './CancelModal';

const UserOrdercard = ({ product, productStatus ,orderId }) => {
   
    // Debugging logs (to inspect product structure)
    console.log(product.productId);
    console.log(product);
    
    //  State to store selected rating
    const [rating, setRating] = useState(0);

    //  State to control cancel modal visibility
    const [isModalOpen, setIsModalOpen] = useState(false);

    //  Handle order cancellation
    const handleCancel = async (event) => {
      try {

        // API call to cancel specific product inside order
        const res = await api.put(
          "/api/user/cancel-order",
          { orderId, productId: product.productId._id },
          { withCredentials: true }
        );

        console.log(res.data);

        // Close modal after success
        setIsModalOpen(false);

      } catch (err) {
        console.log(err.response);
      }
    };

  // Handle rating selection
  const handleRatingChange = async (value) => {

    // Update UI rating immediately
    setRating(value);
   
    try {

      // API call to submit rating
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

      {/* Product Image Section */}
      <div className='grid grid-cols-4 gap-4'>
        <figure>
          <img
            src={product.productId?.productImage} // optional chaining prevents crash if undefined
            alt=""
          />
        </figure>
      </div>

      {/*  Card Body */}
      <div className="card-body">
     
        {/* 🏷 Product Name */}
        <h2 className="card-title">
          {product.productId?.productName} {/* optional chaining added */}
        </h2>

        {/*  Price Section */}
        <div className="mt-2">

          {/* If product has sale price */}
          {product.productId.salePrice ? (
            <div className="flex flex-col">

              {/* Discounted price + original price */}
              <div className="flex items-center gap-2">
                <p className="text-lg font-bold text-red-600">
                  ₹ {product.productId.salePrice}
                </p>
                <p className="text-sm text-gray-500 line-through">
                  ₹ {product.productId.price}
                </p>
              </div>

              {/* Subtotal calculation */}
              <p className="text-sm text-gray-700">
                Qty: {product.quantity} × ₹ {product.productId.salePrice} ={" "}
                <span className="font-semibold">
                  ₹ {product.quantity * product.productId.salePrice}
                </span>
              </p>
            </div>

          ) : (

            // If no sale price
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

        {/* Status display */}
        <p>
          {/* If product individually cancelled → show cancelled */}
          {product.cancelled === false ? productStatus : "cancelled"}
        </p>

        {/*  Actions Section */}
        <div className="card-actions justify-end">

          {/*  Show rating only if delivered & not reviewed */}
          {productStatus === "delivered" && product.reviewDone === false ? (
            <>
              {/* Rating stars */}
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

              {/* Navigate to detailed review page */}
              <Link to={`/review?productId=${product.productId._id}&rating=${rating}&orderId=${orderId}`}>
                Add a review
              </Link>
            </>
          ) : 

          //  Hide actions if cancelled OR already reviewed
          productStatus === "cancelled" || product.cancelled === true || product.reviewDone === true ? (
            ""
          ) : (

            //  Cancel button for active orders
            <div className="card-actions justify-end">

              <button
                onClick={() => setIsModalOpen(true)}
                className="btn btn-error btn-sm mt-3"
              >
                Cancel
              </button>

              {/* Confirmation Modal */}
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