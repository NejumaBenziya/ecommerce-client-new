import CartCard from "../components/CartCard";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Cartpage = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (!user) {
      setProducts([]); // 🔥 clear cart on user change
      return;
    }

    axios
      .get("/api/user/cart-list", {
        withCredentials: true, // ✅ cookie auth only
      })
      .then((res) => {
        setProducts(res.data.products || []);
      })
      .catch((err) => {
        console.error("Error fetching cart:", err.response || err.message);
        setProducts([]);
      });
  }, [user]); // ✅ REFRESH WHEN USER CHANGES

  const clickHandler = () => {
    navigate("/order");
  };

  // 🧮 Totals
  const originalTotal = products.reduce(
    (acc, item) => acc + item.price * (item.quantity || 1),
    0
  );

  const discountedTotal = products.reduce((acc, item) => {
    const price = item.salePrice ?? item.price;
    return acc + price * (item.quantity || 1);
  }, 0);

  const savings = originalTotal - discountedTotal;

  return (
    <div className="container m-auto px-4">
      <h1 className="text-2xl font-bold text-center mb-3">Your Cart</h1>

      {products.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 text-gray-500">
          <img
            src="https://th.bing.com/th/id/OIP.QDyzOevkSatwUqin3rRoowHaHa?w=180&h=180&c=7&r=0&o=7&pid=1.7&rm=3"
            alt="Empty Cart"
            className="w-40 h-40 mb-4"
          />
          <p className="text-lg font-medium">Your cart is empty</p>
          <p className="text-sm">Add some products to see them here</p>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-4">
            {products.map((item) => (
              <CartCard key={item._id} product={item} />
            ))}
          </div>

          <div className="mt-6 p-4 border-t border-gray-200">
            <div className="flex justify-between text-gray-600 text-sm mb-2">
              <p>Total Price (Before Discount):</p>
              <p>₹ {originalTotal}</p>
            </div>

            {savings > 0 && (
              <div className="flex justify-between text-red-500 text-sm mb-2">
                <p>You Saved:</p>
                <p>- ₹ {savings}</p>
              </div>
            )}

            <div className="flex justify-between font-semibold text-lg">
              <p>Final Amount to Pay:</p>
              <p className="text-green-600">₹ {discountedTotal}</p>
            </div>
          </div>

          <button
            className="btn btn-primary w-full mt-4"
            onClick={clickHandler}
          >
            Buy Now
          </button>
        </>
      )}
    </div>
  );
};

export default Cartpage;
