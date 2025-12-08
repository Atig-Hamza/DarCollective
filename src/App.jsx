import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Tirelire from './pages/Tirelire.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import NotFound from './pages/404.jsx'
import AuthMiddleware from './middleware/authMiddleware.jsx'
import Dashboard from './pages/Dashboard.jsx'
import ProfilePage from './pages/Profile.jsx'
import Groups from './pages/Groups.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<AuthMiddleware><Dashboard/></AuthMiddleware>} />
      <Route path="/tirelire" element={<AuthMiddleware><Tirelire/></AuthMiddleware>} />
      <Route path="/groups" element={<AuthMiddleware><Groups view="list"/></AuthMiddleware>} />
      <Route path="/groups/create" element={<AuthMiddleware><Groups view="create"/></AuthMiddleware>} />
      <Route path="/groups/join" element={<AuthMiddleware><Groups view="list"/></AuthMiddleware>} />
      <Route path="/profile" element={<AuthMiddleware><ProfilePage/></AuthMiddleware>} />
      <Route path="login" element={<Login/>}/>
      <Route path="/signup" element={<Signup/>} />
      <Route path="*" element={<NotFound/>} />
    </Routes>
  )
}

export default App
