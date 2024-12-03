import './Register.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import Loading from '../Loader/Loader.tsx';
import  { FormEvent, useState } from 'react';
import axios, { AxiosError } from 'axios';
import {SERVER} from "../../constant.ts"
import { Link, useNavigate, useParams } from 'react-router-dom';

interface ErrorResponse {
    message: string;
  }

const Order = () => {

    const { id, stocks } = useParams()

    const [name, setName] = useState('')
    const [country, setCountry] = useState('')
    const [state, setState] = useState('')
    const [district, setDistrict] = useState('');
    const [address, setAddress] = useState('');
    const [pincode, setPincode] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('cash');
    const [loading, setLoading] = useState(false);  // Add loading state


    const navigate = useNavigate()

    


    const hangleSubmit = async(e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      setLoading(true);
       try {

         const res = await axios.post(`${SERVER}/order/add`,{
            name,country,state,district,address,pincode,paymentMethod,id,stocks
         },
         {
          withCredentials:true
       });
 
       

       if (res.data.success) {
       
        toast.success('Order Placed Successfully!', {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          onClose: async () => {  // Ensure navigation happens after toast closes
            navigate('/payment')
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
    <div className='registerContainer'>
      <div className='register'>
      <h2>CheckOut</h2>
      <form action="" method='post' onSubmit={hangleSubmit}>
          <div>
           <label htmlFor="state"> Name: </label>
           <input type="text" 
                placeholder='Enter your Name...' 
                id='name' 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
           />
          </div>
          <div>
          <label htmlFor="country">Country: </label>
                    <input type="text" 
                          placeholder='Enter Your Country...' 
                          id='country' 
                          value={country}
                          onChange={(e) => setCountry(e.target.value)}
                          required
                    />
          </div>

          <div>
            <label htmlFor="name">State: </label>
            <input type="text" 
                  placeholder='Enter Yout State...' 
                  id='state' 
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  required
            />
          </div>

          <div>
            <label htmlFor="district">District: </label>
            <input type="text" 
                  placeholder='Enter District...'
                  id='district' 
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  required
            />
          </div>

          <div>
            <label htmlFor="district">Address: </label>
            <textarea  
                  placeholder='Enter Address...'
                  id='address' 
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
            />
          </div>

          <div>
            <label htmlFor="district">PinCode: </label>
            <input type="text" 
                  placeholder='Enter PinCode...'
                  id='pincode' 
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  required
            />
          </div>

          <div>
            <label htmlFor="district">Payment Method: </label>
            <select 
                  id='district' 
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  required
            >
                <option value="cash">cash</option>
                <option value="card">card</option>
            </select>
          </div>

          <button type='submit' className='btn'>Submit</button>
        </form>
     </div>
     <ToastContainer />
    </div>
  )
}

export default Order
