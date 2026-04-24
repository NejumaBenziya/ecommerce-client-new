import api from "../api/axios";
import React from 'react'

const UserCard = ({user}) => {

  //  Role update handler
  const clickHandler = async (event) => {

    // Get selected role from dropdown
    const role = event.target.value;

    try {
      // API call to update user role
      const res = await api.put(
        "/api/admin/update-role",
        { _id: user._id, role }, // send user id + new role
        { withCredentials: true } // send cookies for auth
      );

      console.log(" Role updated:", res.data);

    } catch (err) {
      // Error handling
      console.error(" Error updating role:", err.response?.data || err.message);
    }
  };

  return (
   <div className="card w-96 bg-white shadow-lg rounded-2xl border border-gray-200 hover:shadow-xl transition-all">

  <div className="card-body">

    {/*  Header Section */}
    <div className="flex items-center gap-4">

      {/*  Avatar (first letter of user name) */}
      <div className="w-14 h-14 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xl shadow-sm">
        {user.name.charAt(0).toUpperCase()}
      </div>

      <div>

        {/* User Name */}
        <h2 className="card-title text-lg font-semibold text-gray-800">
          {user.name}
        </h2>

        {/* Role Badge (dynamic styling based on role) */}
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

    {/*  User Details */}
    <div className="mt-4 space-y-2 text-sm text-gray-600">

      {/* Phone */}
      <p>📞 Phone: {user.phone}</p>

      {/* Email */}
      <p>✉️ Email: {user.email}</p>
    </div>

    {/* 🔹 Actions Section */}
    <div className="card-actions justify-end mt-4">

      {/* Role Update Dropdown */}
      <select
        defaultValue="Update role"
        className="select select-bordered select-sm rounded-lg shadow-sm"
        onChange={clickHandler}
      >
        {/* Disabled default option */}
        <option disabled={true}>Update role</option>

        {/* Role options */}
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