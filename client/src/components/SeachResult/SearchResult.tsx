import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom"
import { SERVER } from "../../constant";
import Navbar from "../Navbar/Navbar";
import SingleProduct from "../SingleProduct/SingleProduct";
import "../ListProducts/ListProducts.css"

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
            } catch (error) {
              console.error('Error fetching search results:', error);
            }
          };
      
          if (query) fetchResults();
    },[query])

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
        <option value="asc">Price (Low to High)</option>
        <option value="dsc">Price (High to Low)</option>
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
        <option>All</option>
        <option>Phone</option>
        <option>Books</option>
      </select>
    </div>
  </div>
      <div className="listRight">
      <h1>Products</h1>
  <div className='productContainer'> {
      products.map((product,index) => {
    
        return <SingleProduct key={index} product={product}/>
      })
     }</div>
         
      </div>
    </div>
    
  </div>
  )
}

export default SearchResult
