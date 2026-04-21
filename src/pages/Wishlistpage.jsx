import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { setWishlist } from "../globalState/login/loginSlice";

const Wishlist = () => {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const wishlist = useSelector((state) => state.auth.wishlist || []);
  useEffect(() => {
    if (wishlist.length > 0) {
      api
        .get("/api/user/wishlist", {
          withCredentials: true,
        })
        .then((res) => {
          setProducts(res.data ||[]);
          console.log(products);

        })
        .catch((err) => console.log(err));
    }
  }, [wishlist]);
  //  Remove from wishlist
  const removeHandler = async (productId) => {
    try {
      const res = await api.put(
        "/api/user/removewishlist",
        { productId },
        { withCredentials: true }
      );

      dispatch(setWishlist(res.data.wishlist));
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Title */}
      <h1 className="text-3xl font-bold mb-6 text-center">
        ❤️ My Wishlist
      </h1>

      {/* Empty State */}
      {wishlist.length === 0 ? (
        <div className="text-center mt-16">
          <p className="text-gray-500 text-lg">
            Your wishlist is empty 😢
          </p>
          <button
            onClick={() => navigate("/")}
            className="mt-4 btn btn-primary"
          >
            Explore Products
          </button>
        </div>
      ) : (
        /* Product Grid */
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <div
              key={product._id}
              className="relative bg-white rounded-2xl shadow-md hover:shadow-xl transition p-4"
            >
              {/* Remove Button */}
              <button
                onClick={() => removeHandler(product._id)}
                className="absolute top-2 right-2 text-red-500 text-xl hover:scale-110 transition"
              >
                ❤️
              </button>

              {/* Product Click */}
              <div
                onClick={() =>
                  navigate(`/product?productId=${product._id}`)
                }
                className="cursor-pointer"
              >
                {/* Image */}
                <img
                  src={product.productImage}
                  alt={product.productName}
                  className="h-40 mx-auto object-contain"
                />

                {/* Info */}
                <h2 className="font-semibold mt-2 text-gray-800">
                  {product.productName}
                </h2>

                <p className="text-sm text-gray-500">
                  {product.brandName}
                </p>

                {/* Price */}
                <div className="mt-2">
                  {product.salePrice ? (
                    <div className="flex gap-2 items-center">
                      <span className="text-red-600 font-bold">
                        ₹{product.salePrice}
                      </span>
                      <span className="line-through text-gray-400 text-sm">
                        ₹{product.price}
                      </span>
                    </div>
                  ) : (
                    <span className="text-green-600 font-bold">
                      ₹{product.price}
                    </span>
                  )}
                </div>
              </div>

              {/* Button */}
              <button
                onClick={() =>
                  navigate(`/product?productId=${product._id}`)
                }
                className="btn btn-success w-full mt-3"
              >
                View Product
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;