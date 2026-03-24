import React from "react"
import { Link, useNavigate } from "react-router-dom"
import "./Agri.css"

function Header() {
    const navigate = useNavigate()
    const token = localStorage.getItem("token")

    const handleLogout = () => {
        localStorage.removeItem("token")
        navigate("/login")
    }

    return (
        <header className="header">
            <div className="header-brand">
                <Link to="/" className="brand-link">
                    <h1>🌾 Farm2Market</h1>
                </Link>
                <p>Connecting Farmers Directly to Buyers</p>
            </div>
            <nav className="header-nav">
                <Link to="/" className="nav-link">Sell Crop</Link>
                {(token && token !== "undefined" && token !== "null") ? (
                    <button onClick={handleLogout} className="nav-link btn-outline" style={{ background: 'transparent', cursor: 'pointer', fontFamily: 'inherit', fontSize: '1rem' }}>Logout</button>
                ) : (
                    <>
                        <Link to="/login" className="nav-link btn-outline">Login</Link>
                        <Link to="/register" className="nav-link btn-solid">Register</Link>
                    </>
                )}
            </nav>
        </header>
    )

}

export default Header