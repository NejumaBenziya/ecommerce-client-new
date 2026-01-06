import React, { useEffect, useState } from "react";
import axios from "axios";

const SaleListPage = () => {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState(null);

  useEffect(() => {
    fetchSales();
  }, []);

  const fetchSales = async () => {
  try {
    const res = await axios.get("/api/admin/sale-list", {
      withCredentials: true, // ✅ cookie auth
    });
    setSales(res.data.sales || []);
  } catch (err) {
    setError("❌ Failed to fetch sales");
  } finally {
    setLoading(false);
  }
};


 const handleDelete = async (saleId) => {
  if (!window.confirm("Are you sure you want to delete this sale?")) return;

  setDeleting(saleId);
  try {
    await axios.delete(`/api/admin/sales/${saleId}`, {
      withCredentials: true, // ✅ cookie auth
    });

    setSales((prev) => prev.filter((sale) => sale._id !== saleId));
  } catch (err) {
    alert("❌ Failed to delete sale");
  } finally {
    setDeleting(null);
  }
};


  if (loading) return <p className="text-center mt-10">Loading sales...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-6 rounded-2xl shadow-md">
      <h1 className="text-xl font-bold text-center mb-6">All Sales</h1>

      {sales.length === 0 ? (
        <p className="text-center text-gray-500">No sales available</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {sales.map((sale) => (
            <div
              key={sale._id}
              className="card bg-base-100 shadow-md border p-4 rounded-xl"
            >
              <h2 className="font-bold text-lg mb-2">{sale.sale_title}</h2>
              
              <p className="text-gray-600">
                Discount: <span className="font-semibold">{sale.percentage}%</span>
              </p>
              <p className="text-gray-600">
                Valid Till:{" "}
                <span className="font-semibold">
                  {new Date(sale.valid_till).toLocaleDateString()}
                </span>
              </p>
              <p className="text-sm text-gray-400 mt-2">
                Created at: {new Date(sale.createdAt).toLocaleString()}
              </p>

              <button
                onClick={() => handleDelete(sale._id)}
                className="btn btn-error btn-sm mt-4"
                disabled={deleting === sale._id}
              >
                {deleting === sale._id ? "Deleting..." : "Delete Sale"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SaleListPage;
