import React from 'react';
import { useAuth } from '../../context/auth'; 

const Dashboard = () => {
  const [auth] = useAuth()
  return (
    <div className="my-12 flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <h1 >USER DASHBOARD</h1>
      <hr />
      <div className='mt-'>
        <h2>Welcome  {auth?.user?.name} </h2>
      </div>
      
    
    </div>
  );
};

export default Dashboard;
