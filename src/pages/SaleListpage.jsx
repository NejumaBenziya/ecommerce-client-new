import React, { useEffect, useState } from "react";
import api from "../api/axios";

const SaleListPage = () => {

  //  Stores list of sales fetched from backend
  const [sales, setSales] = useState([]);

  //  Loading state for initial fetch
  const [loading, setLoading] = useState(true);

  //  Error message if API fails
  const [error, setError] = useState("");

  //  Track which sale is currently being deleted (for button loading)
  const [deleting, setDeleting] = useState(null);

  //  Runs once when component mounts
  useEffect(() => {
    fetchSales();
  }, []);

  //  Fetch all sales from backend
  const fetchSales = async () => {
    try {
      const res = await api.get("/api/admin/sale-list", {
        withCredentials: true, // send cookies for authentication
      });

      //  Save sales (fallback to empty array if undefined)
      setSales(res.data.sales || []);

    } catch (err) {

      // Detailed error logging (helps debugging)
      console.error("Fetch Sales Error:", {
        message: err.message,
        status: err.response?.status,
        data: err.response?.data,
      });

      // Show user-friendly error
      setError("❌ Failed to fetch sales");

    } finally {

      //  Stop loading in all cases
      setLoading(false);
    }
  };

  // Handle sale deletion
  const handleDelete = async (saleId) => {

  
    if (!window.confirm("Are you sure you want to delete this sale?")) return;

    // Mark this sale as deleting (used to disable button)
    setDeleting(saleId);

    try {
      await api.delete(`/api/admin/sales/${saleId}`, {
        withCredentials: true, //  authentication
      });

      //  Remove deleted sale from UI (optimistic update)
      setSales((prev) => prev.filter((sale) => sale._id !== saleId));

    } catch (err) {

      
      alert("❌ Failed to delete sale");

    } finally {

      //  Reset deleting state after operation
      setDeleting(null);
    }
  };

  //  Show loading UI while fetching data
  if (loading) return <p className="text-center mt-10">Loading sales...</p>;

  //  Show error UI if fetch failed
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-6 rounded-2xl shadow-md">

      {/*  Page title */}
      <h1 className="text-xl font-bold text-center mb-6">All Sales</h1>

      {/* Empty state when no sales */}
      {sales.length === 0 ? (
        <p className="text-center text-gray-500">No sales available</p>
      ) : (

        // Sales list grid
        <div className="grid md:grid-cols-2 gap-6">
          {sales.map((sale) => (
            <div
              key={sale._id} //  Unique key for React rendering
              className="card bg-base-100 shadow-md border p-4 rounded-xl"
            >

              {/*  Sale title */}
              <h2 className="font-bold text-lg mb-2">{sale.sale_title}</h2>

              {/*  Discount percentage */}
              <p className="text-gray-600">
                Discount: <span className="font-semibold">{sale.percentage}%</span>
              </p>

              {/*  Validity date */}
              <p className="text-gray-600">
                Valid Till:{" "}
                <span className="font-semibold">
                  {new Date(sale.valid_till).toLocaleDateString()}
                </span>
              </p>

              {/*  Created date */}
              <p className="text-sm text-gray-400 mt-2">
                Created at: {new Date(sale.createdAt).toLocaleString()}
              </p>

              {/* Delete button */}
              <button
                onClick={() => handleDelete(sale._id)} // trigger delete
                className="btn btn-error btn-sm mt-4"
                disabled={deleting === sale._id} // disable while deleting
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