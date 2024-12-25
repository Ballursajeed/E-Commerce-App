import { FormEvent, useState } from 'react'
import "../Register/Register.css";
import axios, { AxiosError } from "axios";
import { useParams } from 'react-router-dom';
import { ErrorResponse } from '../login/Login';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the styles
import { SERVER } from '../../constant';
import Loader from '../Loader/Loader';

const EditUser = () => {

    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [fullName, setFullName] = useState('')
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);  // Add loading state

    const navigate = useNavigate()
    const { id } = useParams()

    const submitHandler = async(e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      setLoading(true)

       try {
         
         const res = await axios.put(`${SERVER}/user/edit/${id}`,{
                 fullName, email, username
         },{
           withCredentials: true
         })

         if (res.data.success) {
            toast.success('Profile Updated Successfully!', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                onClose: () => {
                  navigate('/profile');
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
       } finally {
        setLoading(false)
       }
    }

    const handleUploadImage = async( e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()
      setLoading(true)
        try {
            const formData = new FormData();
            formData.append("avatar",file!)

            const res = await axios.put(`${SERVER}/user/edit-avatar/${id}`,formData,{
              withCredentials: true,
              headers: {
                'Content-Type': 'multipart/form-data',
            }
            })

            if (res.data.success) {
                toast.success('Profile Image Updated Successfully!', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    onClose: () => {
                      navigate('/profile')
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
          } finally {
            setLoading(false)
          }
    }
 
  return (
    <div>
      {
        loading ? <Loader/> : <>
        <div className="container">
       <div className="register">
       <h2>Update Account Details:</h2>
      <form action="" method='post' onSubmit={submitHandler}>
        <div>
          <label htmlFor="fullName">Full Name:</label>
          <input type="text" 
                placeholder='Enter Full Name...' 
                id='fullName' 
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="email">Email:</label>
          <input type="text" 
                placeholder='Enter Email...' 
                id='email' 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="username">Username:</label>
          <input type="text" 
                placeholder='Enter Username...' 
                id='username' 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <button type='submit' className='btn'>Submit</button>
      </form>

      <div className='imageUpload'>
        <label htmlFor='avatar'>Update Profile Image:</label>
        <label className="customFileUpload">
            <span className="uploadIcon">📁 Choose File</span> 
            <p></p>
            <input type="file" id="avatar" placeholder='update Image'  onChange={(e) => {
                if (e.target.files) {
                setFile(e.target.files[0]);
                document.getElementById('fileName')!.textContent = e.target.files[0]?.name || "No file chosen";
                }
            }} />
        </label>
        <span id="fileName" className="fileName">No file chosen</span>
      </div>
       <button onClick={handleUploadImage} className='img-btn'>Upload Image</button>
       </div>
     </div>
        </>
      }
     
     <ToastContainer />
    </div>
  )
}

export default EditUser