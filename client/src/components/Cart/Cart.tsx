import { useEffect, useState } from "react"
import { useCheckAuth } from "../../hooks/useAuthCheck";
import "./Cart.css"
import axios from "axios";
import { SERVER } from "../../constant";
import CartItem from "../CartItem/CartItem";
import { useDispatch, useSelector } from "react-redux";
import { setAmount } from "../../subTotal/subTotalSlice";
import Loading from "../Loader/Loader";

interface stateType {
  subTotal: {
    amount: string;
  };
}


const Cart = () => {

    const checkAuth = useCheckAuth();
    const [products,setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const count = useSelector((state:stateType) => state.subTotal.amount);
    const dispatch = useDispatch();

useEffect(() => {
   checkAuth('/login');
   const getMyCart = async() => {
    setLoading(true)
     const res = await axios.get(`${SERVER}/cart/getCart`,{
      withCredentials: true
     });
     console.log(res.data.carts);
     if (res.data.success) {
      setProducts(res.data.products)
      dispatch(setAmount(res.data.carts[0].total));
      setLoading(false)
     }
     if (res.data.products.length === 0) {
      dispatch(setAmount(0))
      setLoading(false)
     }
   }
   getMyCart()
},[])


  return (
    <>
      <div className="cart">
      <h1>Shopping Cart</h1>
      {
        loading && <><Loading /></>
      }
      {
        products.length === 0 
        ? <>
           <div className="no-items">No Items Added</div>           
          </>
        : products.map((item,index) => <CartItem product={item} key={index} slNo = {index}/>)
      }

      <div className="subTotal">
        <span>SubToal({products.length} item): ₹{count}</span>
      </div>
     </div>
    </>
  )
}

export default Cart
