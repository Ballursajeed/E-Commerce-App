import { useState } from "react";
import { productType } from "../SingleProduct/SingleProduct";
import "./cartItem.css"
import { useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { SERVER } from "../../constant";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from "react-redux";
import { decrementByAmount, incrementByAmount } from "../../subTotal/subTotalSlice";

interface ErrorResponse {
  message: string;
}


const CartItem = ({
    product,slNo
}:productType) => {

    const [counter,setCounter] = useState(1);
    const [price,setPrice] = useState(product.price);
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const counterNagativeHandler = () => {
        if (counter <= 1) {
          setCounter(1);
        }
        else{
          setCounter((prev) => prev - 1)
          setPrice((prev) => prev - product.price)
          dispatch(decrementByAmount(product.price))
        }
      }

      const counterAdd = () => {
        setCounter((prev) => prev+1)
        setPrice((prev) => prev + product.price)
        dispatch(incrementByAmount(product.price))
      }

      const handleBuy = () => {
       navigate(`/order/${product._id}/${counter}`);
      }  

    const handleDelete = async() => {
     try {
       const res = await axios.post(`${SERVER}/cart//delete/${product._id}`,{},{
         withCredentials: true
       })
      if (res.data.success) {
          console.log(res);
          toast.success('Item Deleted Successfully!', {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          onClose: async () => { 
            window.location.reload()
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
     }
      
    }


    

  return (
    <div>
      <div className="item">
      
        <div className="itemImage">
        <h1 id="mobile-name"><span>{Number(slNo) + 1}) </span>{product.name}</h1>
          <img id="prd" src={product.image} alt="" />
        </div>
        <div className="itemRight">
          <div className="info">
            <h1>{product.name}</h1>
            <h3>Price: <span id="prc">₹{price}</span></h3>
          </div>
          <div className="counter">
            <button className="counterBtn" onClick={counterNagativeHandler}>-</button>
            <p>quantity:{counter}</p>
            <button className="counterBtn" onClick={counterAdd}>+</button>
          </div>
          <div className="delBuy">
            <button onClick={handleBuy} className="buybtn buybtn-buy">
              <span>Proceed to Buy</span>
            </button>
            <button onClick={handleDelete} className="deletebtn deletebtn-delete">
              <span>Delete</span>
            </button>
          </div>
          
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default CartItem
