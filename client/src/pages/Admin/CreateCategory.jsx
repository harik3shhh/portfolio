import React, { useState, useEffect } from 'react';
import AdminMenu from '../../components/Layout/AdminMenu';
import axios from "axios";
import CategoryForm from '../../components/Form/CategoryForm';
import { Modal } from "antd";
import { useAuth } from '../../context/auth';
import { toast } from 'react-toastify';

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(false);
  const [auth] = useAuth();

  // GET ALL CATEGORIES
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("https://portfolio-backend-nine-lilac.vercel.app/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting category");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  // DELETE CATEGORY
  const handleDelete = async (id) => {
    try {
      const config = {
        headers: {
          Authorization: `${auth.token}`
        }
      };

      const { data } = await axios.delete(`https://portfolio-backend-nine-lilac.vercel.app/api/v1/category/delete-category/${id}`, config);
      if (data.success) {
        toast.success(`Category is Deleted`);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong while Deleting");
    }
  };

  return (
    <>
      <div className="my-12 flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-1/4 relative">
            <AdminMenu />
            <div className="absolute top-0 bottom-0 right-0 w-px bg-gray-300"></div>
          </div>
          <div className="lg:w-3/4 p-4 lg:p-8 bg-white rounded-md shadow-md">
            <h1 className="text-3xl font-bold mb-6">Manage Category</h1>
            <div className="w-full mb-8">
              <CategoryForm />
            </div>
            <div className="w-full overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 py-2 px-4">Name</th>
                    <th className="border border-gray-300 py-2 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories?.map(c => (
                    <tr key={c._id} className="bg-white">
                      <td className="border border-gray-300 py-2 px-4">{c.name}</td>
                      <td className="border border-gray-300 py-2 px-4">
                        <button className="bg-blue-500 text-white py-1 px-2 rounded-md mb-2 mr-2 hover:bg-blue-600" onClick={() => { setOpen(true); setUpdatedName(c.name); setSelected(c) }}>Edit</button>
                        <button className="bg-red-500 text-white py-1 px-2 rounded-md hover:bg-red-600" onClick={() => handleDelete(c._id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <Modal onCancel={() => setOpen(false)} footer={null} open={open} />
        </div>
      </div>
    </>
  );
};

export default CreateCategory;
