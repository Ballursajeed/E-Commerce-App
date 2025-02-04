import  { FormEvent, useState } from 'react';
import axios, { AxiosError } from 'axios';
import {SERVER} from "../../constant.ts"
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { loginStart,loginSuccess } from '../../auth/authSlice.js';
import './Register.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import Loading from '../Loader/Loader.tsx';

interface ErrorResponse {
  message: string;
}

const Register = () => {

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [fullName, setFullname] = useState('')
    const [password, setPassword] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);  // Add loading state


    const dispatch = useDispatch()
    const navigate = useNavigate()


    const hangleSubmit = async(e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      setLoading(true);
       try {
        const formData = new FormData();
         formData.append("email",email)
         formData.append("username",username)
         formData.append("fullName",fullName)
         formData.append("password",password)
         
         if (file) {
            formData.append("avatar",file)
         }
         const res = await axios.post(`${SERVER}/user/register`,formData,
         {
          headers: {
              'Content-Type': 'multipart/form-data',
          }
       });
 
       if (res.data.success) {
        dispatch(loginStart())
        console.log("i am here you dumb ass!",res);
        
        toast.success('Registered Successfully!', {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          onClose: async () => {  // Ensure navigation happens after toast closes
            // Login request after registration
            const loginRes = await axios.post(`${SERVER}/user/login`, {
                username,
                password
            }, { withCredentials: true });

            if (loginRes.data.success) {
              console.log("i am here too you bitch!");
              
              dispatch(loginSuccess({
                     user: loginRes.data.user,
                     token: loginRes.data.accessToken
              }));

              navigate("/");  // Navigate after successful login
            }
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
          }
        );
       }finally {
        setLoading(false);  // Stop loading after the process completes
       }

    }

  return (
    <>
    {
      loading ? <Loading /> : <>
          <div className="registerContainer">
     <div className='register'>
      <h2>Register</h2>
      <form action="" method='post' onSubmit={hangleSubmit}>
          <div>
           <label htmlFor="fullName">Full Name: </label>
           <input type="text" 
                placeholder='Enter Full Name...' 
                id='fullName' 
                value={fullName}
                onChange={(e) => setFullname(e.target.value)}
                required
           />
          </div>
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

          <div className='imageUpload'>
    <label htmlFor='avatar'>Upload Profile Image:</label>
    <label className="customFileUpload">
        <span className="uploadIcon">📁 Choose File</span> 
        <p></p>
        <input type="file" id="avatar" onChange={(e) => {
            if (e.target.files) {
              setFile(e.target.files[0]);
            document.getElementById('fileName')!.textContent = e.target.files[0]?.name || "No file chosen";
            }
        }} />
    </label>
    <span id="fileName" className="fileName">No file chosen</span>
</div>
          <button type='submit' className='btn'>Submit</button>
          <div>
            <p>Already have an Account?</p>
            <Link to="/login">Login</Link> 
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

export default Register
