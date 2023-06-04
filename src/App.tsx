import React from 'react';
import { Routes, Route } from 'react-router-dom'
import Login from './pages/auth/Login';
function App() {
  return (
    <Routes>
      <Route element={<Login />} path='/login' />
    </ Routes>
  )
}

export default App;
