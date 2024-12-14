import  { FormEvent, useState } from 'react';
import axios, { AxiosError } from 'axios';
import {SERVER} from "../../constant.ts"
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import '../Register/Register.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

interface ErrorResponse {
  message: string;
}

const NewAdmin = () => {

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
   
    const location = useLocation()
    const navigate = useNavigate()


    const hangleSubmit = async(e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
       try {

        console.log(email,username,password);
        
         
         const res = await axios.post(`${SERVER}/user/become-seller`,{
          email,
          username,
          password
         },
        );

       console.log(res.data);
 
       if (res.data.success) {
        console.log(res.data);
        
        navigate('/become-admin/agree')
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
          }
        );
       }
    }

    const shouldHideRegister = location.pathname === "/become-admin";

  return (
    <>
    <Outlet />
    { shouldHideRegister && <> 
          <div className="registerContainer">
     <div className='register'>
      <h2>Become a Seller:</h2>
      <form action="" method='post' onSubmit={hangleSubmit}>
          <div>
          <label htmlFor="email">Email: </label>
                    <input type="text" 
                          placeholder='Enter Email...' 
                          id='email' 
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                    />
          </div>

          <div>
            <label htmlFor="username">Username: </label>
            <input type="text" 
                  placeholder='Enter Username...' 
                  id='username' 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
            />
          </div>

          <div>
            <label htmlFor="password">Password: </label>
            <input type="text" 
                  placeholder='Enter Password...'
                  id='password' 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
            />
          </div>

          <button type='submit' className='btn'>Submit</button>
          <div>
            <p>Don't have an Account?</p>
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

export default NewAdmin
