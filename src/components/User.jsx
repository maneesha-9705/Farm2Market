import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Header from "./Header"
import Footer from "./Footer"
import "./Agri.css"

function User() {
    const navigate = useNavigate()

    useEffect(() => {
        // Check if user is logged in
        const token = localStorage.getItem("token");
        if (!token) {
            alert("Please login or register to access this page.");
            navigate("/login");
        }
    }, [navigate]);

    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [otp, setOtp] = useState("")
    const [generatedOtp, setGeneratedOtp] = useState("")
    const [otpSent, setOtpSent] = useState(false)
    const [verified, setVerified] = useState(false)
    const [verify, setVerify] = useState(false)
    const [confirm, setConfirm] = useState(false)

    function sendOtp() {

        if (phone.length !== 10) {
            alert("Enter valid 10 digit mobile number")
            return
        }

        const randomOtp = Math.floor(1000 + Math.random() * 9000)

        setGeneratedOtp(randomOtp)
        setOtpSent(true)

        alert("Demo OTP : " + randomOtp) // For testing

    }

    function verifyOtp() {

        if (otp == generatedOtp) {

            setVerified(true)
            alert("Mobile Verified Successfully")

        } else {

            alert("Invalid OTP")

        }

    }

    async function confirmSell() {

    if (!verified) {
        alert("Please verify mobile number first")
        return
    }

    try {

        const token = localStorage.getItem("token")

        const response = await fetch("http://localhost:5000/confirm-sell", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                name,
                phone
            })
        })

        const data = await response.json()

        if (response.ok) {
            setConfirm(true)
            alert(data.message)
        } else {
            alert("Failed to confirm sell")
        }

    } catch (error) {
        console.error(error)
        alert("Server error")
    }

}
    return (
        <div className="app-container">
            <Header />
            <main className="main-content">
                <div className="container">
                    <h2>Farmer Details</h2>

                    <p className="info">
                        Fields marked with <span className="required">*</span> are required
                    </p>

                    <label>Name<span className="required">*</span></label>
                    <input
                        placeholder="Enter Name"
                        onChange={(e) => setName(e.target.value)}
                    />

                    <label>Mobile Number<span className="required">*</span></label>
                    <div className="phoneRow">
                        <input
                            placeholder="Enter Mobile Number"
                            onChange={(e) => setPhone(e.target.value)}
                        />
                        <button className="otpBtn" onClick={sendOtp}>
                            Send OTP
                        </button>
                    </div>

                    {otpSent && (
                        <div className="otpSection">
                            <label>Enter OTP<span className="required">*</span></label>
                            <input
                                placeholder="Enter OTP"
                                onChange={(e) => setOtp(e.target.value)}
                            />
                            <button className="verifyBtn" onClick={verifyOtp}>
                                Verify OTP
                            </button>
                        </div>
                    )}

                    {verified && <p className="success">✓ Mobile Number Verified</p>}

                    <button onClick={confirmSell} disabled={!verified}>
                        Confirm Sell
                    </button>
                    {confirm && <p className="success">✓ Sell Confirmed! Our team will contact you.</p>}
                </div>
            </main>
            <Footer />
        </div>
    );

}

export default User