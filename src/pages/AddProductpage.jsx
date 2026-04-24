import api from "../api/axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddProductpage = () => {

  //  Form state (stores all input values)
  const [data, setData] = useState({
    productImage: "",     // image URL
    brandName: "",        // brand name
    productName: "",      //  product name
    productCategory: "",  //  category (radio)
    weight: "",           //  weight
    price: "",            //  price
    quantity: "",         //  stock quantity
  });

  // Navigation hook (redirect after success)
  const navigate = useNavigate();

  //  Submit handler (called on form submit)
  const submitHandler = async (event) => {
    event.preventDefault(); // prevent page reload

    try {

      //  API call to add product
      const res = await api.post(
        "/api/admin/addproduct",   //  backend route
        data,                      // send form data
        {
          withCredentials: true,  // cookie-based auth
        }
      );

      console.log(" Product added:", res.data);

      // Redirect to admin homepage after success
      navigate("/admin/homepage");

    } catch (err) {

      //  Log error properly
      console.error(
        " Error adding product:",
        err.response?.data || err.message
      );
    }
  };

  //  Handle input changes
  const changeHandler = (event) => {

    // Create copy of existing state
    const tempData = { ...data };

    // Update specific field based on input name
    tempData[event.target.name] = event.target.value;

    // Update state
    setData(tempData);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-base-200 px-4">

      {/* Card container */}
      <div className="card w-full max-w-2xl bg-base-100 shadow-xl p-8">

        {/*  Title */}
        <h1 className="text-3xl font-bold text-center mb-6">
          Add New Product
        </h1>

        {/* Form */}
        <form onSubmit={submitHandler} className="space-y-4">

          {/*  Product Image */}
          <fieldset className="fieldset">
            <legend className="fieldset-legend">
              Product Image address
            </legend>
            <input
              type="text"
              name="productImage"
              className="input input-bordered w-full"
              onChange={changeHandler}
              value={data.productImage}
            />
          </fieldset>

          {/* 🏷 Brand Name */}
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

          {/*  Product Category (Radio buttons) */}
          <fieldset className="fieldset">
            <legend className="fieldset-legend mb-2">
              Product Category
            </legend>

            {/*  Category options */}
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

          {/*  Weight */}
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

          {/*  Price */}
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

          {/* Submit Button */}
          <button
            className="btn btn-success w-full mt-4"
            type="submit"
          >
            Add Product
          </button>

        </form>
      </div>
    </div>
  );
};

export default AddProductpage;