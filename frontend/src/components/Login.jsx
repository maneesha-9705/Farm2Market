import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import "./Agri.css";

function Login() {
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    async function handleLogin(e) {
        e.preventDefault();

        if (!phone || !password) {
            alert("Please enter both phone and password.");
            return;
        }

        try {
            // Adjust the URL if your backend login endpoint is different
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ phone, password }),
            });

            const data = await response.json();

            if (response.ok && data.token) {
                // Here we store the token that the backend sends
                localStorage.setItem("token", data.token);
                alert("Login successful!");

                // Navigate to the User page after successful login
                navigate("/");
            } else {
                alert(data.message || "Login failed. Please check your credentials.");
            }
        } catch (error) {
            console.error("Login error:", error);
            alert("Server error. Please check if the backend is running.");
        }
    }

    return (
        <div className="app-container">
            <Header />
            <main className="main-content">
                <div className="auth-card">
                    <h2 className="auth-title">Welcome Back</h2>
                    <p className="auth-subtitle">Login to your Farm2Market account to continue.</p>

                    <form onSubmit={handleLogin} className="auth-form">
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
                            Login
                        </button>
                    </form>
                    <div className="auth-footer">
                        Don't have an account? <Link to="/register" className="auth-link">Register here</Link>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default Login;
