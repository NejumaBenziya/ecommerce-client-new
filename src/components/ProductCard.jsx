import api from "../api/axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setWishlist } from "../globalState/login/loginSlice";


const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const { isLoggedIn, wishlist } = useSelector(
    (state) => state.auth
  );

  const [showToast, setShowToast] = useState(false);


  const wishlistIds = Array.isArray(wishlist)
    ? wishlist.map((id) => id.toString())
    : [];
  const isInWishlist = wishlistIds.includes(product._id.toString());
  const sum = Array.isArray(product.rating)
    ? product.rating.reduce((acc, num) => acc + num, 0)
    : 0;
  const average =
    Array.isArray(product.rating) && product.rating.length > 0
      ? sum / product.rating.length
      : 0;
  //  wishlist handler
  const wishlistHandler = async (event) => {
    event.stopPropagation();
    event.preventDefault();
    console.log(isInWishlist);

    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const url = isInWishlist
        ? "/api/user/removewishlist"
        : "/api/user/addtowishlist";

      const res = await api.put(
        url,
        { productId: product._id },
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
      console.log(res.data.wishlist);

      dispatch(setWishlist({ wishlist: res.data.wishlist }));
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  const clickHandler = async (event) => {
    event.stopPropagation();
    event.preventDefault();

    if (isLoggedIn) {
      try {
        const token = localStorage.getItem("token");

        const res1 = await api.put(
          "/api/user/addtocart",
          { productId: product._id },
          { withCredentials: true }
        );
        const res2 = await api.put(
          "/api/user/removewishlist",
          { productId: product._id },
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          }
        );

        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
          window.location.reload();// reload after toast
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
      {/*  Wishlist Button */}
      {isLoggedIn && (<button
        onClick={wishlistHandler}
        className="absolute top-3 right-3 z-20 
        w-10 h-10 flex items-center justify-center 
        rounded-full bg-white/80 backdrop-blur-md 
        shadow-md transition-all duration-300 
        hover:scale-110 active:scale-95"
      >
        <span
          className={`text-xl ${isInWishlist ? "text-red-500 scale-110" : "text-gray-400"
            }`}
        >
          {isInWishlist ? "❤" : "♡"}
        </span>
      </button>)}

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
