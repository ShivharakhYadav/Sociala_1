import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom'
import Login from './pages/auth/Login';
import ProtectedRoute from './utils/ProtectedRoutes';
import Home from './pages/Home';
import { getLocalStorageData } from './utils/LocalStorageHelper';
import { SOCIALA_USER } from './utils/Keys';
import './App.css'
import Register from './pages/auth/Register';
function App() {
  const [isAuthenticated, SetAuthenticated] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const localData = getLocalStorageData(SOCIALA_USER);
    console.log(localData)
    if (localData != null) {
      SetAuthenticated(true)
    }
    // else {
    //   navigate("/");
    // }
  }, [])

  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path="/" element={
        <ProtectedRoute isAuthenticated={isAuthenticated} SetAuthenticated={SetAuthenticated}>
          <Home />
        </ProtectedRoute>
      } />
      <Route path='/home2' element={<Home />} />
      <Route path='*' element={<h1>Not Found</h1>} />
    </ Routes>
  )
}

export default App;
