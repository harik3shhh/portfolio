import React from 'react';
import { NavLink } from 'react-router-dom'

const AdminMenu = () => {
  return (
    <>
      
      <h1 className="text-3xl font-bold mb-5">Admin Menu</h1>

      <div className="mt-5 flex flex-col h-full justify-start items-start">
        <NavLink to="/dashboard/admin/create-category" ><button className="py-2 px-4 rounded mb-2 bg-blue-500 text-white w-36">Create Cat</button></NavLink>


        <NavLink to="/dashboard/admin/create-place" ><button className="py-2 px-4 rounded mb-2 bg-green-500 text-white w-36">Create Project</button></NavLink>


        <NavLink to="/dashboard/admin/places"><button className="py-2 px-4 rounded mb-2 bg-yellow-500 text-white w-36">Projects</button></NavLink>

        <NavLink to="/dashboard/admin/allusers"><button className="py-2 px-4 rounded mb-2 bg-red-500 text-white w-36">Users</button></NavLink>
      </div>
    </>
  );
};

export default AdminMenu;
