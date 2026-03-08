import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import CropForm from './components/Agri'
import { Router,Route,Routes} from "react-router-dom"
import User from './components/User'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Routes>
      <Route path="/" element={<CropForm/>}/>
      <Route path="/User" element={<User/>}/>
    </Routes>
    </>
  )
}

export default App
