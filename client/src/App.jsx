import React from 'react'
import Navbar from './components/Navbar'
import { Route, Routes } from "react-router-dom"
import PageNotFound from './pages/PageNotFound'
import Home from './pages/Home'
import Footer from './components/Footer'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import ForgotPassword from './pages/Auth/ForgotPassword'
import AdminRoute from './routes/AdminRoute'
import AdminDashboard from './pages/Admin/AdminDashboard'
import CreateCategory from './pages/Admin/CreateCategory'
import Dashboard from './pages/User/Dashboard'
import PrivateRoute from './routes/Private'
import CreatePlace from './pages/Admin/CreatePlace'
import Places from './pages/Admin/Places'
import Users from './pages/Admin/Users'
import UpdatePlace from './pages/Admin/UpadatePlace'
import Profile from './pages/User/Profile'

const App = () => {
  return (
    <div>
    <Navbar/>
  
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path='/profile' element={<Profile />} />
        <Route path="/forgot-password" element={<ForgotPassword/>}/>


        <Route path='/dashboard' element={<PrivateRoute />} > 
             <Route path='user' element={<Dashboard  />} />
        </Route>

        <Route path='/dashboard' element={<AdminRoute/>}>
        <Route exact path='admin' element={<AdminDashboard />} />
        <Route path='admin/create-category' element={<CreateCategory />} />
        <Route path='admin/create-place' element={<CreatePlace />} />
        <Route path='admin/places' element={<Places/>} />
        <Route path='admin/allusers' element={<Users/>} />
        <Route path='admin/place/:slug' element={<UpdatePlace />} />

        
        </Route>
        
        <Route path="*" element={<PageNotFound/>}/>
      </Routes>

    <Footer/>
    </div>
  )
}

export default App