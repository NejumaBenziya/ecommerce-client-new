
import { createRoot } from 'react-dom/client'

//  Pages (user side)
import Homepage from './pages/Homepage'
import Login from './pages/Login'
import Cartpage from './pages/Cartpage'
import Wishlistpage from './pages/Wishlistpage'
import Register from './pages/Register'
import Categoriespage from './pages/Categoriespage'
import Productpage from './pages/Productpage'
import Orderpage from './pages/Orderpage'
import UserOrderpage from './pages/UserOrderpage'
import Reviewpage from './pages/Reviewpage'
import SearchPage from './pages/SearchPage'

// Admin pages
import AdminHomepage from './pages/AdminHomepage'
import AdminCategoriespage from './pages/AdminCategoriespage'
import AddProductpage from './pages/AddProductpage'
import UserListpage from './pages/UserListpage'
import CreateSalepage from './pages/CreateSalepage'
import SaleListPage from './pages/SaleListpage'

//  Seller pages
import SellerHomepage from './pages/SellerHomepage'
import Sellerpages from './pages/Sellerpages'
import OrderDetailspage from './pages/OrderDetailspage'

// Layouts (wrap pages with header/footer)
import UserLayout from './layouts/UserLayout'
import AdminLayout from './layouts/AdminLayout'
import SellerLayout from './layouts/SellerLayout'

//  Redux store
import { store } from './globalState/store'
import { Provider } from 'react-redux'

//  React Router
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

//  Global styles
import "./styles/global.css"

//  Toast notifications
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


// =========================
// ROUTER CONFIGURATION
// =========================
const router = createBrowserRouter([

  // =========================
  // USER ROUTES
  // =========================
  {
    path: "", // base path
    element: <UserLayout />, // layout wrapper
    children: [

      { path: "/", element: <Homepage />, children: [] }, // home page

      { path: "/login", element: <Login />, children: [] }, // login

      { path: "/register", element: <Register />, children: [] }, // register

      { path: "/product-list", element: <Categoriespage />, children: [] }, // category page

      { path: "/search", element: <SearchPage />, children: [] }, // search

      { path: "/cart-list", element: <Cartpage />, children: [] }, // cart

      { path: "/wishlist", element: <Wishlistpage />, children: [] }, // wishlist

      { path: "/product", element: <Productpage />, children: [] }, // product details

      { path: "/order", element: <Orderpage />, children: [] }, // checkout

      { path: "/user-orders", element: <UserOrderpage />, children: [] }, // order history

      { path: "/review", element: <Reviewpage />, children: [] } // review page
    ]
  },

  // =========================
  //  ADMIN ROUTES
  // =========================
  {
    path: "/admin",
    element: <AdminLayout />, // admin layout
    children: [

      { path: "homepage", element: <AdminHomepage />, children: [] },

      { path: "adminproductlist", element: <AdminCategoriespage />, children: [] },

      { path: "addproduct", element: <AddProductpage />, children: [] },

      { path: "user-list", element: <UserListpage />, children: [] },

      { path: "create-sale", element: <CreateSalepage />, children: [] },

      { path: "sale-list", element: <SaleListPage />, children: [] }
    ]
  },

  // =========================
  // SELLER ROUTES
  // =========================
  {
    path: "/seller",
    element: <SellerLayout />, // seller layout
    children: [

      { path: "homepage", element: <SellerHomepage />, children: [] },

      { path: "orders-list", element: <Sellerpages />, children: [] },

      { path: "order-details", element: <OrderDetailspage />, children: [] }
    ]
  }

]);


// =========================
//  APP ROOT RENDER
// =========================
createRoot(document.getElementById('root')).render(

  //  Redux Provider wraps entire app
  <Provider store={store}>

    {/*  Router */}
    <RouterProvider router={router} />

    {/*  Toast notifications (global) */}
    <ToastContainer
      position="top-right"   //  position of toast
      autoClose={2000}       // closes in 2 seconds
      theme="colored"        //  colored theme
    />

  </Provider>

);