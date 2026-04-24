import api from "../api/axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setWishlist } from "../globalState/login/loginSlice";

function ProductDetails({ product }) {

  // React Router navigation
  const navigate = useNavigate();

  // Redux dispatch
  const dispatch = useDispatch()

  // Get login state + wishlist from Redux
  const { isLoggedIn, wishlist } = useSelector(
    (state) => state.auth
  );

  // Local state → reviews list
  const [reviews, setReviews] = useState([]);

  // Local state → toast visibility
  const [showToast, setShowToast] = useState(false);

  // Fetch reviews when product changes
  useEffect(() => {
    api.get("/api/user/review-list", {
      params: { productId: product._id },
    })
      .then((res) => {
        setReviews(res.data.reviews || []);
        console.log("Fetched reviews:", res.data.reviews);
      })
      .catch((err) => {
        console.error("Error fetching reviews:", err.response || err.message);
      });
  }, [product._id]);

  // Convert wishlist IDs safely
  const wishlistIds = Array.isArray(wishlist)
    ? wishlist.map((id) => id?.toString())
    : [];

  // Check if current product is in wishlist
  const isInWishlist =
    product?._id &&
    wishlistIds.includes(product._id.toString());

  // Calculate rating sum
  const sum = Array.isArray(product.rating)
    ? product.rating.reduce((acc, num) => acc + num, 0)
    : 0;

  // Calculate average rating
  const average =
    Array.isArray(product.rating) && product.rating.length > 0
      ? sum / product.rating.length
      : 0;

  //  Wishlist handler (add/remove)
  const wishlistHandler = async (event) => {

    // Prevent parent click (card navigation)
    event.stopPropagation();
    event.preventDefault();

    console.log(isInWishlist);

    // Redirect to login if not authenticated
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      // Choose API endpoint dynamically
      const url = isInWishlist
        ? "/api/user/removewishlist"
        : "/api/user/addtowishlist";

      // API call
      const res = await api.put(
        url,
        { productId: product._id },
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      console.log(res.data.wishlist);

      // Update Redux wishlist
      dispatch(setWishlist({ wishlist: res.data.wishlist }));

    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  // Add to cart handler
  const clickHandler = async (event) => {

    // Prevent card click navigation
    event.stopPropagation();
    event.preventDefault();

    if (isLoggedIn) {
      try {
        const token = localStorage.getItem("token");
        const productId = product._id;

        // Add product to cart
        const res1 = await api.put(
          "/api/user/addtocart",
          { productId: product._id },
          { withCredentials: true }
        );

        // Remove product from wishlist after adding
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

        // Hide toast + reload page
        setTimeout(() => {
          setShowToast(false);
          window.location.reload(); //  full page reload
        }, 2000);

      } catch (err) {
        console.log(err.response?.data || err.message);
      }
    } else {
      navigate("/login"); // redirect if not logged in
    }
  };

  return (
    <div className="relative max-w-lg mx-auto">

      {/*  Wishlist Button (only when logged in) */}
      {isLoggedIn && (<button
        onClick={wishlistHandler}
        className="absolute top-3 right-3 z-20 
        w-10 h-10 flex items-center justify-center 
        rounded-full bg-white/80 backdrop-blur-md 
        shadow-md transition-all duration-300 
        hover:scale-110 active:scale-95"
      >
        {/* Heart icon changes based on wishlist state */}
        <span
          className={`text-xl ${isInWishlist ? "text-red-500 scale-110" : "text-gray-400"
            }`}
        >
          {isInWishlist ? "❤" : "♡"}
        </span>
      </button>)}

      {/* Product Card */}
      <div className="card bg-white shadow-lg hover:shadow-2xl transition duration-300 rounded-2xl overflow-hidden">

        {/* 🖼 Product Image */}
        <figure className="bg-gray-50 h-56 flex items-center justify-center">
          <img
            src={product.productImage}
            alt={product.productName}
            className="object-contain h-full p-4"
          />
        </figure>

        {/*  Product Details */}
        <div className="card-body p-6">

          {/* Brand */}
          <h2 className="card-title text-xl font-bold text-gray-900">
            {product.brandName}
          </h2>

          {/* Name */}
          <p className="text-base text-gray-700">{product.productName}</p>

          {/* Weight */}
          <p className="text-sm text-gray-500">({product.weight})</p>

          {/* Stock info */}
          <p className="text-sm text-red-500 font-medium mt-1">
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

                {/* Discount % */}
                <span className="text-xs bg-red-100 text-red-600 font-semibold px-2 py-0.5 rounded-full">
                  {Math.round(((product.price - product.salePrice) / product.price) * 100)}% OFF
                </span>
              </div>
            ) : (
              <p className="text-lg font-bold text-green-600">₹ {product.price}</p>
            )}
          </div>

          {/*  Average Rating */}
          {average > 0 && (
            <div className="rating rating-md mt-3">
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

          {/*  Add to Cart Button */}
          <div className="card-actions mt-5">
            <button
              className="btn btn-success w-full rounded-lg shadow-md hover:scale-105 transition-transform"
              onClick={clickHandler}
            >
              🛒 Add to Cart
            </button>
          </div>

          {/*  Reviews Section */}
          <div className="reviews mt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Customer Reviews
            </h3>

            {/* If no reviews */}
            {reviews.length === 0 ? (
              <p className="text-gray-500 text-center">No reviews yet.</p>
            ) : (
              // Sort reviews by latest first
              [...reviews]
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .map((review, index) => (
                  <div
                    key={index}
                    className="border rounded-lg p-4 mb-4 shadow-sm bg-gray-50"
                  >

                    {/*  Username + Date */}
                    <div className="flex justify-between items-center mb-2">
                      {review.review_by && review.review_by.name && (
                        <p className="font-semibold text-gray-800">
                          {review.review_by.name}
                        </p>
                      )}
                      {review.createdAt && (
                        <p className="text-xs text-gray-500">
                          {new Date(review.createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </p>
                      )}
                    </div>

                    {/*  Rating */}
                    {review.rating && review.rating > 0 && (
                      <div className="rating rating-sm mb-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <input
                            key={star}
                            type="radio"
                            name={`review-rating-${index}`}
                            className="mask mask-star-2 bg-orange-400"
                            checked={Math.round(review.rating) === star}
                            readOnly
                          />
                        ))}
                      </div>
                    )}

                    {/*  Feedback */}
                    {review.feedback && review.feedback.trim() !== "" && (
                      <p className="text-gray-700 italic">“{review.feedback}”</p>
                    )}
                  </div>
                ))
            )}
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
}

export default ProductDetails;