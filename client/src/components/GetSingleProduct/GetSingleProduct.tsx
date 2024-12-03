import { useEffect, useState } from "react"
import Navbar from "../Navbar/Navbar"
import "./GetSingleProduct.css"
import axios from "axios"
import { SERVER } from "../../constant"
import { useParams } from "react-router-dom"

 export interface singleProductType {
  _id:string;
   category: string;
   createdAt: string;
   description:string;
   image: string;
   name: string;
   price: number;
   stocks: number;
   updatedAt: string;
}

const GetSingleProduct = () => {

  const { id } = useParams();
  const [product,setProduct] = useState<singleProductType>({
    _id:'',
   category: '',
   createdAt: '',
   description:'',
   image: '',
   name: '',
   price: 0,
   stocks: 1,
   updatedAt: '',
  });
  const [counter,setCounter] = useState(product.stocks);

  useEffect(() => {
        const singleProduct = async() => {
              const res = await axios.get(`${SERVER}/product/getSingleProduct/${id}`);
              if (res.data.success) {
                setProduct(res.data.product)
              } 
        }
        singleProduct()
  },[])

  const counterNagativeHandler = () => {
        if (counter <= 1) {
          setCounter(1);
        }
        else{
          setCounter((prev) => prev - 1)

        }
  }

  return (
    <>
      <Navbar />
    <div className="singleProduct">
      <div className="singleLeft">
        <div className="image">
            <img src={product.image} alt="hello" />
        </div>
        <div className="quantity">
          <button className="counterBtn" onClick={counterNagativeHandler}>-</button>
          <p>quantity:{counter}</p>
          <button className="counterBtn" onClick={() => setCounter((prev) => prev+1)}>+</button>
        </div>
        
        <span>Available: {product.stocks - counter}</span>
      </div>
      <div className="singleRight">
        <div className="name">
            <h1>{product.name}</h1>
        </div>
        <div className="price">
            ${product.price}
        </div>
        <div className="avaible">
          <span>In Stocks</span>
        </div>

        <div className="buttons">
            <button id="add">Add To Cart</button>
            <button id="buy">Buy Now</button>
        </div>

        <div className="description">
            <span>Description:</span>
            {product.description}
        </div>
      </div>
    </div>
    </>
  
  )
}

export default GetSingleProduct
