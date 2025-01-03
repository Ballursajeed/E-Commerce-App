import { useEffect, useState } from 'react';
import GetProducts from '../GetProducts/GetProducts'
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

     const [currentPage, setCurrentPage] = useState(1);
     const productsPerPage = 8; // 2 rows x 4 products per row

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

  const handlePriceSortChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sort = e.target.value;
    if (sort === "") {
      setIsAll(true);
    } else {
      setIsAll(false);
      try {
        const res = await axios.get(`${SERVER}/product/price/${sort}`);
        if (res.data.success) {
          setProducts(res.data.products);
          setCurrentPage(1); // Reset pagination
        }
      } catch (error) {
        console.error("Error fetching price-sorted products:", error);
      }
    }
  };

  const handleCategoryChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const category = e.target.value;
    if (category === "All") {
      setIsAll(true);
    } else {
      setIsAll(false);
      try {
        const res = await axios.get(`${SERVER}/product/getProductByCategory/${category}`);
        if (res.data.success) {
          setProducts(res.data.products);
          setCurrentPage(1); // Reset pagination
        }
      } catch (error) {
        console.error("Error fetching category-sorted products:", error);
      }
    }
  };

  const maxPriceSorting  = async(price:Number) => {

    setIsAll(false)

    const res = await axios.get(`${SERVER}/product/price/${price}`);
    if (res.data.success) {
      setProducts(res.data.products)
      setCurrentPage(1); // Reset pagination
    } 

  }

   // Pagination logic
   const indexOfLastProduct = currentPage * productsPerPage;
   const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
   const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

   const paginate = (pageNumber:number) => setCurrentPage(pageNumber);

  return (
    <div>
      <div className="listContainer">
      <button id='ham' className="listhHamburger" onClick={toggleMenu}>
      <span className="icon">🔍</span> Filters
      </button>
      <div className = {`listLeft ${isMenuOpen ? "open" : ""}`}>
      <h1>FILTER</h1>
      <span>Sort</span>
      <div className="priceLong">
        <select onChange={handlePriceSortChange}>
          <option value="" onClick={() => setIsAll(true)}>None</option>
          <option value="asc" >Price (Low to High)</option>
          <option value="dsc" >Price (High to Low)</option>
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
        <select onChange={handleCategoryChange}>
          <option onClick={() => setIsAll(true)}>All</option>
          {
            categories.map(
              (category) => 
              <option>
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
                currentProducts.map((product,index) => {
                  
                  return <SingleProduct key={index} product={product}/>
                })
                }
             </div> 
            }
          {/* Pagination Controls */}
        { !isAll && <div className="list-pagination">
                        {Array.from({ length: Math.ceil(products.length / productsPerPage) }).map((_, i) => (
                            <button
                                key={i}
                                className={currentPage === i + 1 ? 'active' : ''}
                                onClick={() => paginate(i + 1)}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>}
        </div>
      </div>
      
    </div>
  )
}

export default ListProducts
