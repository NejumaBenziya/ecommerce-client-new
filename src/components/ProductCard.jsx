import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const isLoggedin = useSelector((state) => state.auth.isLoggedIn);

  const [showToast, setShowToast] = useState(false);

  const sum = Array.isArray(product.rating)
    ? product.rating.reduce((acc, num) => acc + num, 0)
    : 0;
  const average =
    Array.isArray(product.rating) && product.rating.length > 0
      ? sum / product.rating.length
      : 0;

  const clickHandler = async (event) => {
    event.stopPropagation(); 
    event.preventDefault();

    if (isLoggedin) {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.put(
          `${import.meta.env.VITE_API_DOMAIN}/api/user/addtocart`,
          { productId: product._id },
          { headers: { Authorization: `Bearer ${token}` }, withCredentials: true }
        );

        console.log(res.data);

       
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
        }, 2000);
      } catch (err) {
        console.log(err.response?.data || err.message);
      }
    } else {
      navigate("/login");
    }
  };

  const cardClickHandler = () => {
    if (!product.isAvailable) return;
    navigate(`/product?productId=${product._id}`);
  };

  return (
   <div className="relative">
  {/* Card */}
  <div  
    className="card bg-white shadow-md hover:shadow-xl transition duration-300 rounded-2xl overflow-hidden cursor-pointer h-full"
    onClick={cardClickHandler}
  >
    {/* Product Image */}
    <figure className="bg-gray-50 h-48 flex items-center justify-center">
      <img
        src={product.productImage}
        alt={product.productName}
        className="object-contain h-full p-3"
      />
    </figure>

    {/* Card Content */}
    <div className="card-body p-4">
      <h2 className="card-title text-lg font-bold text-gray-800">
        {product.brandName}
      </h2>
      <p className="text-sm text-gray-600">{product.productName}</p>
      <p className="text-xs text-gray-500">({product.weight})</p>
      <p className="text-sm text-red-500 font-medium">
        Only {product.quantity} left!
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
    <p className="text-lg font-bold text-green-600">₹ {product.price}</p>
  )}
</div>


      {/* Rating Stars */}
      {average > 0 && (
        <div className="rating rating-sm mt-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <input
              key={star}
              type="radio"
              name={`avg-rating-${product._id}`}
              className="mask mask-star-2 bg-orange-400"
              checked={Math.round(average) === star}
              readOnly
            />
          ))}
        </div>
      )}

      {/* Button */}
      <div className="card-actions justify-end mt-3">
        <button
          disabled={!product.isAvailable}
          className={`btn w-full rounded-lg shadow-md hover:scale-105 transition-transform ${!product.isAvailable ? "btn-disabled" : "btn-success"}`}
          onClick={clickHandler}
        >
          {product.isAvailable ? "🛒 Add to cart" : "Out of Stock"}
        </button>
      </div>
    </div>
  </div>

  {/* Toast Notification */}
  {showToast && (
    <div className="fixed top-5 right-5 bg-green-600 text-white px-5 py-3 rounded-lg shadow-lg animate-fade-in-out">
      ✅ Product added to cart
    </div>
  )}
</div>

  );
};

export default ProductCard;
