import React from 'react'
import './App.css'
import Coins from './components/Coins'
import { Routes,Route } from 'react-router-dom'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Coins />} />
    </Routes>
  )
}

export default App
