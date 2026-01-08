import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../globalState/login/loginSlice";
import api from "../api/axios";


const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoggedIn, cartLength, authChecked } = useSelector(
    (state) => state.auth
  );

  // ⛔ wait until auth check finishes
  if (!authChecked) return null;

 const handleLogout = async () => {
  try {
    await api.post("/api/user/logout", {}, { withCredentials: true });
  } catch (err) {
    console.error("Logout error", err);
  } finally {
    dispatch(logout());
    navigate("/login");
  }
};
  return (
    <div className="navbar bg-base-100 shadow-sm">
      {/* LEFT */}
      <div className="flex-1">
        
        <div className= " dropdown">
         
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle"
           
          >
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

         
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link to="/" onClick={() => {
  document.activeElement.blur();
}}>
                Homepage
              </Link>
            </li>
            <li>
              <p>
                <b>Categories</b>
              </p>
            </li>
            <li>
              <Link to="/product-list?category=makeup" onClick={() => {
  
  document.activeElement.blur();
}} >
                Makeup
              </Link>
            </li>
            <li>
              <Link to="/product-list?category=skin" onClick={() => {
  
  document.activeElement.blur();
}}>
                Skin-care
              </Link>
            </li>
            <li>
              <Link to="/product-list?category=hair" onClick={() => {
  
  document.activeElement.blur();
}}>
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
              {isLoggedIn ? (<ul><li>
              <b><Link
                to="/user-orders"
                onClick={() => {
  
  document.activeElement.blur();
}}
              >
                My Orders
              </Link></b>
            </li>
          <li>
                  <button
                    onClick={handleLogout}
                    className="text-red-600 font-semibold"
                  >
                    Logout
                  </button>
                </li></ul>):" "}
          </ul>
        </div>

        <Link to="/" className="btn btn-ghost text-accent text-xl font-semibold">
          Luna
        </Link>
      </div>

      {/* RIGHT */}
      <div className="flex-none">
        {isLoggedIn ? (
          <ul className="menu menu-horizontal px-1">
            {/* CART */}
            <li>
             <button
  className="btn btn-ghost btn-circle indicator"
  onClick={() => navigate("/cart-list")}
>
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
      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5
      M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17
      m0 0a2 2 0 100 4
      m-8 2a2 2 0 11-4 0"
    />
  </svg>

  
</button>

            </li>

            {/* PROFILE */}
            <li className="dropdown dropdown-end">
              <div tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img src="https://th.bing.com/th/id/OIP.PKlD9uuBX0m4S8cViqXZHAHaHa?w=188" />
                </div>
              </div>

              
                
             </li>
          </ul>
        ) : (
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

export default Header; // ✅ THIS FIXES YOUR ERROR
