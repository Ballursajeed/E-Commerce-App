import { useEffect, useState } from "react"
import { useCheckAuth } from "../../hooks/useAuthCheck";
import Navbar from "../Navbar/Navbar";
import "./Cart.css"
import axios from "axios";
import { SERVER } from "../../constant";
import CartItem from "../CartItem/CartItem";

const Cart = () => {

    const checkAuth = useCheckAuth();
    const [total,setTotal] = useState(0);
    const [products,setProducts] = useState([])

useEffect(() => {
   checkAuth('/login');
   const getMyCart = async() => {
     const res = await axios.get(`${SERVER}/cart/getCart`,{
      withCredentials: true
     });
     console.log(res.data.carts);
     if (res.data.success) {
      setProducts(res.data.products)
      setTotal(res.data.carts[0].total)
     }
     if (res.data.products.length === 0) {
       setTotal(0);
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
        products.map((item) => <CartItem product={item}/>)
      }

      <div className="subTotal">
        <span>SubToal(1 item): ${total}</span>
      </div>
     </div>
    </>
  )
}

export default Cart
