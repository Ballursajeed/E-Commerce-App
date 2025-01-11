import { useEffect, useState } from "react"
import "./GetSingleProduct.css"
import axios, { AxiosError } from "axios"
import { SERVER } from "../../constant"
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import { ErrorResponse } from "../login/Login"

 export interface singleProductType {
  _id:string;
   category: string;
   createdAt: string;
   description:string;
   image: string;
   modelImage: string;  
   name: string;
   price: number;
   stocks: number;
   updatedAt: string;
}



const GetSingleProduct = ({isSeller}:{isSeller?:boolean}) => {

  const { id } = useParams();
  const [product,setProduct] = useState<singleProductType>({
    _id:'',
   category: '',
   createdAt: '',
   description:'',
   image: '',
   modelImage: '',
   name: '',
   price: 0,
   stocks: 1,
   updatedAt: '',
  });
  const [counter,setCounter] = useState(product.stocks);
  const [price,setPrice] = useState(product.price);

  const navigate = useNavigate();

  useEffect(() => {
        const singleProduct = async() => {
              const res = await axios.get(`${SERVER}/product/getSingleProduct/${id}`);
              if (res.data.success) {
                setProduct(res.data.product)
                setPrice(res.data.product.price)
              } 
        }
        singleProduct()
  },[])

  const addToCart = async() => {
      try {
         const res = await axios.post(`${SERVER}/cart/addItems`,{
          id,stocks: counter
         },{
          withCredentials:true
         });
         if (res.data.success) {
          toast.success('Product Added to cart Successfully!', {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            onClose: () => {
              navigate("/cart")
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
      }
       
  }

  const buyNow = async() => {
   try {
     const res = await axios.post(`${SERVER}/cart/addItems`,{
       id,stocks: counter
      },{
       withCredentials:true
      })
      if (res.data.success) {
            navigate(`/order/${product._id}/${counter}`);
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
   }
  }
  
  const handleDelete = async() => {
    window.alert("Do you want to delete the Product?");

    try {
      const res = await axios.delete(`${SERVER}/product//delete/${id}`,{
       withCredentials:true
      });
      if (res.data.success) {
       toast.success('Product Deleted!', {
         position: "top-center",
         autoClose: 1000,
         hideProgressBar: false,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: true,
         onClose: () => {
           navigate("/dashboard/products")
         }
     })
      }
   } catch (error) {
      
     const axiosError = error as AxiosError<ErrorResponse>; 
     console.log(axiosError.response);
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
   }

  }

  const counterAdd = () => {
          setPrice((prev) => prev + product.price)
          setCounter((prev) => prev+1)
        }
  
  const counterNagativeHandler = () => {
          if (counter === 1) {
            setCounter(1);
          }
          else{
            setCounter((prev) => prev - 1)
            setPrice((prev) => prev - product.price)
          }
        }

  return (
    <>
    <div className="singleProduct">
      <div className="singleLeft">
      <div className="left-name">
            <h1>{product.name}</h1>
        </div>
         <div className="image">
            <img src={product.image} alt="hello" />
        </div> 
        <div className="quantity">
          <button className="counterBtn" onClick={counterNagativeHandler}>-</button>
          <p>quantity:{counter}</p>
          <button className="counterBtn" onClick={counterAdd}>+</button>
        </div>
        
        <span>Available: {product.stocks - counter}</span>
      </div>
      <div className="singleRight">
        <div className="name">
            <h1>{product.name}</h1>
        </div>
        <div className="price">
          ₹{price} 
        </div>
        <div className="avaible">
          {
            product.stocks <= 0 ? <span id="outStock">Out Of Stocks</span> : <span>In Stocks</span>
          }
          
        </div>
        <div className="right-quantity">
          <button className="counterBtn" onClick={counterNagativeHandler}>-</button>
          <p>quantity:{counter}</p>
          <button className="counterBtn" onClick={counterAdd}>+</button>
        </div>
        <span id="right-span">Available: {product.stocks - counter}</span>
        {
          isSeller ? 
          <>
            <div className="buttons">
              <button id="upp" onClick={() => navigate(`/dashboard/update-product/${id}`)}>Update Product</button>
              <button id="del" onClick={handleDelete}>Delete</button>
            </div>
          </> : 
          <>
            <div className="buttons">
              <button id="add" onClick={addToCart}>Add To Cart</button>
              <button id="buy" onClick={buyNow}>Buy Now</button>
            </div>
          </>
        }
        

        <div className="description">
            <span>Description:</span>
            {product.description}
        </div>
      </div>
    </div>
    <ToastContainer />
    </>
  
  )
}

export default GetSingleProduct
