import { useEffect } from "react";
import Register from "./components/Register/Register";

import { Route,  Routes, useNavigate } from "react-router-dom";
import Home from "./components/Home/Home";
import axios from "axios";
import { SERVER } from "./constant";
import { useDispatch } from "react-redux";
import { loginSuccess } from "./auth/authSlice";
import Login from "./components/login/Login";

function App() {

  const dispatch = useDispatch()
  const navigate = useNavigate();
  
  useEffect(() => {
    const checkAuth = async() => {
     try {
       const response = await axios.get(`${SERVER}/user/me`, {
           withCredentials: true
       });

       if (response.data.success) {
         dispatch(loginSuccess({
           user:response.data?.user,
           token: response.data?.user?.accessToken
          }))
            
       }
      
   } catch (error) {
       console.error('Failed to fetch user details:', error);
       navigate("/login")
   }
    }
    checkAuth()
},[])

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/register" element={<Register/>} />  
        <Route path="/login" element={<Login/>} />  
      </Routes>
    </>
  )
}

export default App
