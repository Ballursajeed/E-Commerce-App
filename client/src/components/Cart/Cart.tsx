import { useEffect } from "react"
import { useCheckAuth } from "../../hooks/useAuthCheck";

const Cart = () => {

    const checkAuth = useCheckAuth();

useEffect(() => {
   checkAuth('/login')
},[])

  return (
    <div>
      <h1>Cart</h1>
    </div>
  )
}

export default Cart
