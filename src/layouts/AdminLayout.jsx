import React from 'react'
import AdminHeader from '../components/AdminHeader'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'

function AdminLayout() {
  return (
    <div className="flex flex-col min-h-screen" >
      <AdminHeader />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default AdminLayout