import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/auth';
import axios from 'axios';
import { toast } from 'react-toastify';

const Profile = () => {
    const [auth, setAuth] = useAuth();

    const [user, setUser] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
    });

    // Handling input
    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setUser({
            ...user,
            [name]: value,
        });
    };

    useEffect(() => {
        if (auth?.user) {
            const { name, email, phone } = auth.user;
            setUser({
                ...user,
                name,
                email,
                phone,
            });
        }
    }, [auth?.user]);
    
    // Handle submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const config = {
                headers: {
                    Authorization: `${auth.token}`,
                },
            };

            const { data } = await axios.put('http://localhost:8000/api/auth/profile', user, config);
            if (data?.error) {
                toast.error(data?.error);
            } else {
                setAuth({
                    ...auth,
                    user: data?.updatedUser,
                });
                let ls = localStorage.getItem('auth');
                ls = JSON.parse(ls);
                ls.user = data.updatedUser;
                localStorage.setItem('auth', JSON.stringify(ls));
                toast.success('Profile Updated Successfully');
            }
        } catch (error) {
            console.log(error);
            toast.error('Something Went Wrong');
        }
    };

    return (
        <>
            
            <div className="flex justify-center items-center h-screen">
                <div className="w-full md:w-2/3 lg:w-1/2 px-4 py-8 border rounded shadow-lg">
                    <form onSubmit={handleSubmit}>
                        <h1 className="text-2xl font-bold mb-8 text-center">USER PROFILE</h1>
                        <div className="mb-4">
                            <label>Name</label>
                            <input
                                type="text"
                                className="form-control"
                                name="name"
                                value={user.name}
                                onChange={handleInput}
                                style={{ borderRadius: '5px', width: '100%', padding: '8px', outline: "none",  border:"1px solid black"}}
                            />
                        </div>

                        <div className="mb-4">
                            <label>Email Address</label>
                            <input
                                type="email"
                                className="form-control"
                                name="email"
                                value={user.email}
                                onChange={handleInput}
                                disabled
                                style={{ borderRadius: '5px', width: '100%', padding: '8px' }}
                            />
                        </div>

                        <div className="mb-4">
                            <label>Phone</label>
                            <input
                                type="phone"
                                className="form-control"
                                name="phone"
                                value={user.phone}
                                onChange={handleInput}
                                style={{ borderRadius: '5px', width: '100%', padding: '8px' , outline: "none", border:"1px solid black"}}
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary"
                            style={{
                                backgroundColor: '#007bff',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '3px',
                                padding: '10px 20px',
                                cursor: 'pointer',
                                width: '100%',
                            }}
                        >
                            UPDATE
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Profile;
