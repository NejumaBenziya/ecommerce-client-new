import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddProductpage = () => {
  const [data, setData] = useState({
    productImage: "",
    brandName: "",
    productName: "",
    productCategory: "",
    weight: "",
    price: "",
    quantity: "",
  });

  const navigate = useNavigate();

  const submitHandler = async (event) => {
    event.preventDefault();

    try {
     const res = await axios.post(
  "/api/admin/addproduct",   // ✅ use proxy
  data,
  {
    withCredentials: true,   // ✅ cookie auth only
  }
);


      console.log(" Product added:", res.data);
      navigate("/admin/homepage");
    } catch (err) {
      console.error(" Error adding product:", err.response?.data || err.message);
    }
  };

  const changeHandler = (event) => {
    const tempData = { ...data };
    tempData[event.target.name] = event.target.value;
    setData(tempData);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-base-200 px-4">
      {/* Card container */}
      <div className="card w-full max-w-2xl bg-base-100 shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center mb-6">Add New Product</h1>

        <form onSubmit={submitHandler} className="space-y-4">
          {/* Product Image */}
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Product Image address</legend>
            <input
              type="text"
              name="productImage"
              className="input input-bordered w-full"
              onChange={changeHandler}
              value={data.productImage}
            />
          </fieldset>

          {/* Brand Name */}
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Brand Name</legend>
            <input
              type="text"
              name="brandName"
              className="input input-bordered w-full"
              onChange={changeHandler}
              value={data.brandName}
            />
          </fieldset>

          {/* Product Name */}
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Product Name</legend>
            <input
              type="text"
              name="productName"
              className="input input-bordered w-full"
              onChange={changeHandler}
              value={data.productName}
            />
          </fieldset>

          {/* Product Category */}
          <fieldset className="fieldset">
            <legend className="fieldset-legend mb-2">Product Category</legend>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { label: "Makeup", value: "makeup" },
                { label: "Skin Care", value: "skin" },
                { label: "Hair Care", value: "hair" },
                { label: "Bath & Body", value: "bath and body" },
              ].map((cat) => (
                <label key={cat.value} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="productCategory"
                    className="radio radio-primary"
                    value={cat.value}
                    onChange={changeHandler}
                  />
                  {cat.label}
                </label>
              ))}
            </div>
          </fieldset>

          {/* Weight */}
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Weight</legend>
            <input
              type="text"
              name="weight"
              className="input input-bordered w-full"
              onChange={changeHandler}
              value={data.weight}
            />
          </fieldset>

          {/* Price */}
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Price</legend>
            <input
              type="number"
              name="price"
              className="input input-bordered w-full"
              onChange={changeHandler}
              value={data.price}
            />
          </fieldset>

          {/* Quantity */}
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Quantity</legend>
            <input
              type="number"
              name="quantity"
              className="input input-bordered w-full"
              onChange={changeHandler}
              value={data.quantity}
            />
          </fieldset>

          {/* Submit */}
          <button className="btn btn-success w-full mt-4" type="submit">
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProductpage;
