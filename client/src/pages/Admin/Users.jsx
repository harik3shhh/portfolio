import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useAuth } from "../../context/auth";
import { toast } from 'react-toastify';
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import AdminMenu from '../../components/Layout/AdminMenu';

const Users = () => {
  const [auth] = useAuth();
  const [users, setUsers] = useState([]);

  const getAllUser = async () => {
    try {
      const config = {
        headers: {
          Authorization: `${auth.token}`,
        }
      };

      const { data } = await axios.get("http://localhost:8000/api/auth/alluser", config);
      setUsers(data?.alluser);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllUser();
  }, []);

  useEffect(() => {
    if (users.length > 0) {
      console.log("Users updated:", users);
    }
  }, [users]);

  const handleUpdate = (id) => {
    console.log("Update user with id:", id);
  }

  const handleDelete = async(id) => {
    try {
      const config={
        headers: {
          Authorization: `${auth.token}`
        }
      };

      const {data} = await axios.delete(`http://localhost:8000/api/auth/delete-user/${id}`, config);
      if(data.success){
        toast.success(`User is Deleted`);
        getAllUser();
      }else{
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong while Deleting");
    }
  }

  return (
    <>
     <div className="my-12 flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/4">
            <AdminMenu />
          </div>
          <div className="w-full md:w-3/4">
            <h2 className="text-3xl font-semibold mb-4">USER DATA</h2>
            <div className="overflow-x-auto">
              <table className="table-auto w-full">
                <thead>
                  <tr>
                    <th className="border p-2">Name</th>
                    <th className="border p-2">Email</th>
                    <th className="border p-2">Phone</th>
                    <th className="border p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((curUser, index) => (
                    <tr key={index}>
                      <td className="border p-2">{curUser.name}</td>
                      <td className="border p-2">{curUser.email}</td>
                      <td className="border p-2">{curUser.phone}</td>
                      <td className="border p-2 flex justify-center">
                        <button
                          onClick={() => handleUpdate(curUser._id)}
                          className="bg-blue-500 text-white py-1 px-2 rounded mr-2"
                        >
                          <FaEdit size={20} />
                        </button>
                        <button
                          onClick={() => handleDelete(curUser._id)}
                          className="bg-red-500 text-white py-1 px-2 rounded"
                        >
                          <MdDeleteForever size={20} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  )
}

export default Users;
