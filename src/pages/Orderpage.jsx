import api from "../api/axios";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setCartLength} from "../globalState/login/loginSlice";

function Orderpage() {

  const dispatch = useDispatch();
  // State to store shipping address + selected payment method
  const [data, setData] = useState({
    houseName: "",
    street: "",
    landMark: "",
    pincode: "",
    city: "",
    state: "",
    paymentMethod: "Net Banking", // default payment method
  });

  // Loading state for submit button
  const [loading, setLoading] = useState(false);

  //  Router hooks
  const location = useLocation();
  const navigate = useNavigate();

  //  Amount passed from cart page
  const amount = location.state?.amount;

  //  Protect direct access (user should not open order page manually)
  useEffect(() => {
    if (!amount) {
      toast.error("Invalid order amount");
      navigate("/cart"); // redirect back to cart
    }
  }, [amount, navigate]);

  //  Dynamically load Razorpay SDK
  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";

      // success
      script.onload = () => resolve(true);

      //  failure
      script.onerror = () => resolve(false);

      // attach script to DOM
      document.body.appendChild(script);
    });
  };

  //  Main submit handler
  const submitHandler = async (event) => {
    event.preventDefault();

    // start loading
    setLoading(true);

    //  Validate amount
    if (!amount || amount <= 0) {
      toast.error("Invalid amount");
      setLoading(false);
      return;
    }

    try {

      // =========================
      // CASH ON DELIVERY FLOW
      // =========================
      if (data.paymentMethod === "Cash on Delivery") {

        // send order directly to backend
        const res = await api.post(
          "/api/user/order",
          {
            ...data,
            amount,
            paymentMethod: "Cash on Delivery",
          },
          { withCredentials: true }
        );

        console.log(res);

        // success message
        toast.success("✅ Order placed (Cash on Delivery)");

        // stop loading
        setLoading(false);
        
        // redirect to orders page
        navigate("/user-orders");
        dispatch(setCartLength(0));

        return; // stop further execution
      }

      // =========================
      //  ONLINE PAYMENT FLOW
      // =========================

      // load Razorpay SDK
      const loaded = await loadRazorpay();

      //  handle SDK failure
      if (!loaded) {
        toast.error("Razorpay SDK failed to load");
        return; 
      }

      // 1 Create Razorpay order from backend
      const orderRes = await api.post(
        "/api/user/create-order",
        { amount },
        { withCredentials: true }
      );

      const razorpayOrder = orderRes.data;

      // Debug logs (remove in production)
      console.log(razorpayOrder);
      console.log("ENV CHECK:", import.meta.env);
      console.log("Razorpay Key:", import.meta.env.VITE_RAZORPAY_KEY_ID);

      // 2 Razorpay configuration
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: razorpayOrder.amount,
        currency: "INR",
        order_id: razorpayOrder.id,

        // UI details
        name: "My E-Commerce Store",
        description: "Order Payment",

        // prefill user data
        prefill: {
          name: data.houseName,
        },

        //  triggered when user closes payment popup
        modal: {
          ondismiss: function () {
            toast.error("Payment cancelled");
           
          },
        },

        //  Payment success handler
        handler: async function (response) {
          try {

            // send payment details to backend
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

            // success message
            toast.success("💳 Payment successful & order placed!");
            
            // redirect
            navigate("/user-orders");
            dispatch(setCartLength(0));
          } catch (err) {

            // very important case:
            // payment succeeded but order failed
            console.error("Order save failed after payment:", {
              message: err.message,
              status: err.response?.status,
              data: err.response?.data,
            });

            toast.error("⚠️ Payment successful but order failed. Contact support.");
          }
        },

        //  UI theme color
        theme: { color: "#22c55e" },
      };

      // create Razorpay instance
      const rzp = new window.Razorpay(options);

      // open payment popup
      rzp.open();

    } catch (err) {

      //  catch API or payment errors
      console.error(err);
      console.error("ORDER ERROR:", err.response?.data || err.message);

      toast.error("❌ Payment failed or cancelled");

    } finally {

      // always stop loading
      setLoading(false);
    }
  };

  //  update form input values
  const changeHandler = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">

      {/*  Order form */}
      <form
        onSubmit={submitHandler}
        className="w-full max-w-4xl bg-white shadow-lg rounded-2xl p-8 space-y-6"
      >

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
          🏠 Shipping Details
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/*  Address Section */}
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

          {/*  Payment Section */}
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

        {/*  Submit Button */}
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