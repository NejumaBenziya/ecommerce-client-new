import React from 'react'
import { Link , useNavigate } from 'react-router-dom'
import api from "../api/axios";
import {  useDispatch } from "react-redux";
import { logout } from "../globalState/login/loginSlice";

const SellerHeader = () => {

  // Redux dispatch (used for logout state update)
  const dispatch = useDispatch();

  // React Router navigation
  const navigate = useNavigate();

  //  Logout handler
  const handleLogout = async () => {
    try {
      // Call backend logout API (clears cookie)
      await api.post("/api/user/logout", {}, { withCredentials: true });

    } catch (err) {
      // Log error if logout fails
      console.error("Logout error", err);

    } finally {
      // Clear Redux auth state
      dispatch(logout());

      // Redirect user to login page
      navigate("/login");
    }
  };

  return (
    <div className="navbar bg-base-100 shadow-sm">

      {/* LEFT SECTION */}
      <div className="flex-1">

        {/* Dropdown Menu */}
        <div className="dropdown">

          {/* Menu Button (Hamburger Icon) */}
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
            </svg>
          </div>

          {/* Dropdown Items */}
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >

            {/* Homepage */}
            <li>
              <Link to="/seller/homepage"
                onClick={() => {
                  // Remove focus after click (UX improvement)
                  document.activeElement.blur();
                }}>
                Homepage
              </Link>
            </li>

            {/* Pending Orders */}
            <li>
              <Link 
                to={{
                  pathname: "/seller/orders-list",
                  search: "?status=ordered"
                }}
                onClick={() => {
                  document.activeElement.blur();
                }}
              >
                Pending orders
              </Link>
            </li>

            {/* Shipped Orders */}
            <li>
              <Link 
                to={{
                  pathname: "/seller/orders-list",
                  search: "?status=shipped"
                }}
                onClick={() => {
                  document.activeElement.blur();
                }}
              >
                Shipped Orders
              </Link>
            </li>

            {/* Delivered Orders */}
            <li>
              <Link 
                to={{
                  pathname: "/seller/orders-list",
                  search: "?status=delivered"
                }}
                onClick={() => {
                  document.activeElement.blur();
                }}
              >
                Delivered Orders
              </Link>
            </li>

            {/* Logout Button */}
            <li>
              <button
                onClick={handleLogout}
                className="text-red-600 font-semibold"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>

        {/* Logo / Title */}
        <Link to="/seller/homepage" className="btn btn-ghost text-xl">
          Luna Seller
        </Link>
      </div>

      {/* RIGHT SECTION */}
      <div className="flex-none">

        {/* Profile Avatar */}
        <ul className="menu menu-horizontal px-1">
          <li>
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://th.bing.com/th/id/OIP.PKlD9uuBX0m4S8cViqXZHAHaHa?w=188&h=189&c=7&r=0&o=5&pid=1.7"
                />
              </div>
            </div>
          </li>
        </ul>

      </div>
    </div>
  )
}

export default SellerHeader