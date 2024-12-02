import { useEffect, useState } from 'react'
import Product from '../Product/Product'
import "./GetProducts.css"
import axios from 'axios'
import { SERVER } from '../../constant'

interface myPropTypes {
  limit: number
}

const GetProducts = ({
 limit
}:myPropTypes) => {

  const [product,setProducts] = useState([]);

  useEffect(() => {
        const getProducts = async() => {
              const res = await axios.get(`${SERVER}/product/getAllProducts`);
              
              if (res.data.success) {
              console.log(res.data.products);

                setProducts(res.data.products);
                console.log("products:",product);
                
              }
              
        }

        getProducts()
  },[])

  return (
    <div className='productContainer'>
   
     {
      product.map((product,index) => {
             return <Product key={index} product={product}/>
      })
     }
 
    </div>
  )
}

export default GetProducts
