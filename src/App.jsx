import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Tirelire from './pages/Tirelire.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/tirelire" element={<Tirelire />} />
    </Routes>
  )
}

export default App
