import axios from 'axios'
import React from 'react'

const UserCard = ({user}) => {
   const clickHandler = async (event) => {
  const role = event.target.value;

  try {
    const res = await axios.put(
      `${import.meta.env.VITE_API_DOMAIN}/api/admin/update-role`,
      { _id: user._id, role:role }, 
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        withCredentials: true,
      }
    );

    console.log(" Role updated:", res.data);
  } catch (err) {
    console.error(" Error updating role:", err.response?.data || err.message);
  }
};

  return (
   <div className="card w-96 bg-white shadow-lg rounded-2xl border border-gray-200 hover:shadow-xl transition-all">
  <div className="card-body">
    {/* Header */}
    <div className="flex items-center gap-4">
      {/* Avatar (initial letter of name) */}
      <div className="w-14 h-14 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xl shadow-sm">
        {user.name.charAt(0).toUpperCase()}
      </div>
      <div>
        <h2 className="card-title text-lg font-semibold text-gray-800">{user.name}</h2>
        <span
          className={`px-3 py-1 text-xs font-medium rounded-full ${
            user.role === "admin"
              ? "bg-red-100 text-red-600"
              : user.role === "seller"
              ? "bg-yellow-100 text-yellow-600"
              : "bg-green-100 text-green-600"
          }`}
        >
          {user.role}
        </span>
      </div>
    </div>

    {/* Details */}
    <div className="mt-4 space-y-2 text-sm text-gray-600">
      <p>📞 Phone: {user.phone}</p>
      <p>✉️ Email: {user.email}</p>
    </div>

    {/* Actions */}
    <div className="card-actions justify-end mt-4">
      <select
        defaultValue="Update role"
        className="select select-bordered select-sm rounded-lg shadow-sm"
        onChange={clickHandler}
      >
        <option disabled={true}>Update role</option>
        <option value="member">👤 Member</option>
        <option value="seller">🛒 Seller</option>
        <option value="admin">⭐ Admin</option>
      </select>
    </div>
  </div>
</div>

  )
}

export default UserCard