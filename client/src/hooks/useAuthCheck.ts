import axios from "axios";
import { SERVER } from "../constant";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../auth/authSlice";
import { useNavigate } from "react-router-dom";

export const useCheckAuth = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate();

  const checkAuth = async(path: string) => {

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
      window.location.reload();
      navigate(`${path}`)
  }
  
}

return checkAuth;
}

 