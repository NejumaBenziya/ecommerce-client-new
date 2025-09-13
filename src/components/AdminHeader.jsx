import React from 'react'
import { Link } from 'react-router-dom'


function AdminHeader() {
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
            <li><Link to="/admin/homepage">Homepage</Link></li>
            <li><p><b>Categories</b></p></li>
            <li><Link 
      to={{
        pathname: "/admin/adminproductlist",
        search: "?category=makeup"
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
    >
      Skin-care
    </Link></li>
    <li><Link 
      to={{
        pathname: "/admin/adminproductlist",
        search: "?category=hair"
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
    >
      Bath and Body
    </Link>
    </li>
    <li><Link to="/admin/addproduct"><b>Add product</b></Link></li>
    <li><Link to="/admin/user-list"><b>User List</b></Link></li>
    <li><Link 
      to={{
        pathname: "/admin/user-list",
        search: "?role=admin"
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
    >
      seller
    </Link>
    </li>
     <li><Link 
      to={{
        pathname: "/admin/user-list",
        search: "?role=member"
      }}
    >
      member
    </Link>
    </li>
    <li><Link to="/admin/create-sale"><b>Create new sale</b></Link></li>
    <li><Link to="/admin/sale-list"><b>Sale List</b></Link></li>
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