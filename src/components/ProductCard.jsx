import api from "../api/axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setWishlist } from "../globalState/login/loginSlice";


const ProductCard = ({ product }) => {

  // React Router navigation
  const navigate = useNavigate();

  // Redux dispatch
  const dispatch = useDispatch()

  // Get login status & wishlist from Redux store
  const { isLoggedIn, wishlist } = useSelector(
    (state) => state.auth
  );

  // Local state → controls toast visibility
  const [showToast, setShowToast] = useState(false);

  // Convert wishlist IDs to string (safe handling)
  const wishlistIds = Array.isArray(wishlist)
    ? wishlist.map((id) => id.toString())
    : [];

  // Check if current product exists in wishlist
  const isInWishlist = wishlistIds.includes(product._id.toString());

  // Calculate total rating sum
  const sum = Array.isArray(product.rating)
    ? product.rating.reduce((acc, num) => acc + num, 0)
    : 0;

  // Calculate average rating safely
  const average =
    Array.isArray(product.rating) && product.rating.length > 0
      ? sum / product.rating.length
      : 0;

  // Wishlist handler (add/remove)
  const wishlistHandler = async (event) => {

    // Prevent card click triggering
    event.stopPropagation();
    event.preventDefault();

    console.log(isInWishlist);

    // If not logged in → redirect to login
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      // Choose API based on wishlist state
      const url = isInWishlist
        ? "/api/user/removewishlist"
        : "/api/user/addtowishlist";

      // API request
      const res = await api.put(
        url,
        { productId: product._id },
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      console.log(res.data.wishlist);

      // Update Redux wishlist state
      dispatch(setWishlist({ wishlist: res.data.wishlist }));

    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  //  Add to cart handler
  const clickHandler = async (event) => {

    // Prevent card click navigation
    event.stopPropagation();
    event.preventDefault();

    if (isLoggedIn) {
      try {
        const token = localStorage.getItem("token");

        // Add product to cart
        const res1 = await api.put(
          "/api/user/addtocart",
          { productId: product._id },
          { withCredentials: true }
        );

        // Remove product from wishlist after adding to cart
        const res2 = await api.put(
          "/api/user/removewishlist",
          { productId: product._id },
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          }
        );

        // Show success toast
        setShowToast(true);

        // Hide toast + reload page (not ideal UX)
        setTimeout(() => {
          setShowToast(false);
          window.location.reload(); // full page reload
        }, 2000);

      } catch (err) {
        console.log(err.response?.data || err.message);
      }
    } else {
      navigate("/login"); // redirect if not logged in
    }
  };

  //  Card click → navigate to product details page
  const cardClickHandler = () => {
    if (!product.isAvailable) return; // block navigation if out of stock
    navigate(`/product?productId=${product._id}`);
  };

  return (
    <div className="relative">

      {/*  Wishlist Button (only if logged in) */}
      {isLoggedIn && (<button
        onClick={wishlistHandler}
        className="absolute top-3 right-3 z-20 
        w-10 h-10 flex items-center justify-center 
        rounded-full bg-white/80 backdrop-blur-md 
        shadow-md transition-all duration-300 
        hover:scale-110 active:scale-95"
      >
        {/* Heart icon changes based on wishlist status */}
        <span
          className={`text-xl ${isInWishlist ? "text-red-500 scale-110" : "text-gray-400"
            }`}
        >
          {isInWishlist ? "❤" : "♡"}
        </span>
      </button>)}

      {/*  Product Card */}
      <div
        className="card bg-white shadow-md hover:shadow-xl transition duration-300 rounded-2xl overflow-hidden cursor-pointer h-full"
        onClick={cardClickHandler}
      >

        {/* Product Image */}
        <figure className="bg-gray-50 h-48 flex items-center justify-center">
          <img
            src={product?.productImage} // optional chaining prevents crash
            alt={product.productName}
            className="object-contain h-full p-3"
          />
        </figure>

        {/* Card Content */}
        <div className="card-body p-4">

          {/* Brand */}
          <h2 className="card-title text-lg font-bold text-gray-800">
            {product.brandName}
          </h2>

          {/* Product Name */}
          <p className="text-sm text-gray-600">{product.productName}</p>

          {/* Weight */}
          <p className="text-xs text-gray-500">({product.weight})</p>

          {/* Stock Info */}
          <p className="text-sm text-red-500 font-medium">
            Only {product.quantity} left!
          </p>

          {/*  Price Section */}
          <div className="mt-2">
            {product.salePrice ? (
              <div className="flex items-center gap-2">

                {/* Sale Price */}
                <p className="text-lg font-bold text-red-600">
                  ₹ {product.salePrice}
                </p>

                {/* Original Price */}
                <p className="text-sm text-gray-500 line-through">
                  ₹ {product.price}
                </p>

                {/* Discount percentage */}
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
                  name={`avg-rating-${product._id}`} // unique per product
                  className="mask mask-star-2 bg-orange-400"
                  checked={Math.round(average) === star}
                  readOnly
                />
              ))}
            </div>
          )}

          {/* Add to Cart Button */}
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

      {/*  Toast Notification */}
      {showToast && (
        <div className="fixed top-5 right-5 bg-green-600 text-white px-5 py-3 rounded-lg shadow-lg animate-fade-in-out">
          ✅ Product added to cart
        </div>
      )}
    </div>
  );
};

export default ProductCard;