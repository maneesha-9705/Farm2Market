import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import "./Agri.css";

const API_URL = import.meta.env.VITE_API_URL;

function Register() {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    async function handleRegister(e) {
        e.preventDefault();

        if (!name || !phone || !password) {
            alert("Please fill in all fields.");
            return;
        }

        try {
            const response = await fetch(`${API_URL}/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, phone, password }),
            });

            const data = await response.json();

            if (response.ok) {
                alert(data.message);
                navigate("/login");
            } else {
                alert(data.message || "Registration failed.");
            }
        } catch (error) {
            console.error("Registration error:", error);
            alert("Server error. Please check if the backend is running.");
        }
    }

    return (
        <div className="app-container">
            <Header />
            <main className="main-content">
                <div className="auth-card">
                    <h2 className="auth-title">Create an Account</h2>
                    <p className="auth-subtitle">Join Farm2Market today and connect directly with buyers.</p>

                    <form onSubmit={handleRegister} className="auth-form">
                        <div className="form-group">
                            <label>Full Name<span className="required">*</span></label>
                            <input
                                type="text"
                                placeholder="Enter Full Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Mobile Number<span className="required">*</span></label>
                            <input
                                type="text"
                                placeholder="Enter Mobile Number"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Password<span className="required">*</span></label>
                            <input
                                type="password"
                                placeholder="Enter Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <button className="btn-primary full-width" type="submit">
                            Register
                        </button>
                    </form>
                    <div className="auth-footer">
                        Already have an account? <Link to="/login" className="auth-link">Login here</Link>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default Register;
