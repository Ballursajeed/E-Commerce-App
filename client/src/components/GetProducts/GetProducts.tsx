import { useEffect, useState } from 'react'
import SingleProduct from '../SingleProduct/SingleProduct'
import "./GetProducts.css"
import axios from 'axios'
import { SERVER } from '../../constant'

interface myPropTypes {
  limit?: number
}

const GetProducts = ({
 limit
}:myPropTypes) => {

  const [product,setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
     const productsPerPage = 8; // 2 rows x 4 products per row

  useEffect(() => {
        const getProducts = async() => {
              const res = await axios.get(`${SERVER}/product/getAllProducts`);
              
              if (res.data.success) {
                setProducts(res.data.products);
              }
              
        }

        getProducts()
  },[])

   // Pagination logic
   const indexOfLastProduct = currentPage * productsPerPage;
   const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
   const currentProducts = product.slice(indexOfFirstProduct, indexOfLastProduct);

   const paginate = (pageNumber:number) => setCurrentPage(pageNumber);

  return (
   <>
     <div className='productContainer'>
   
   {
    currentProducts.map((product,index) => {
      if (limit) {
        if (index < limit) {
          return <SingleProduct key={index} product={product}/>
        }
      } else
      return <SingleProduct key={index} product={product}/>
    })
   }
  </div>


{/* Pagination Controls */}
{!limit && <div className="list-pagination">
                      {Array.from({ length: Math.ceil(product.length / productsPerPage) }).map((_, i) => (
                          <button
                              key={i}
                              className={currentPage === i + 1 ? 'active' : ''}
                              onClick={() => paginate(i + 1)}
                          >
                              {i + 1}
                          </button>
                      ))}
                  </div>
}
   </>
  )
}

export default GetProducts
