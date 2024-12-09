import { useEffect, useState } from 'react';
import GetProducts from '../GetProducts/GetProducts'
import Navbar from '../Navbar/Navbar'
import "./ListProducts.css"
import axios from 'axios';
import { SERVER } from '../../constant';
import SingleProduct from '../SingleProduct/SingleProduct';

const ListProducts = () => {

    // const [sort, setSort] = useState("");
    const [maxPrice, setMaxPrice] = useState(100); // Set a default max price
  // const [currentPrice, setCurrentPrice] = useState(50); // Example current price
     const [categories,setCategory] = useState([]);
     const [products,setProducts] = useState([]);
     const [isAll,setIsAll] = useState(true);
  // const progressPercentage = (currentPrice / maxPrice) * 100;

  useEffect(() => {
      const fetchCategory = async() => {
        const response = await axios.get(`${SERVER}/product/getAllCategories`);
        if (response.data.success) {
            setCategory(response.data.categories)
        }
      }    
      fetchCategory()
  },[])

  const categoryHandler = async(category:string) => {
       setIsAll(false)
       const res = await axios.get(`${SERVER}/product/getProductByCategory/${category}`);
       if (res.data.success) {
         setProducts(res.data.products)
       } 
  }

  const priceSort = async(sort:string) => {
    setIsAll(false)
    const res = await axios.get(`${SERVER}/product/price/${sort}`);
    if (res.data.success) {
      setProducts(res.data.products)
    } 
  }

  return (
    <div>
      <Navbar />  
      <div className="listContainer">
      <div className="listLeft">
      <h1>FILTER</h1>
      <span>Sort</span>
      <div className="priceLong">
        <select>
          <option value="">None</option>
          <option value="asc" onClick={() => priceSort('asc')} >Price (Low to High)</option>
          <option value="dsc" onClick={() => priceSort('dsc')}>Price (High to Low)</option>
        </select>
        <div className="price-range-container">
          <span>Max Price: {maxPrice || ""}</span>
          <input
            type="range"
            min={100}
            max={100000}
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
          />
        </div>
        <span>Category</span>
        <select>
          <option onClick={() => setIsAll(true)}>All</option>
          {
            categories.map(
              (category) => 
              <option onClick={() => categoryHandler(category)}>
                {category}
              </option> )
          }
        </select>
      </div>
    </div>
        <div className="listRight">
            <h1>Products</h1>
            {
              isAll ?  <GetProducts /> :  
              <div className='productContainer'>
                {
                products.map((product,index) => {
                  
                  return <SingleProduct key={index} product={product}/>
                })
                }
             </div> 
            }
         
        </div>
      </div>
      
    </div>
  )
}

export default ListProducts
