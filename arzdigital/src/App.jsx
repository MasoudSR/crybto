import React from 'react'
import { Routes,Route } from 'react-router-dom'
import './App.css'

// components
import Coins from './components/Coins'
import CoinDetails from "./components/CoinDetails"
import Header from './components/Header'

function App() {
  return (
    <>
    <Header />
    <Routes>
      <Route path="/" element={<Coins />} />
      <Route path='/:id' element={<CoinDetails />} />
    </Routes>
    </>
  )
}

export default App
