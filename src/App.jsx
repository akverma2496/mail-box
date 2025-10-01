import {BrowserRouter, Routes, Route} from 'react-router';
import { useEffect } from 'react';
import { Navigate } from 'react-router';
import Signup from "./pages/Signup"
import Layout from './pages/Layout';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import { useDispatch, useSelector } from 'react-redux';
import AuthInitializer from './components/AuthInitializer';
import Inbox from './pages/Inbox';
import Sent from './pages/Sent';
import { listenToInboxData } from './store/email-state/email-actions';
import { transformEmail } from './utilities/transformEmail';
import { db, ref, off } from '../firebase.config';

function App() {

  const {isLoggedIn, isHydrated} = useSelector(state => state.auth)
  const email = useSelector(state => state.auth.email)
  const dispatch = useDispatch()

  useEffect(() => {

    if(email){
      dispatch(listenToInboxData(email))
    }

    return () => {
      const user = transformEmail(email)
      const inboxRef = ref(db,`users/${user}/inbox`)
      off(inboxRef);
    }
  },[dispatch, email])

  return(
    <>
    <AuthInitializer />

    {
      !isHydrated ? <h3>Loading</h3> :
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />} >
              {/* what will go in the outlet */}

              {/* default index route */}
              <Route index element={<Login />} />

              {/* Public Routes */}
              <Route path='/signup' element={isLoggedIn ? <Navigate to="/inbox" replace/> : <Signup />} />
              <Route path='/login' element={isLoggedIn ? <Navigate to="/inbox" replace/> : <Login />} />

              {/* protected route */}  
              <Route element={<ProtectedRoute />}>
                <Route path='/inbox' element={<Inbox />} />
                <Route path='/sent' element={<Sent />} />
              </Route>

            </Route>
          </Routes>
        </BrowserRouter>
    }
    </>
  )
}

export default App
