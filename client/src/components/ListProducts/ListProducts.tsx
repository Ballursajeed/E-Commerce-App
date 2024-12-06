import { useState } from 'react';
import GetProducts from '../GetProducts/GetProducts'
import Navbar from '../Navbar/Navbar'
import "./ListProducts.css"

const ListProducts = () => {

    // const [sort, setSort] = useState("");
    const [maxPrice, setMaxPrice] = useState(100); // Set a default max price
  // const [currentPrice, setCurrentPrice] = useState(50); // Example current price

  // const progressPercentage = (currentPrice / maxPrice) * 100;

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
          <GetProducts />
        </div>
      </div>
      
    </div>
  )
}

export default ListProducts
