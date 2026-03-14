import React from "react"
import { Link } from "react-router-dom"
import "./Agri.css"

function Header() {

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
                <Link to="/login" className="nav-link btn-outline">Login</Link>
                <Link to="/register" className="nav-link btn-solid">Register</Link>
            </nav>
        </header>
    )

}

export default Header