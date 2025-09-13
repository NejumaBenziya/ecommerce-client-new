import React, { useState } from "react";
import axios from "axios";

const CreateSalepage = () => {
  const [formData, setFormData] = useState({
    sale_title: "",
    percentage: "",
    valid_till: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setMessage("");

  try {
    // Convert percentage to number and valid_till to ISO date string
    const payload = {
      sale_title: formData.sale_title,
      percentage: Number(formData.percentage),
      valid_till: formData.valid_till


    };

    const res = await axios.post(
      `${import.meta.env.VITE_API_DOMAIN}/api/admin/addsale`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        withCredentials: true,
      }
    );

    setMessage("✅ Sale created successfully!");
    setFormData({ sale_title: "", percentage: "", valid_till: "" });
  } catch (err) {
    setMessage(
      err.response?.data?.message || "❌ Failed to create sale. Try again."
    );
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-2xl shadow-md">
      <h1 className="text-xl font-bold text-center mb-4">Create Sale</h1>

      {message && (
        <div className="mb-4 p-2 rounded bg-gray-100 text-center text-sm">
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium">Sale Title</label>
          <input
            type="text"
            name="sale_title"
            value={formData.sale_title}
            onChange={handleChange}
            required
            className="input input-bordered w-full"
            
          />
        </div>

        {/* Percentage */}
        <div>
          <label className="block text-sm font-medium">Discount (%)</label>
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

        {/* Valid Till */}
        <div>
          <label className="block text-sm font-medium">Valid Till</label>
          <input
            type="date"
            name="valid_till"
            value={formData.valid_till}
            onChange={handleChange}
            required
            className="input input-bordered w-full"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Sale"}
        </button>
      </form>
    </div>
  );
};

export default CreateSalepage;
