import React from 'react'
import { Link , useNavigate } from 'react-router-dom'
import axios from 'axios';
import {  useDispatch } from "react-redux";
import { logout } from "../globalState/login/loginSlice";

function AdminHeader() {
   const dispatch = useDispatch();
  const navigate = useNavigate();
   const handleLogout = async () => {
  try {
    await axios.post("/api/user/logout", {}, { withCredentials: true });
  } catch (err) {
    console.error("Logout error", err);
  } finally {
    dispatch(logout());
    navigate("/login");
  }
};
  return (
     <div className="navbar bg-base-100 shadow-sm">
      <div className="flex-1">
         <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /> </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
            <li><Link to="/admin/homepage"
             onClick={() => {
  
  document.activeElement.blur();
             }}>
            Homepage</Link></li>
            <li><p><b>Categories</b></p></li>
            <li><Link 
      to={{
        pathname: "/admin/adminproductlist",
        search: "?category=makeup"
      }}
       onClick={() => {
  
  document.activeElement.blur();
}}
    >
      Makeup
    </Link>
    </li>
    <li><Link 
      to={{
        pathname: "/admin/adminproductlist",
        search: "?category=skin"
      }}
       onClick={() => {
  
  document.activeElement.blur();
}}
    >
      Skin-care
    </Link></li>
    <li><Link 
      to={{
        pathname: "/admin/adminproductlist",
        search: "?category=hair"
      }}
       onClick={() => {
  
  document.activeElement.blur();
}}
    >
      Hair-care
    </Link>
    </li>
    <li><Link 
      to={{
        pathname: "/admin/adminproductlist",
        search: "?category=bath and body"
      }}
       onClick={() => {
  
  document.activeElement.blur();
}}
    >
      Bath and Body
    </Link>
    </li>
    <li><Link to="/admin/addproduct"
     onClick={() => {
  
  document.activeElement.blur();
}}><b>Add product</b></Link></li>
    <li><Link to="/admin/user-list"
     onClick={() => {
  
  document.activeElement.blur();
}}><b>User List</b></Link></li>
    <li><Link 
      to={{
        pathname: "/admin/user-list",
        search: "?role=admin"
      }}
       onClick={() => {
  
  document.activeElement.blur();
}}
    >
      admin
    </Link>
    </li>
     <li><Link 
      to={{
        pathname: "/admin/user-list",
        search: "?role=seller"
      }}
       onClick={() => {
  
  document.activeElement.blur();
}}
    >
      seller
    </Link>
    </li>
     <li><Link 
      to={{
        pathname: "/admin/user-list",
        search: "?role=member"
      }}
       onClick={() => {
  
  document.activeElement.blur();
}}
    >
      member
    </Link>
    </li>
    <li><Link to="/admin/create-sale"
     onClick={() => {
  
  document.activeElement.blur();
}}><b>Create new sale</b></Link></li>
    <li><Link to="/admin/sale-list"
     onClick={() => {
  
  document.activeElement.blur();
}}><b>Sale List</b></Link></li>
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
        <Link to="/admin/homepage" className="btn btn-ghost text-xl">Luna Admin</Link>
      </div>
      <div className="flex-none">
        
          
          
          
          <ul className="menu menu-horizontal px-1">
          <li><div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://th.bing.com/th/id/OIP.PKlD9uuBX0m4S8cViqXZHAHaHa?w=188&h=189&c=7&r=0&o=5&pid=1.7" />
            </div></div></li></ul>
           
          
        
      </div>
    </div>
  )
}

export default AdminHeader