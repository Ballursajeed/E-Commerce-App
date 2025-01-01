import { Slider } from "6pp";
import "./Home.css"
import GetProducts from "../GetProducts/GetProducts";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { SERVER } from "../../constant";

const banners = [
  "https://res.cloudinary.com/dj5q966nb/image/upload/v1719253445/rmbjpuzctjdbtt8hewaz.png",
  "https://res.cloudinary.com/dj5q966nb/image/upload/v1719253433/ticeufjqvf6napjhdiee.png",
];

const Home = () => {

  const [isCategoriesOpen, setCategoriesOpen] = useState(false);
  const [categories,setCategory] = useState([]);
  const navigate = useNavigate();

  const toggleCategories = () => {
    setCategoriesOpen(!isCategoriesOpen);
  };

  useEffect(() => {
    const fetchCategory = async() => {
      const response = await axios.get(`${SERVER}/product/getAllCategories`);
      if (response.data.success) {
          setCategory(response.data.categories)
      }
    }    
    fetchCategory()
},[]);

const handleCategoryChange = async (query:string) => {
  
  navigate(`search?query=${query}`)
  
};

  return (
    <>
    <div className="container">
      <div className="left">
        <aside>
            <div className="categories">
              <h1>
                Categories{" "}
                {/* Hamburger icon for mobile */}
                <button className="homeHamburger" onClick={toggleCategories}>
                  {isCategoriesOpen ? "✖" : "☰"}
                </button>
              </h1>
              {/* Conditionally render categories list */}
              {isCategoriesOpen && (
                <ul>
                  {categories.map((category) => <><li onClick={() => handleCategoryChange(category)}>{category}</li></>)}
                </ul>
              )}
            </div>
          </aside>
     
        
      </div>
      <div className="right">
     <div className="banner">
     <Slider
            autoplay
            autoplayDuration={1500}
            showNav={false}
            images={banners}
          />
     </div>
         <div className="latestProducts">
            <h1>Latest Products</h1>
            <Link to={"/view"} id="more">MORE</Link>
            <div className="products">
              <GetProducts limit={4} />
            </div>
         </div>
      </div>
    </div>
    </>
  )
}

export default Home
