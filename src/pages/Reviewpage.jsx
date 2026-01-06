import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Reviewpage = () => {
  const [product, setProduct] = useState({});
  const [feedback, setFeedback] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const params = new URLSearchParams(location.search);
  const productId = params.get("productId");
  const rating = params.get("rating");
  const orderId= params.get("orderId");
  useEffect(() => {
  if (productId) {
    axios
      .get("/api/user/product", {
        params: { productId },
      })
      .then((res) => setProduct(res.data.product))
      .catch((err) => console.log(err));
  }
}, [productId]);


  const handleClick = async (e) => {
  e.preventDefault();

  try {
    const res = await axios.post(
      "/api/user/add-review",
      {
        product_id: product._id,
        rating,
        feedback,
        orderId,
      },
      {
        withCredentials: true, // ✅ cookie auth
      }
    );

    console.log("✅ Review done:", res.data);

    toast.success("🎉 Review submitted successfully!", { autoClose: 2000 });

    setTimeout(() => {
      navigate("/");
    }, 2000);
  } catch (err) {
    console.error("❌ Error on rating:", err.response?.data || err.message);
    toast.error("⚠️ Failed to submit review!");
  }
};

  return (
    <div className="max-w-xs mx-auto bg-white shadow-lg rounded-2xl overflow-hidden transition transform hover:scale-105 hover:shadow-xl">
      <figure className="w-full h-48 overflow-hidden">
        <img
          src={product.productImage}
          alt="product pic"
          className="w-full h-full object-cover"
        />
      </figure>

      <div className="p-4 text-center">
        <h2 className="text-lg font-semibold text-gray-800 truncate">
          {product.productName}
        </h2>

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

        {/* use onSubmit with preventDefault */}
        <form onSubmit={handleClick} className="space-y-4">
          <textarea
            placeholder="Write your feedback here..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="textarea textarea-accent"
          />
          <button type="submit" className="btn btn-success">
            Done
          </button>
        </form>
      </div>
    </div>
  );
};

export default Reviewpage;
