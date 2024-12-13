import axios, { AxiosError } from 'axios';
import  { FormEvent, useState } from 'react'
import { SERVER } from '../../constant.js';
import { loginStart, loginSuccess } from '../../auth/authSlice.js';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import Loading from '../Loader/Loader.jsx';
import '../Register/Register.css'


export interface ErrorResponse {
  message: string;
}


const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const submitHandler = async(e:FormEvent<HTMLFormElement>) => {
        dispatch(loginStart())
        e.preventDefault()
      setLoading(true); 

      try {
          const res = await axios.post(`${SERVER}/user/login`,{
              username,
              password
          },
      {withCredentials: true});
  
      if (res.data.success) {
     dispatch(loginSuccess({
        user: res.data.user,
        token: res.data.accessToken
     }))
     toast.success('LoggedIn Successfully!', {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      onClose: () => {
        navigate("/")
      }
  })
   
      }

      } catch (error) {
       
        const axiosError = error as AxiosError<ErrorResponse>; // Explicitly assert the error type

        console.log(axiosError.response); // Now TypeScript knows this exists
        toast.error(
          `${axiosError?.response?.data?.message || "Something went wrong!"}`,
          {
          position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
        })
      }finally {
        setLoading(false);  // Stop loading after the process completes
       }
    

    }

  return (
    <>
    {
      loading ? <Loading /> : <>
         <div className="registerContainer">
     
     <div className="register">
      <h2>Login</h2>
        <form action="" method='post' onSubmit={submitHandler}>
          <div>
            <label htmlFor="username">Username: </label>
            <input type="text" 
                  placeholder='Enter Username...' 
                  id='username' 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
            />
          </div>

         <div>
            <label htmlFor="password">Password: </label>
            <input type="text" 
                  placeholder='Enter Password...'
                  id='password' 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
            />
         </div>

      <button type='submit' className='btn'>Submit</button>
      <div>
        <p>Not Registered?</p>
        <Link to="/register">Register</Link> 
      </div>
      </form>
     </div>

     </div>
      </>
    }
     
     <ToastContainer />
    </>
  )
}

export default Login
