import api from "../api/axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

const Reviewpage = () => {

  //  state to store product details
  const [product, setProduct] = useState({});

  //  state for user feedback input
  const [feedback, setFeedback] = useState("");

  //  loading state for API calls (fetching product)
  const [loading, setLoading] = useState(false);

  //  get current route location
  const location = useLocation();

  //  navigation hook
  const navigate = useNavigate();

  //  extract query params from URL
  const params = new URLSearchParams(location.search);

  //  product id from URL
  const productId = params.get("productId");

  // rating from URL
  const rating = params.get("rating");

  // order id from URL
  const orderId = params.get("orderId");

  // fetch product details when productId changes
  useEffect(() => {
    if (productId) {

      // start loading
      setLoading(true)

      // API call to get product
      api
        .get("/api/user/product", {
          params: { productId },
        })
        .then((res) => {

          // stop loading
          setLoading(false)

          // store fetched product in state
          setProduct(res.data.product)
        })
        .catch((err) => {

          // stop loading on error
          setLoading(false)

          // structured error logging
          console.error("Error fetching product:", {
            message: err.message,
            status: err.response?.status,
            data: err.response?.data,
          });
        });
    }
  }, [productId]);

  //  submit review handler
  const handleClick = async (e) => {
    e.preventDefault(); //  prevent form reload

    try {

      // 📡 send review data to backend
      const res = await api.post(
        "/api/user/add-review",
        {
          product_id: product._id, //  product id
          rating,                  //  rating
          feedback,                // user feedback
          orderId,                 // order reference
        },
        {
          withCredentials: true, // cookie authentication
        }
      );

      // debug success response
      console.log("✅ Review done:", res.data);

      // success notification
      toast.success("🎉 Review submitted successfully!", { autoClose: 2000 });

      //  redirect after delay
      setTimeout(() => {
        navigate("/");
      }, 2000);

    } catch (err) {

      //  error logging
      console.error("❌ Error on rating:", err.response?.data || err.message);

      //  user feedback
      toast.error("⚠️ Failed to submit review!");
    }
  };

  return (
    <div className="max-w-xs mx-auto bg-white shadow-lg rounded-2xl overflow-hidden transition transform hover:scale-105 hover:shadow-xl">

      {/*  show loader while fetching product */}
      {loading && <Loader />}

      {/* product image */}
      <figure className="w-full h-48 overflow-hidden">
        <img
          src={product.productImage} 
          alt="product pic"
          className="w-full h-full object-cover"
        />
      </figure>

      <div className="p-4 text-center">

        {/*  product name */}
        <h2 className="text-lg font-semibold text-gray-800 truncate">
          {product.productName}
        </h2>

        {/*  rating display */}
        <div className="rating rating-sm">
          {[1, 2, 3, 4, 5].map((star) => (
            <input
              key={star}
              type="radio"
              name={`avg-rating-${product._id}`}
              className="mask mask-star-2 bg-orange-400"
              checked={Math.round(rating) === star} 
              readOnly
            />
          ))}
        </div>

        {/*  feedback form */}
        <form onSubmit={handleClick} className="space-y-4">
          <textarea
            placeholder="Write your feedback here..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="textarea textarea-accent"
          />

          {/* submit button */}
          <button type="submit" className="btn btn-success">
            Done
          </button>
        </form>
      </div>
    </div>
  );
};

export default Reviewpage;