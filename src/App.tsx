import { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom'
import Login from './pages/auth/Login';
import Home from './pages/Home';
import './App.css'
import Register from './pages/auth/Register';
import { useDispatch, useSelector } from 'react-redux';
import Header from './pages/Header';
import EditProfile from './pages/Profiles/EditProfile';
import Userprofile from './pages/Profiles/Userprofile';
import { getLocalStorageData } from './utils/LocalStorageHelper';
import { SOCIALA_USER } from './utils/Keys';
import { tokenDecode } from './utils/HelperFunction';
import { getSingleUserRequest } from './Api Services/AccountServices';
import providerActions from './store/actions/provider/actions';
import BasicModal from './pages/NewPost';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import PersonalUserProfile from './pages/PersonalUserProfile';
function App() {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.providerReducer?.user);
  const navigate = useNavigate();

  console.log("Store user", user)

  useEffect(() => {
    (async () => {
      console.log("App Called");
      const localData = getLocalStorageData(SOCIALA_USER);
      if (localData != null && localData.accessToken) {
        const tokenExpired = tokenDecode(localData?.accessToken)
        console.log("tokenExpi", tokenExpired)
        if (!tokenExpired && !user?.username) {
          const userResult = await getSingleUserRequest(localData?.username);
          console.log("userResult App", userResult?.data);
          dispatch(providerActions.save_user(userResult?.data));
        }
        else {
          navigate("/")
        }
      }
    })();
  }, [])

  return (
    <>
      {user?.username && <Header />}
      <Routes>
        {
          user?.username ?
            <>
              <Route element={<Home />} path='/' />
              <Route element={<Userprofile />} path='/profile' />
              <Route element={<EditProfile />} path='/:username/edit' />
              <Route element={<BasicModal />} path='/post' />
              <Route element={<PersonalUserProfile />} path='/:username' />
            </>
            :
            <>
              <Route element={<Login />} path="/" />
              <Route element={<Register />} path="/register" />
            </>
        }
      </ Routes>
      <ToastContainer />
    </>
  )
}

export default App;
