import api from "../api/axios";
import React, { useEffect, useState } from 'react'
import DeleteModal from './DeleteModal';

/**
 * AdminProductCard Component
 * 
 * Displays product details in admin panel
 * Allows:
 * - Assigning a sale to product
 * - Deleting (soft delete) product
 */
const AdminProductCard =({product}) => {

  // State to control delete confirmation modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // State to store available sales from backend
  const [sales, setSales] = useState([]);

  /**
   * Fetch all sales when component mounts
   */
  useEffect(() => {
     api.get("/api/admin/sale-list", {
  withCredentials: true,
})
        .then((res) => {
          // Store sales in state (fallback to empty array)
          setSales(res.data.sales || []);

          // Debug response
          console.log(res);
          
        })
        .catch((err) => {
          // Handle API error
          console.error("Error fetching reviews:", err.response || err.message);
        });
    }, []);

  /**
   * Handle sale assignment to product
   * Triggered when dropdown value changes
   */
  const changeHandler = async (event) => {
  try {
    const res = await api.put(
      "/api/admin/add-sale",
      {
        productId: product._id,        // current product ID
        saleId: event.target.value,   // selected sale ID
      },
      {
        withCredentials: true,
      }
    );

    // Log response for debugging
    console.log(res.data); 
  } catch (err) {
    // Handle error response
    console.log(err.response?.data || err.message);
  }
};

  /**
   * Handle product deletion (soft delete)
   */
  const handleDelete = async () => {
  try {
    const res = await api.put(
  "/api/admin/remove-product",
  { _id: product._id },   // product ID to delete
  {
    withCredentials: true,
  }
);

    // Log response
    console.log(res.data);

    // Close modal after successful delete
    setIsModalOpen(false);

  } catch (err) {
    // Log error
    console.log(err.response);
  }
};

   
  return (
    <div className="flex justify-center p-4">

  {/* Product Card */}
  <div
    className={`card w-72 h-[26rem] rounded-2xl shadow-md hover:shadow-xl transition-transform transform hover:scale-105 overflow-hidden ${
      // Highlight card if out of stock
      product.quantity === 0 ? "bg-red-100 border border-red-400" : "bg-white"
    }`}
  >

    {/* Product Image */}
    <figure className="h-40 bg-gray-50 flex items-center justify-center">
      <img
        src={product.productImage}
        alt="product pic"
        className="h-full object-contain p-3"
      />
    </figure>

    {/* Card Body */}
    <div className="card-body p-4 flex flex-col justify-between">

      {/* Product Info Section */}
      <div>
        <h2 className="card-title text-lg font-semibold text-gray-800">
          {product.brandName}
        </h2>

        <p className="text-sm text-gray-600">{product.productName}</p>

        <p className="text-xs text-gray-500 mt-1">
          ({product.weight})
        </p>

        {/* Stock Status */}
        <p
          className={`mt-2 text-sm font-medium ${
            product.quantity === 0 ? "text-red-600" : "text-green-600"
          }`}
        >
          {product.quantity === 0
            ? "❌ Out of Stock"
            : `Only ${product.quantity} item(s) left`}
        </p>

       {/* Price Section */}
<div className="mt-2">

  {/* If product has a sale */}
  {product.salePrice ? (
    <div className="flex items-center gap-2">

      {/* Discounted Price */}
      <p className="text-lg font-bold text-red-600">
        ₹ {product.salePrice}
      </p>

      {/* Original Price */}
      <p className="text-sm text-gray-500 line-through">
        ₹ {product.price}
      </p>

      {/* Discount Percentage */}
      <span className="text-xs bg-red-100 text-red-600 font-semibold px-2 py-0.5 rounded-full">
        {Math.round(((product.price - product.salePrice) / product.price) * 100)}% OFF
      </span>
    </div>

  ) : (

    // Normal price (no sale)
    <p className="text-lg font-bold text-green-600">
      ₹ {product.price}
    </p>
  )}
</div>

      </div>

    {/* Actions Section */}
<div className="card-actions justify-end mt-4">

  {/* Sale Dropdown:
      Show only if:
      - Sales exist
      - Product is in stock */}
  {sales.length > 0 && product.quantity > 0 && (
    <select
      defaultValue="Add sale"
      className="select select-bordered select-sm"
      onChange={changeHandler}
    >
      <option disabled={true}>Add sale</option>

      {/* Render all sales */}
      {sales.map((item) => (
        <option value={item._id} key={item._id}>
          {item.sale_title} ({item.percentage}%)
        </option>
      ))}
    </select>
  )}

  {/* Delete Button */}
  <button
    onClick={() => setIsModalOpen(true)}
    className="btn btn-error btn-sm rounded-lg shadow-sm hover:shadow-md"
  >
    🗑 Delete
  </button>

  {/* Delete Confirmation Modal */}
  <DeleteModal
    isOpen={isModalOpen}
    onClose={() => setIsModalOpen(false)}
    onConfirm={handleDelete}
    itemName={product.productName}
  />
</div>

    </div>
  </div>
</div>

  )
}

export default AdminProductCard