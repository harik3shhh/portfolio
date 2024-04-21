import React, { useEffect, useState } from 'react';
import { Select } from 'antd';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import AdminMenu from '../../components/Layout/AdminMenu';

const { Option } = Select;

const CreatePlace = () => {
    const navigate = useNavigate();

    const [categories, setCategories] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [photo, setPhoto] = useState('');
    const [link, setLink] = useState('');
   

    // GET ALL CATEGORY
    const getAllCategory = async () => {
        try {
            const { data } = await axios.get('http://localhost:8000/api/v1/category/get-category');
            if (data?.success) {
                setCategories(data?.category);
            }
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong in getting category');
        }
    };

    useEffect(() => {
        getAllCategory();
    }, []);

    // handlesubmit create product
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const productData = new FormData();
            productData.append('category', category);
            productData.append('name', name);
            productData.append('description', description);
            productData.append('photo', photo);
            productData.append('link', link)

            const { data } = await axios.post('http://localhost:8000/api/v1/place/create-place', productData);
            if (data?.success) {
                toast.success('Product Created Successfully');
                navigate('/dashboard/admin/places');
            } else {
                toast.error('Failed to Create Place');
            }
        } catch (error) {
            console.log(error);
            toast.error('something went wrong while creating Place');
        }
    };

    return (
        <>
            <div className="my-12 flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="container mx-auto px-4 py-8 bg-gray rounded-lg shadow-lg">
                    <div className="flex flex-wrap">
                        <div className="w-full md:w-1/4 md:text-center">
                            <AdminMenu />
                        </div>
                        <div className="w-full md:w-3/4">
                            <div className="w-3/4 mx-auto">
                                <h1 className="text-2xl mb-4">Create Project</h1>
                                <Select
                                    bordered={false}
                                    placeholder="Select a category"
                                    size="large"
                                    showSearch
                                    className="form-select mb-3"
                                    onChange={(value) => {
                                        setCategory(value);
                                    }}
                                >
                                    {categories?.map((c) => (
                                        <Option key={c._id} value={c._id}>
                                            {c.name}
                                        </Option>
                                    ))}
                                </Select>

                                {/* UPLOAD IMAGE */}
                                <div className="mb-3">
                                    <label htmlFor="upload-btn" className="bg-blue-500 text-white py-2 px-4 rounded cursor-pointer">
                                        {photo ? photo.name : 'Upload Image'}
                                    </label>
                                    <input
                                        type="file"
                                        id="upload-btn"
                                        name="photo"
                                        accept="image/*"
                                        onChange={(e) => setPhoto(e.target.files[0])}
                                        hidden
                                    />
                                </div>

                                {/* IMAGE PREVIEW */}
                                <div className="mb-3">
                                    {photo && (
                                        <div className="text-center">
                                            <img
                                                src={URL.createObjectURL(photo)}
                                                alt="photo to upload"
                                                height="200px"
                                                className="img img-responsive"
                                            />
                                        </div>
                                    )}
                                </div>

                                {/* Other input fields */}
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        value={name}
                                        placeholder="Write a name"
                                        className="form-control"
                                        style={{ width: '100%', marginBottom: '20px', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>

                                <div className="mb-3">
                                    <textarea
                                        cols="30"
                                        rows="4"
                                        value={description}
                                        placeholder="Description"
                                        className="form-control"
                                        style={{ width: '100%', marginBottom: '20px', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                                        onChange={(e) => setDescription(e.target.value)}
                                    ></textarea>
                                </div>

                                <div className="mb-3">
                                    <input
                                        type='text'
                                        value={link}
                                        placeholder="Your Project URL"
                                        className="form-control"
                                        style={{ width: '100%', marginBottom: '20px', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                                        onChange={(e) => setLink(e.target.value)}
                                    />
                                </div>

                       
                                <div className="mb-3">
                                    <button
                                        className="btn btn-primary bg-blue-500 text-white py-2 px-4 rounded cursor-pointer"
                                        onClick={handleSubmit}
                                    >
                                        CREATE PROJECT
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CreatePlace;
