import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom'
import Login from './pages/auth/Login';
import ProtectedRoute from './utils/ProtectedRoutes';
import Home from './pages/Home';
import { getLocalStorageData } from './utils/LocalStorageHelper';
import { SOCIALA_USER } from './utils/Keys';
import './App.css'
import Register from './pages/auth/Register';
import { useDispatch, useSelector } from 'react-redux';
import { tokenDecode } from './utils/HelperFunction';
import { getSingleUserRequest } from './Api Services/AccountServices';
import providerActions from './store/actions/provider/actions';
import Header from './pages/Header';
function App() {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.providerReducer?.user);
  console.log("user", user)

  return (
    <>
      {user?.id && <Header />}
      <Routes>
        {
          user?.id ?
            <>
              <Route element={<Home />} path='/' />
            </>
            :
            <>
              <Route element={<Login />} path="/" />
              <Route element={<Register />} path="/register" />
            </>
        }
      </ Routes>
    </>

  )
}

export default App;
