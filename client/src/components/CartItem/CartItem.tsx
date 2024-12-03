import { useState } from "react";
import { productType } from "../SingleProduct/SingleProduct";
import "./cartItem.css"


const CartItem = ({
    product
}:productType) => {

    const [counter,setCounter] = useState(1);


    const counterNagativeHandler = () => {
        if (counter <= 1) {
          setCounter(1);
        }
        else{
          setCounter((prev) => prev - 1)
      
        }
      }

      console.log(product);
      

  return (
    <div>
      <div className="item">
        <div className="itemImage">
          <img id="prd" src={product.image} alt="" />
        </div>
        <div className="itemRight">
          <div className="info">
            <h1>{product.name}</h1>
            <h3>Price: <span id="prc">${product.price}</span></h3>
            
          </div>
          <div className="counter">
            <button className="counterBtn" onClick={counterNagativeHandler}>-</button>
            <p>quantity:{counter}</p>
            <button className="counterBtn" onClick={() => setCounter((prev) => prev+1)}>+</button>
          </div>
          <button className="deletebtn deletebtn-delete">
            <span>Delete</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default CartItem
