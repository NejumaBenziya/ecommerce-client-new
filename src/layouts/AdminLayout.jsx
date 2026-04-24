import React from 'react'
import AdminHeader from '../components/AdminHeader'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'

function AdminLayout() {
  return (
    //  Main container (full height layout using flexbox)
    <div className="flex flex-col min-h-screen" >

      {/*  Admin navigation bar (top section) */}
      <AdminHeader />

      {/*  Main content area */}
      <main className="flex-1">

        {/*  Outlet renders child routes dynamically */}
        {/* Example: /admin/homepage, /admin/addproduct etc */}
        <Outlet />

      </main>

      {/*  Footer section (bottom of page) */}
      <Footer />
    </div>
  )
}

export default AdminLayout