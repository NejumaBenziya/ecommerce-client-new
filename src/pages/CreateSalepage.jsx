import React, { useState } from "react";
import api from "../api/axios";

const CreateSalepage = () => {

  //  Form state (controlled inputs)
  const [formData, setFormData] = useState({
    sale_title: "",
    percentage: "",
    valid_till: "",
  });

  //  Loading state for submit button
  const [loading, setLoading] = useState(false);

  //  Message for success / error feedback
  const [message, setMessage] = useState("");

  //  Handle input change (for all fields)
  const handleChange = (e) => {
    const { name, value } = e.target;

    //  Update specific field dynamically
    setFormData((prev) => ({ ...prev, [name]: value }));
  };


  //  Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent page reload

    setLoading(true);   // start loading
    setMessage("");     // clear previous message

    try {

      //  Prepare payload before sending to backend
      const payload = {
        sale_title: formData.sale_title,

        //  Convert percentage to number (important)
        percentage: Number(formData.percentage),

        //  Date (string from input, backend handles it)
        valid_till: formData.valid_till
      };

      //  API call to create sale
      const res = await api.post(
        "/api/admin/addsale",   // endpoint
        payload,
        {
          withCredentials: true, // cookie authentication
        }
      );

      //  Success message
      setMessage("✅ Sale created successfully!");

      // Reset form after success
      setFormData({
        sale_title: "",
        percentage: "",
        valid_till: ""
      });

    } catch (err) {

      // Show backend error or fallback message
      setMessage(
        err.response?.data?.message ||
        "❌ Failed to create sale. Try again."
      );

    } finally {
      setLoading(false); // stop loading
    }
  };


  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-2xl shadow-md">

      {/*  Page title */}
      <h1 className="text-xl font-bold text-center mb-4">
        Create Sale
      </h1>

      {/*  Show success/error message */}
      {message && (
        <div className="mb-4 p-2 rounded bg-gray-100 text-center text-sm">
          {message}
        </div>
      )}

      {/*  Form */}
      <form onSubmit={handleSubmit} className="space-y-4">

        {/*  Sale Title */}
        <div>
          <label className="block text-sm font-medium">
            Sale Title
          </label>
          <input
            type="text"
            name="sale_title"
            value={formData.sale_title}
            onChange={handleChange}
            required
            className="input input-bordered w-full"
          />
        </div>

        {/*  Discount Percentage */}
        <div>
          <label className="block text-sm font-medium">
            Discount (%)
          </label>
          <input
            type="number"
            name="percentage"
            value={formData.percentage}
            onChange={handleChange}
            required
            min="1"
            max="99"
            className="input input-bordered w-full"
          />
        </div>

        {/*  Expiry Date */}
        <div>
          <label className="block text-sm font-medium">
            Valid Till
          </label>
          <input
            type="date"
            name="valid_till"
            value={formData.valid_till}
            onChange={handleChange}
            required
            className="input input-bordered w-full"
          />
        </div>

        {/*  Submit Button */}
        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={loading} // prevent multiple clicks
        >
          {loading ? "Creating..." : "Create Sale"}
        </button>

      </form>
    </div>
  );
};

export default CreateSalepage;