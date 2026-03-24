import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import CropForm from './components/Agri'
import { Route, Routes, Navigate } from "react-router-dom"
import User from './components/User'
import Login from './components/Login'
import Register from './components/Register'

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token || token === "undefined" || token === "null") {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path="/" element={<ProtectedRoute><CropForm /></ProtectedRoute>} />
        <Route path="/User" element={<ProtectedRoute><User /></ProtectedRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  )
}

export default App
