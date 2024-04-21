import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import AdminMenu from '../../components/Layout/AdminMenu';

const Places = () => {
    const [products, setProducts] = useState([]);

    //GET ALL PRODUCTS
    const getAllProducts = async () => {
        try {
            const { data } = await axios.get('http://localhost:8000/api/v1/place/get-place');
            setProducts(data.products);
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong');
        }
    }

    //lifecycle method
    useEffect(() => {
        getAllProducts();
    }, []);

    return (
        <>
            <div className="my-12 flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row">
                    <div className="w-full md:w-1/4 mb-4 md:mb-0">
                        <AdminMenu />
                    </div>
                    <div className="w-full md:w-3/4">
                        <div className="text-center">
                            <h1 className="text-3xl font-semibold mb-8">All Places List</h1>
                        </div>
                        <div className="flex flex-wrap justify-center">
                            {products.map(p => (
                                <div key={p._id} className="m-4 p-4 rounded-lg shadow-md transition-transform bg-white max-w-md">
                                    <Link to={`/dashboard/admin/place/${p.slug}`} className="text-black no-underline">
                                        <div>
                                            <img src={`http://localhost:8000/api/v1/place/place-photo/${p._id}`} alt={p.name} className="w-full h-48 object-cover rounded-t-lg" />
                                            <div className="p-4">
                                                <h5 className="text-lg font-semibold mb-2">{p.name}</h5>
                                                <p>{p.description.substring(0, 30)}</p>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Places;
