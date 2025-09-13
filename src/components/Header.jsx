import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
 
  const isLoggedin = useSelector((state) => state.auth.isLoggedIn);
  const cartLength = useSelector((state) => state.auth.cartLength);
  const navigate = useNavigate();

  const clickHandler = () => {
    navigate("/cart-list");
  };

 

  return (
    <div className="navbar bg-base-100 shadow-sm">
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
              <Link to="/" >
                Homepage
              </Link>
            </li>
            <li>
              <p>
                <b>Categories</b>
              </p>
            </li>
            <li>
              <Link to="/product-list?category=makeup" >
                Makeup
              </Link>
            </li>
            <li>
              <Link to="/product-list?category=skin" >
                Skin-care
              </Link>
            </li>
            <li>
              <Link to="/product-list?category=hair" >
                Hair-care
              </Link>
            </li>
            <li>
              <Link
                to="/product-list?category=bath and body"
                
              >
                Bath and Body
              </Link>
            </li>
              {isLoggedin ? (<li>
              <b><Link
                to="/user-orders"
                
              >
                My Orders
              </Link></b>
            </li>):" "}
          </ul>
        </div>

        <Link to="/" className="btn btn-ghost text-accent text-xl font-semibold ">
          Luna
        </Link>
      </div>

      <div className="flex-none">
        {isLoggedin ? (
          <ul className="menu menu-horizontal px-1">
            <li>
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle"
              >
                <div className="indicator">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    onClick={clickHandler}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  <span className="badge badge-sm indicator-item">
                    {cartLength}
                  </span>
                </div>
              </div>
            </li>
            <li>
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src="https://th.bing.com/th/id/OIP.PKlD9uuBX0m4S8cViqXZHAHaHa?w=188&h=189&c=7&r=0&o=5&pid=1.7"
                  />
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

export default Header;
