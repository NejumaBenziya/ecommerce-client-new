import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import SellerHeader from '../components/SellerHeader'


const SellerLayout = () => {
  return (
    <div className="flex flex-col min-h-screen"><SellerHeader/>
    <main className="flex-1">
        <Outlet/>
        </main>
        <Footer/></div>
  )
}

export default SellerLayout