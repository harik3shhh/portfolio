import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/auth.jsx'
import "react-toastify/dist/ReactToastify.css"
import { ToastContainer } from 'react-toastify'
import { Zoom } from 'react-toastify';

ReactDOM.createRoot(document.getElementById('root')).render(
    
    <AuthProvider>
    <BrowserRouter>
    <ToastContainer
      position="top-right"
      autoClose={1000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
      transition= {Zoom}
      />
    <App />
    </BrowserRouter>
    </AuthProvider>

)
