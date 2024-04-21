import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

const ForgotPassword = ({ sidebar }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const [user, setUser] = useState({
        email: '',
        answer: '',
        newpassword: '',
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

    // Handle submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const url = 'https://portfolio-backend-nine-lilac.vercel.app/api/auth/forgot-password';
            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });

            const data = await res.json();
            if (res.ok) {
                setUser({ email: '', answer: '', newpassword: '' });
                toast.success('Password Reset Successful!!!');
                navigate(location.state || '/login');
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong');
        }
    };

    return (
        <>
          <div className="my-12 flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div style={{ background: '#f5f5f5', padding: '20px', borderRadius: '5px', textAlign: 'center' }}>
                <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto' }}>
                    <h1 style={{ marginBottom: '20px' }}>Reset Password</h1>

                    <div style={{ marginBottom: '15px' }}>
                        <input
                            type="email"
                            className="form-control"
                            name="email"
                            placeholder="Enter Your Email"
                            value={user.email}
                            onChange={handleInput}
                            style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
                        />
                    </div>

                    <div style={{ marginBottom: '15px' }}>
                        <input
                            type="text"
                            className="form-control"
                            name="answer"
                            placeholder="What is your favorite thing?"
                            value={user.answer}
                            onChange={handleInput}
                            style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
                        />
                    </div>

                    <div style={{ marginBottom: '15px' }}>
                        <input
                            type="password"
                            className="form-control"
                            name="newpassword"
                            placeholder="New Password"
                            value={user.newpassword}
                            onChange={handleInput}
                            style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
                        />
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ marginBottom: '15px', cursor: 'pointer', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '3px', padding: '10px 20px' }}>
                        Reset Password
                    </button>
                </form>
            </div>
            </div>
        </>
    );
};

export default ForgotPassword;
