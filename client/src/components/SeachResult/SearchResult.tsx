import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom"
import { SERVER } from "../../constant";
import Navbar from "../Navbar/Navbar";
import SingleProduct from "../SingleProduct/SingleProduct";
import "../ListProducts/ListProducts.css"
import GetProducts from "../GetProducts/GetProducts";

const SearchResult = () => {

    const [searchParams] = useSearchParams();
    const query = searchParams.get('query');
    const [products,setProducts] = useState([]);
    const [maxPrice, setMaxPrice] = useState(100);

    useEffect(() => {
        const fetchResults = async () => {
            try {
              const response = await axios.get(`${SERVER}/product/search?search=${query}`);
              setProducts(response.data.products);

              if (response.data.products.length === 0) {
                 setProducts([]);
                 console.log("I am Here!");
              }

            } catch (error) {
              console.error('Error fetching search results:', error);

            }
          };
      
          if (query) fetchResults();
    },[query])

    const [categories,setCategory] = useState([]);
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
      <h1>Products:</h1>
    
    {
    products.length === 0 ?
    <>
     <h1 id="empty">No Results Found!</h1>
    </> : 
     ( !isAll ? 
  <div className='productContainer'> 
   {
     products.map((product,index) => {
    
      return <SingleProduct key={index} product={product}/>
    })
   }
  </div>
      : <GetProducts />) 
     }
    </div>
   </div>
    
  </div>
  )
}

export default SearchResult
