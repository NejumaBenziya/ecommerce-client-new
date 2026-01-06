import axios from 'axios'
import React from 'react'


const CartCard = ({product}) => {
   const clickHandler = async (event) => {
   
axios.put(
  "/api/user/removecart",
  { productId: product._id },
  { withCredentials: true }
)
    .then(res=>{
        
         
         
         console.log(res.data);
         
          
        })
        .catch(err=>{
          
          console.log(err.response);
          
          
        })
   }
   const plusHandler= async (event)=>{
     try {
        const token = localStorage.getItem("token");

        const res = await axios.put(
  "/api/user/addtocart",
  { productId: product._id },
  { withCredentials: true }
);


        console.log(res.data);
      }catch (err) {
        console.log(err.response?.data || err.message);
      }
   }
   const minusHandler = async (event) => {
   
axios.put(
  "/api/user/quantity",
  { productId: product._id },
  { withCredentials: true }
)
    .then(res=>{
        
         
         
         console.log(res.data);
         })
        .catch(err=>{
          
          console.log(err.response);
          
          
        })
   }
  return (
   <div className="hero bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl shadow-lg p-6 mb-6">
  <div className="hero-content flex-col lg:flex-row gap-10 w-full">
    {/* Product Image */}
    <img
      src={product.productImage}
      alt={product.productName}
      className="w-40 h-40 object-contain rounded-xl shadow-md bg-white p-3"
    />

    {/* Product Info */}
    <div className="flex flex-col justify-between w-full">
      {/* Brand & Name */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          {product.brandName}
        </h1>
        <p className="text-gray-600">{product.productName}</p>
        <p className="text-sm text-gray-500">Weight: {product.weight}</p>
      </div>

      {/* Quantity & Price */}
      <div className="flex items-center justify-between mt-4">
        {/* Quantity Controls */}
        <div className="flex items-center gap-3">
          <p className="text-gray-700 font-medium">Qty:</p>
          <div className="flex items-center gap-2 border rounded-lg px-3 py-1 bg-white shadow-sm">
            <button
              className="btn btn-sm btn-outline btn-error"
              onClick={minusHandler}
            >
              -
            </button>
            <span className="text-lg font-semibold text-gray-700">
              {product.quantity}
            </span>
            <button
              className="btn btn-sm btn-outline btn-success"
              onClick={plusHandler}
            >
              +
            </button>
          </div>
        </div>

        {/* Price Section */}
<div className="mt-2">
  {product.salePrice ? (
    <div className="flex items-center gap-2">
      <p className="text-lg font-bold text-red-600">
        ₹ {product.salePrice}*{product.quantity}={Math.round(product.salePrice*product.quantity)}
      </p>
      <p className="text-sm text-gray-500 line-through">
        ₹ {product.price}*{product.quantity}={Math.round(product.price*product.quantity)}
      </p>
      <span className="text-xs bg-red-100 text-red-600 font-semibold px-2 py-0.5 rounded-full">
        {Math.round(((product.price - product.salePrice) / product.price) * 100)}% OFF
      </span>
    </div>
  ) : (
    <p className="text-lg font-bold text-green-600">₹ {product.price}*{product.quantity}={Math.round(product.price*product.quantity)}</p>
  )}
</div>

      </div>

      {/* Remove Button */}
      <div className="mt-4 flex justify-end">
        <button
          className="btn btn-outline btn-error shadow-md hover:scale-105 transition-transform"
          onClick={clickHandler}
        >
          ❌ Remove
        </button>
      </div>
    </div>
  </div>
</div>

  )
}

export default CartCard