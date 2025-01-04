import { useNavigate } from "react-router-dom"
import "./Product.css"

 export interface productType {
   product:{
   _id:string,
   category: string,
   createdAt: string,
   description:string,
   image: string,
   name: string,
   price: number,
   stocks: number,
   updatedAt: string,
   }
   ,slNo?: Number;
}

const SingleProduct = ({
    product
}:productType) => {


   const navigate = useNavigate()

  return (
     <div className="card" onClick={() => navigate(`/single/${product._id}`)}>
       <img src={`${product.image}`} alt="Avatar" />
       <div className="cardContainer">
         <div className="cardleft">
            <h4><b id="name">{product.name}</b></h4>
            <p id="price">₹{product.price}</p>
         </div>
         <div className="stock">
            <span id="stock">only {product.stocks} left</span>
         </div>
       </div>
     </div>
  )
}

export default SingleProduct
