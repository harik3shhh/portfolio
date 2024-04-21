import React from 'react'
import  AdminMenu from "../../components/Layout/AdminMenu"



const AdminDashboard = () => {
  return (
    <>
   
    <div className="my-12 flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <h1 className="text-3xl font-bold mb-5">Admin Dashboard</h1>
  
    <hr />
    <AdminMenu/>
    </div>
    
    </>
  )
}

export default AdminDashboard