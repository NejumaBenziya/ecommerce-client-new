import axios from 'axios'
import React, { useEffect, useState } from 'react'
import DeleteModal from './DeleteModal';


const AdminProductCard =({product}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
   const [sales, setSales] = useState([]);
  useEffect(() => {
     axios.get("/api/admin/sale-list", {
  withCredentials: true,
})

        .then((res) => {
          setSales(res.data.sales || []);
          console.log(res);
          
          
        })
        .catch((err) => {
          console.error("Error fetching reviews:", err.response || err.message);
        });
    }, []);
    const changeHandler = async (event) => {
  try {
    axios.put(
  "/api/admin/add-sale",
  {
    productId: product._id,
    saleId: event.target.value,
  },
  {
    withCredentials: true,
  }
);


    console.log(res.data);
  } catch (err) {
    console.log(err.response?.data || err.message);
  }
};

   const handleDelete = async () => {
  try {
    const res = await axios.put(
  "/api/admin/remove-product",
  { _id: product._id },
  {
    withCredentials: true,
  }
);


    console.log(res.data);
    setIsModalOpen(false);
  } catch (err) {
    console.log(err.response);
  }
};

   
  return (
    <div className="flex justify-center p-4">
  <div
    className={`card w-72 h-[26rem] rounded-2xl shadow-md hover:shadow-xl transition-transform transform hover:scale-105 overflow-hidden ${
      product.quantity === 0 ? "bg-red-100 border border-red-400" : "bg-white"
    }`}
  >
    {/* Image */}
    <figure className="h-40 bg-gray-50 flex items-center justify-center">
      <img
        src={product.productImage}
        alt="product pic"
        className="h-full object-contain p-3"
      />
    </figure>

    {/* Card Body */}
    <div className="card-body p-4 flex flex-col justify-between">
      {/* Title */}
      <div>
        <h2 className="card-title text-lg font-semibold text-gray-800">
          {product.brandName}
        </h2>
        <p className="text-sm text-gray-600">{product.productName}</p>
        <p className="text-xs text-gray-500 mt-1">({product.weight})</p>

        {/* Stock Info */}
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
  {product.salePrice ? (
    <div className="flex items-center gap-2">
      <p className="text-lg font-bold text-red-600">
        ₹ {product.salePrice}
      </p>
      <p className="text-sm text-gray-500 line-through">
        ₹ {product.price}
      </p>
      <span className="text-xs bg-red-100 text-red-600 font-semibold px-2 py-0.5 rounded-full">
        {Math.round(((product.price - product.salePrice) / product.price) * 100)}% OFF
      </span>
    </div>
  ) : (
    <p className="text-lg font-bold text-green-600">₹ {product.price}</p>
  )}
</div>

      </div>

    
<div className="card-actions justify-end mt-4">
  {/* Show Add Sale only if sales exist AND product is in stock */}
  {sales.length > 0 && product.quantity > 0 && (
    <select
      defaultValue="Add sale"
      className="select select-bordered select-sm"
      onChange={changeHandler}
    >
      <option disabled={true}>Add sale</option>
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