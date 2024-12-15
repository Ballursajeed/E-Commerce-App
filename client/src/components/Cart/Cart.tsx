import { useEffect, useState } from "react"
import { useCheckAuth } from "../../hooks/useAuthCheck";
import Navbar from "../Navbar/Navbar";
import "./Cart.css"
import axios from "axios";
import { SERVER } from "../../constant";
import CartItem from "../CartItem/CartItem";
import { useDispatch, useSelector } from "react-redux";
import { setAmount } from "../../subTotal/subTotalSlice";

interface stateType {
  subTotal: {
    amount: string;
  };
}


const Cart = () => {

    const checkAuth = useCheckAuth();
    const [products,setProducts] = useState([])
    const count = useSelector((state:stateType) => state.subTotal.amount);
    const dispatch = useDispatch();

useEffect(() => {
   checkAuth('/login');
   const getMyCart = async() => {
     const res = await axios.get(`${SERVER}/cart/getCart`,{
      withCredentials: true
     });
     console.log(res.data.carts);
     if (res.data.success) {
      setProducts(res.data.products)
      dispatch(setAmount(res.data.carts[0].total))
     }
     if (res.data.products.length === 0) {
      dispatch(setAmount(0))
     }
   }
   getMyCart()
},[])


  return (
    <>
      <Navbar />
      <div className="cart">
      <h1>Shopping Cart</h1>
      
      {
        products.map((item,index) => <CartItem product={item} key={index} slNo = {index}/>)
      }

      <div className="subTotal">
        <span>SubToal(1 item): ${count}</span>
      </div>
     </div>
    </>
  )
}

export default Cart
