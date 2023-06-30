import { Routes, Route } from 'react-router-dom'
import Login from './pages/auth/Login';
import Home from './pages/Home';
import './App.css'
import Register from './pages/auth/Register';
import { useDispatch, useSelector } from 'react-redux';
import Header from './pages/Header';
import EditProfile from './pages/Profiles/EditProfile';
import Userprofile from './pages/Profiles/Userprofile';
function App() {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.providerReducer?.user);
  console.log("user", user)

  return (
    <>
      {user?.username && <Header />}
      <Routes>
        {
          user?.username ?
            <>
              <Route element={<Home />} path='/' />
              <Route element={<Userprofile />} path='/:username' />
              <Route element={<EditProfile />} path='/:username/edit' />
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
