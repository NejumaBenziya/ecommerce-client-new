import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Homepage from './pages/Homepage'
import Login from './pages/Login'
import Cartpage from './pages/Cartpage'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import {store} from './globalState/store'
import "./styles/global.css"
import UserLayout from './layouts/UserLayout'
import { Provider } from 'react-redux'
import Register from './pages/Register'
import Categoriespage from './pages/Categoriespage'
import Productpage from './pages/Productpage'
import Orderpage from './pages/Orderpage'
import AdminLayout from './layouts/AdminLayout'
import AdminHomepage from './pages/AdminHomepage'
import AdminCategoriespage from './pages/AdminCategoriespage'
import AddProductpage from './pages/AddProductpage'
import UserListpage from './pages/UserListpage'
import SellerLayout from './layouts/SellerLayout'
import SellerHomepage from './pages/SellerHomepage'
import Sellerpages from './pages/Sellerpages'
import OrderDetailspage from './pages/OrderDetailspage'
import UserOrderpage from './pages/UserOrderpage'
import Reviewpage from './pages/Reviewpage'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CreateSalepage from './pages/CreateSalepage'
import SaleListPage from './pages/SaleListpage'

const router=createBrowserRouter([
  {
    path:"",
    element:<UserLayout/>,
    children:[{
  path :"/",
  element:<Homepage/>,
  children:[]
},
{
  path:"/login",
  element:<Login/>,
  children:[]
},
{
  path:"/register",
  element:<Register/>,
  children:[]
},
{
  path:"/product-list",
  element:<Categoriespage/>,
  children:[]
},{
  path:"/cart-list",
  element:<Cartpage/>,
  children:[]
},{
  path:"/product",
  element:<Productpage/>,
  children:[]
},{
  path:"/order",
  element:<Orderpage/>,
  children:[]
},{
  path :"/user-orders",
  element:<UserOrderpage/>,
  children:[]
},{
  path :"/review",
  element:<Reviewpage/>,
  children:[]
}]
},
{
  path:"/admin",
  element:<AdminLayout/>,
  children:[{
  path :"homepage",
  element:<AdminHomepage/>,
  children:[]
},{
  path:"adminproductlist",
  element:<AdminCategoriespage/>,
  children:[]
},{
  path:"addproduct",
  element:<AddProductpage/>,
  children:[]
},{
  path:"user-list",
  element:<UserListpage/>,
  children:[]
},{
  path:"create-sale",
  element:<CreateSalepage/>,
  children:[]
},{
  path:"sale-list",
  element:<SaleListPage/>,
  children:[]
}]
},{
  path:"/seller",
  element:<SellerLayout/>,
  children:[{
  path :"homepage",
  element:<SellerHomepage/>,
  children:[]
},{
  path :"orders-list",
  element:<Sellerpages/>,
  children:[]
},{
  path :"order-details",
  element:<OrderDetailspage/>,
  children:[]
}]
  }])


createRoot(document.getElementById('root')).render(
  
    <Provider store={store}>
   <RouterProvider router={router}/>
   <ToastContainer position="top-right" autoClose={2000} theme="colored" />
   </Provider>
  
)
