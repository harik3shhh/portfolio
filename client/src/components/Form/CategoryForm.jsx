import React, { useState } from 'react';
import { useAuth } from '../../context/auth';
import { toast } from 'react-toastify';

const CategoryForm = () => {
    const [auth] = useAuth();
    const [place, setPlace] = useState({
        name: '',
    });

    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setPlace({
            ...place,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const url = 'https://portfolio-backend-nine-lilac.vercel.app/api/v1/category/create-category';
            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `${auth.token}`,
                },
                body: JSON.stringify(place),
            });

            const data = await res.json();
            if (res && res.ok) {
                setPlace({ name: '' });
                toast.success(`New Category ${place.name} is Created!!!`);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(data.message);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mx-auto w-3/4 mt-8 flex flex-col items-center">
            <input
                type="text"
                className="p-3 rounded border border-gray-300 flex-grow mr-2 mb-2"
                placeholder="Enter New Category"
                name="name"
                value={place.name}
                onChange={handleInput}
            />
            <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded font-semibold hover:bg-blue-600"
                style={{ minWidth: '100px', marginBottom: '20px' }}
            >
                Submit
            </button>
        </form>
    );
};

export default CategoryForm;
