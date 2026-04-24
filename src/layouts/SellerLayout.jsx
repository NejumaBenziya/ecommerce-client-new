import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import SellerHeader from '../components/SellerHeader'

const SellerLayout = () => {
  return (
    //  Main container using flexbox (full screen height)
    <div className="flex flex-col min-h-screen">

      {/*  Seller navigation header */}
      <SellerHeader/>

      {/*  Main content area */}
      <main className="flex-1">

        {/*  Outlet renders nested seller routes dynamically */}
        {/* Example: /seller/homepage, /seller/orders-list */}
        <Outlet/>

      </main>

      {/*  Footer section */}
      <Footer/>

    </div>
  )
}

export default SellerLayout