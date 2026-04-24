import CartCard from "../components/CartCard";
import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../components/Loader";

const Cartpage = () => {

  //  State to store cart products
  const [products, setProducts] = useState([]);

  //  Loading state for API call
  const [loading, setLoading] = useState(false);

  //  Navigation hook for redirecting user
  const navigate = useNavigate();

  //  Get current logged-in user from Redux store
  const user = useSelector((state) => state.auth.user);

  //  Fetch cart items whenever user changes
  useEffect(() => {

    //  If user logs out → clear cart
    if (!user) {
      setProducts([]);
      return;
    }

    //  Start loading before API call
    setLoading(true);

    api
      .get("/api/user/cart-list", {
        withCredentials: true, // send cookies for authentication
      })

      //  On success → update products
      .then((res) => {
        setProducts(res.data.products || []);
        setLoading(false);
      })

      //  On error → log + reset state
      .catch((err) => {
        setLoading(false);
        console.error("Error fetching cart:", err.response || err.message);
        setProducts([]);
      });

  }, [user]); //  runs whenever user changes


  //  Handle "Buy Now" click → navigate to order page
  const clickHandler = () => {
    navigate("/order", {
      state: {
        amount: discountedTotal, // pass total amount to next page
      },
    });
  };


  //  Calculate original total (without discount)
  const originalTotal = products.reduce(
    (acc, item) => acc + item.price * (item.quantity || 1),
    0
  );

  //  Calculate discounted total (use salePrice if available)
  const discountedTotal = products.reduce((acc, item) => {
    const price = item.salePrice ?? item.price;
    return acc + price * (item.quantity || 1);
  }, 0);

  //  Calculate savings
  const savings = originalTotal - discountedTotal;


  return (
    <div className="container m-auto px-4">

      {/*  Show loader while fetching cart */}
      {loading ? (
        <Loader />
      ) : (
        <>
          {/*  Page title */}
          <h1 className="text-2xl font-bold text-center mb-3">
            Your Cart
          </h1>

          {/*  If cart is empty */}
          {products.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-gray-500">
              <img
                src="https://th.bing.com/th/id/OIP.QDyzOevkSatwUqin3rRoowHaHa?w=180&h=180&c=7&r=0&o=7&pid=1.7&rm=3"
                alt="Empty Cart"
                className="w-40 h-40 mb-4"
              />
              <p className="text-lg font-medium">Your cart is empty</p>
              <p className="text-sm">
                Add some products to see them here
              </p>
            </div>
          ) : (
            <>
              {/*  List of cart items */}
              <div className="flex flex-col gap-4">
                {products.map((item) => (
                  <CartCard key={item._id} product={item} />
                ))}
              </div>

              {/*  Price summary section */}
              <div className="mt-6 p-4 border-t border-gray-200">

                {/* Original total */}
                <div className="flex justify-between text-gray-600 text-sm mb-2">
                  <p>Total Price (Before Discount):</p>
                  <p>₹ {originalTotal}</p>
                </div>

                {/* Savings (only if discount exists) */}
                {savings > 0 && (
                  <div className="flex justify-between text-red-500 text-sm mb-2">
                    <p>You Saved:</p>
                    <p>- ₹ {savings}</p>
                  </div>
                )}

                {/*Final amount */}
                <div className="flex justify-between font-semibold text-lg">
                  <p>Final Amount to Pay:</p>
                  <p className="text-green-600">
                    ₹ {discountedTotal}
                  </p>
                </div>
              </div>

              {/* Buy button */}
              <button
                className="btn btn-primary w-full mt-4"
                onClick={clickHandler}
              >
                Buy Now
              </button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Cartpage;