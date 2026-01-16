import api from "../api/axios";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Orderpage() {
  const [data, setData] = useState({
    houseName: "",
    street: "",
    landMark: "",
    pincode: "",
    city: "",
    state: "",
    paymentMethod: "Net Banking",
  });

  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const amount = location.state?.amount;

  // 🔐 Protect direct access
  useEffect(() => {
    if (!amount) {
      toast.error("Invalid order amount");
      navigate("/cart");
    }
  }, [amount, navigate]);

  // ✅ Razorpay loader
  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      // =========================
      // ✅ CASH ON DELIVERY
      // =========================
      if (data.paymentMethod === "Cash on Delivery") {
        await api.post(
          "/api/user/order",
          {
            ...data,
            paymentMethod: "Cash on Delivery",
          },
          { withCredentials: true }
        );

        toast.success("✅ Order placed (Cash on Delivery)");
        navigate("/user-orders");
        return;
      }

      // =========================
      // ✅ ONLINE PAYMENT (RAZORPAY)
      // =========================
      const loaded = await loadRazorpay();
      if (!loaded) {
        toast.error("Razorpay SDK failed to load");
        return;
      }

      // 1️⃣ Create Razorpay order
      const orderRes = await api.post(
        "/api/user/create-order",
        { amount },
        { withCredentials: true }
      );

      const razorpayOrder = orderRes.data;

      // 2️⃣ Razorpay options
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: razorpayOrder.amount,
        currency: "INR",
        order_id: razorpayOrder.id,
        name: "My E-Commerce Store",
        description: "Order Payment",

        handler: async function (response) {
          // 3️⃣ Place order WITH payment details
          await api.post(
            "/api/user/order",
            {
              ...data,
              paymentMethod: "Net Banking",
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
            },
            { withCredentials: true }
          );

          toast.success("💳 Payment successful & order placed!");
          navigate("/user-orders");
        },

        theme: { color: "#22c55e" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      toast.error("❌ Payment failed or cancelled");
    } finally {
      setLoading(false);
    }
  };

  const changeHandler = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <form
        onSubmit={submitHandler}
        className="w-full max-w-4xl bg-white shadow-lg rounded-2xl p-8 space-y-6"
      >
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
          🏠 Shipping Details
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Address */}
          <div className="space-y-4">
            {["houseName", "street", "landMark", "pincode", "city", "state"].map(
              (field) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                    {field}
                  </label>
                  <input
                    type="text"
                    name={field}
                    className="w-full input input-bordered rounded-lg"
                    onChange={changeHandler}
                    value={data[field]}
                    required
                  />
                </div>
              )
            )}
          </div>

          {/* Payment */}
          <div className="space-y-4">
            <p className="text-sm font-medium text-gray-700 mb-2">
              Payment Method
            </p>
            <div className="flex flex-col gap-3">
              {["Net Banking", "Cash on Delivery"].map((method) => (
                <label
                  key={method}
                  className="flex items-center gap-2 p-3 border rounded-lg cursor-pointer"
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={method}
                    checked={data.paymentMethod === method}
                    onChange={changeHandler}
                    className="radio radio-success"
                  />
                  <span className="font-medium text-gray-700">
                    {method === "Net Banking" ? "💳 " : "🚚 "}
                    {method}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <button
          className="btn btn-success w-full mt-6 rounded-lg"
          type="submit"
          disabled={loading}
        >
          {loading ? "⏳ Processing..." : "🚀 Order Now"}
        </button>
      </form>
    </div>
  );
}

export default Orderpage;
