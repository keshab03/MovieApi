import React from "react"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Nav from "./Nav/Nav"
import Home from "./Home/Home"
import Fev from "./Fev/Fev"
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/fev" element={<Fev />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
export default App
