import { useEffect, useState } from 'react';
import GetProducts from '../GetProducts/GetProducts'
import Navbar from '../Navbar/Navbar'
import "./ListProducts.css"
import axios from 'axios';
import { SERVER } from '../../constant';
import SingleProduct from '../SingleProduct/SingleProduct';

const ListProducts = () => {

     const [maxPrice, setMaxPrice] = useState(100000); 
     const [categories,setCategory] = useState([]);
     const [products,setProducts] = useState([]);
     const [isAll,setIsAll] = useState(true);
     const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
      const fetchCategory = async() => {
        const response = await axios.get(`${SERVER}/product/getAllCategories`);
        if (response.data.success) {
            setCategory(response.data.categories)
        }
      }    
      fetchCategory()
  },[]);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

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

  const maxPriceSorting  = async(price:Number) => {
    setIsAll(false)

    const res = await axios.get(`${SERVER}/product/price/${price}`);
    if (res.data.success) {
      setProducts(res.data.products)
    } 

  }

  return (
    <div>
      <Navbar />  
      <div className="listContainer">
      <button id='ham' className="listhHamburger" onClick={toggleMenu}>
      <span className="icon">🔍</span> Filters
      </button>
      <div className = {`listLeft ${isMenuOpen ? "open" : ""}`}>
      <h1>FILTER</h1>
      <span>Sort</span>
      <div className="priceLong">
        <select>
          <option value="" onClick={() => setIsAll(true)}>None</option>
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
          <button onClick={() => maxPriceSorting(maxPrice)}>Go</button>
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
