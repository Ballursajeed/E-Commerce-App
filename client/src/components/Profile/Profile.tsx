
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the styles
import  { stateType } from '../Navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import { SERVER } from '../../constant';
import axios, { AxiosError } from 'axios';
import { ErrorResponse } from '../login/Login';
import "./Profile.css"
import { useEffect } from 'react';
import { useCheckAuth } from '../../hooks/useAuthCheck';

const Profile = () => {

    const user = useSelector((state: stateType) => state.auth.user);
    const defaultImage = 'https://github.com/Ballursajeed/Blog-App/raw/refs/heads/main/client/public/default-profile-image.webp'

    const navigate = useNavigate();
    const checkAuth = useCheckAuth()

    useEffect(() => {
        checkAuth('/');
    },[])

    const handleDelete = async() => {
        window.alert("Do you want to delete Your Account?");
        
        try {
          const res = await axios.delete(`${SERVER}/user/deleteUser/${user?._id}`, {
            withCredentials: true
          });
          
          if (res.status === 200) {
            // Refresh the page after successful deletion
            toast.success('Profile Deleted Successfully!', {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            })
            
          } else {
            console.error("Failed to delete the blog");
          }
        }   catch (error) {

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
  
      const handleEdit = async() => {
           navigate(`/edit-profile/${user?._id}`)
      } 
      const handleLogout = async() => {
        window.alert("Do you want to Logout from Your Account?");
        try {
          const res = await axios.post(`${SERVER}/user/logout`,{},{
            withCredentials: true
        });
          
          if (res.data.success) {
            toast.success('logout Successfully!', {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              onClose: () => {
                setTimeout(() => window.location.reload(),1000)
              }
            })
            
          } else {
            console.error("Failed to logout");
          }
        }   catch (error) {

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
  

  return (
      <>

<div className="Profile-container">
  <div className="Profile-card">
    <img src={user?.avatar ? user.avatar : `${defaultImage}` } alt="Avatar" />
    <h2 className="Profile-fullname">{user.fullName}</h2>
    <p className="Profile-username">{user.username}</p>
    <button className='edit-btn' onClick={handleEdit}>edit</button>
    <button className='edit-btn' onClick={handleLogout}>logout</button>
    <button className='delete-btn' onClick={handleDelete}>delete Profile</button>
  </div>
</div>
<ToastContainer />
</>
  )
}

export default Profile
