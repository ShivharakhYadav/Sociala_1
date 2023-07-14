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
import { baseURL } from './Api Services/Links';
import io from "socket.io-client"
function App() {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.providerReducer?.user);
  const navigate = useNavigate();

  console.log("Store user", user)

  useEffect(() => {
    (async () => {
      const localData = getLocalStorageData(SOCIALA_USER);
      if (localData != null && localData.accessToken) {
        const tokenExpired = tokenDecode(localData?.accessToken)
        if (!tokenExpired && !user?.username) {
          const userResult = await getSingleUserRequest(localData?.username);
          dispatch(providerActions.save_user(userResult?.data));
        }
        else {
          navigate("/")
        }
      }
    })();
  }, [])

  useEffect(() => {
    console.log('socket useEffect Called');
    if (user._id) {
      let data = { userid: user._id, username: user.username }
      const socket = io(baseURL);
      socket.emit("userConnected", data);

      // listener for notification of requested Follow
      // socket.on("requestedToFollow", (result: any) => {
      //   console.log("data for notification", result);
      //   if (result.success) {
      //     // setToLocalStorage(localStorageKeys.USER_DETAILS, result.data)
      //     // dispatch(providerActions.update_user(result.data))
      //   }
      // })

      // //changeNotification Status
      // socket.on("changeNotificationStatus", (result: any) => {
      //   console.log("changeNotificationStatus from socket data", result);
      //   dispatch(providerActions.change_notification_status(result))
      // })

      // //Follow Request Accepted
      // socket.on("followeRequestAccepted", (data: any) => {
      //   console.log("followeRequestAccepted from socket data", data);
      //   //if (Object.keys(data).length > 0) {
      //   if (data) {
      //     dispatch(providerActions.followRequestAccepted(data));
      //   }
      //   //}
      // })

      // // New Post Uploaded
      // socket.on("uploadedNewPost", (data: any) => {
      //   console.log('data from mew post', data);
      // })
    }
  }, [user._id])
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
