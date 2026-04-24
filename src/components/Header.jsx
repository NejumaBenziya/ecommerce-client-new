import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../globalState/login/loginSlice";
import api from "../api/axios";

const Header = () => {
  const dispatch = useDispatch(); // Redux dispatch to update auth state
  const navigate = useNavigate(); // React Router navigation

  const [query, setQuery] = useState(""); //  search input state

  //  Get authentication state from Redux store
  const { isLoggedIn, cartLength, authChecked } = useSelector(
    (state) => state.auth
  );

  //  Wait until authentication check completes (prevents flicker)
  if (!authChecked) return null;

  //  Handle search navigation
  const handleSearch = () => {
    if (query.trim() === "") {
      return; // prevent empty search
    }
    navigate(`/search?q=${query}`); // navigate to search page
  };

  // Logout function
  const handleLogout = async () => {
    try {
      // Call backend to clear cookie
      await api.post("/api/user/logout", {}, { withCredentials: true });
    } catch (err) {
      console.error("Logout error", err);
    } finally {
      // Clear Redux auth state and redirect
      dispatch(logout());
      navigate("/login");
    }
  };

  return (
    <div className="navbar bg-base-100 shadow-sm">

      {/* LEFT SECTION */}
      <div className="flex-1">

        {/*  Dropdown menu */}
        <div className="dropdown">

          {/* Menu icon button */}
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle"
          >
            {/* Hamburger icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </div>

          {/* Dropdown content */}
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {/* Homepage link */}
            <li>
              <Link
                to="/"
                onClick={() => {
                  document.activeElement.blur(); // remove focus
                }}
              >
                Homepage
              </Link>
            </li>

            {/* Category title */}
            <li>
              <p>
                <b>Categories</b>
              </p>
            </li>

            {/* Category links */}
            <li>
              <Link
                to="/product-list?category=makeup"
                onClick={() => {
                  document.activeElement.blur();
                }}
              >
                Makeup
              </Link>
            </li>

            <li>
              <Link
                to="/product-list?category=skin"
                onClick={() => {
                  document.activeElement.blur();
                }}
              >
                Skin-care
              </Link>
            </li>

            <li>
              <Link
                to="/product-list?category=hair"
                onClick={() => {
                  document.activeElement.blur();
                }}
              >
                Hair-care
              </Link>
            </li>

            <li>
              <Link
                to="/product-list?category=bath and body"
                onClick={() => {
                  document.activeElement.blur();
                }}
              >
                Bath and Body
              </Link>
            </li>

            {/*  Show only if user is logged in */}
            {isLoggedIn && (
              <>
                {/* My Orders */}
                <li>
                  <b>
                    <Link
                      to="/user-orders"
                      onClick={() => {
                        document.activeElement.blur();
                      }}
                    >
                      My Orders
                    </Link>
                  </b>
                </li>

                {/* Logout button */}
                <li>
                  <button
                    onClick={handleLogout}
                    className="text-red-600 font-semibold"
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>

        {/* Logo */}
        <Link
          to="/"
          className="btn btn-ghost text-accent text-xl font-semibold"
        >
          Luna
        </Link>
      </div>

      {/* RIGHT SECTION */}
      <div className="flex-none">

        {/*  Search input */}
        <input
          type="text"
          placeholder="Search"
          className="input input-bordered w-24 md:w-auto"
          value={query}
          onChange={(e) => setQuery(e.target.value)} // update state
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch(); // search on Enter
          }}
        />

        {isLoggedIn ? (
          <ul className="menu menu-horizontal px-1">

            {/*  Cart */}
            <li>
              <div
                onClick={() => navigate("/cart-list")}
                className="relative cursor-pointer"
              >
                🛒

                {/* Cart item count badge */}
                {cartLength > 0 && (
                  <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs px-2 rounded-full font-bold">
                    {cartLength}
                  </span>
                )}
              </div>
            </li>

            {/*  Wishlist */}
            <li>
              <div
                onClick={() => navigate("/wishlist")}
                className="relative cursor-pointer text-xl"
              >
                ❤️
              </div>
            </li>

            {/*  Profile avatar */}
            <li className="dropdown dropdown-end">
              <div
                tabIndex={0}
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    src="https://th.bing.com/th/id/OIP.PKlD9uuBX0m4S8cViqXZHAHaHa?w=188"
                    alt="User profile"
                  />
                </div>
              </div>
            </li>

          </ul>
        ) : (
          //  If not logged in → show login button
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Header;