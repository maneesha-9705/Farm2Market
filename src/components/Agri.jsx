import React, { useState } from "react"
import {useNavigate} from "react-router-dom"
import Header from "./Header"
import Footer from "./Footer"
import "./Agri.css"

function CropForm(){

const navigate = useNavigate()

const [crop,setCrop] = useState("")
const [mandal,setMandal] = useState("")
const [village,setVillage] = useState("")
const [address,setAddress] = useState("")
const [price,setPrice] = useState("")

const priceMap = {
paddy:"₹1800 - ₹2200",
maize:"₹1500 - ₹1900",
blackgram:"₹6000 - ₹7500"
}

function handleCrop(e){

const value = e.target.value
setCrop(value)
setPrice(priceMap[value])

}

function handleSell(){

if(!crop || !mandal || !village || !address){

alert("Please fill all required fields")
return

}

navigate("/User")

}

  return (
    <div className="app-container">
      <Header />
      <main className="main-content">
        <div className="container">
          <h2>Sell Your Crop</h2>

          <label>Crop<span className="required">*</span></label>
          <select onChange={handleCrop}>
            <option value="">Select Crop</option>
            <option value="paddy">Paddy</option>
            <option value="maize">Maize</option>
            <option value="blackgram">Black Gram</option>
          </select>
          {price && <div className="price-info">Market Price: {price}</div>}

          <label>District</label>
          <input value="Krishna" disabled />

          <label>Mandal<span className="required">*</span></label>
          <select onChange={(e) => setMandal(e.target.value)}>
            <option value="">Select Mandal</option>
            <option value="Avanigadda">Avanigadda</option>
            <option value="Bantumilli">Bantumilli</option>
            <option value="Challapalli">Challapalli</option>
            <option value="Ghantasala">Ghantasala</option>
            <option value="Guduru">Guduru</option>
            <option value="Koduru">Koduru</option>
            <option value="Kruthivennu">Kruthivennu</option>
            <option value="Machilipatnam">Machilipatnam</option>
            <option value="Mopidevi">Mopidevi</option>
            <option value="Nagayalanka">Nagayalanka</option>
            <option value="Pedana">Pedana</option>
          </select>

          <label>Village<span className="required">*</span></label>
          <input
            placeholder="Enter Village"
            onChange={(e) => setVillage(e.target.value)}
          />

          <label>Address<span className="required">*</span></label>
          <textarea
            placeholder="Enter Full Address"
            rows="3"
            onChange={(e) => setAddress(e.target.value)}
          />

          <button onClick={handleSell}>
            Sell Crop
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );

}

export default CropForm