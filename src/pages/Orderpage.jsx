import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // ✅ import toast

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
  const navigate = useNavigate();

  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_DOMAIN}/api/user/order`,
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true,
        }
      );

      toast.success("✅ Order placed successfully!", { autoClose: 2000 });

      // wait for toast then navigate
      setTimeout(() => {
        navigate("/user-orders");
      }, 2000);

      console.log(res.data);
    } catch (err) {
      console.error(err.response);

      if (err.response?.status === 400) {
        toast.error(err.response.data.message || "Out of stock ❌");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
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

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column - Address */}
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

          {/* Right Column - Payment */}
          <div className="space-y-4">
            <p className="block text-sm font-medium text-gray-700 mb-2">
              Payment Method
            </p>
            <div className="flex flex-col gap-3">
              {["Net Banking", "Cash on Delivery"].map((method) => (
                <label
                  key={method}
                  className="flex items-center gap-2 p-3 border rounded-lg cursor-pointer hover:bg-gray-50"
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

        {/* Submit Button */}
        <button
          className="btn btn-success w-full mt-6 rounded-lg shadow-md hover:scale-105 transition-transform disabled:opacity-50"
          type="submit"
          disabled={loading}
        >
          {loading ? "⏳ Placing Order..." : "🚀 Order Now"}
        </button>
      </form>
    </div>
  );
}

export default Orderpage;
