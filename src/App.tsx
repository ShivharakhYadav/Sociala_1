import { Routes, Route } from 'react-router-dom'
import Login from './pages/auth/Login';
import Home from './pages/Home';
import './App.css'
import Register from './pages/auth/Register';
import { useDispatch, useSelector } from 'react-redux';
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
