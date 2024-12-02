import { Slider } from "6pp";
import Navbar from "../Navbar/Navbar"
import "./Home.css"
import GetProducts from "../GetProducts/GetProducts";
import { Link } from "react-router-dom";

const banners = [
  "https://res.cloudinary.com/dj5q966nb/image/upload/v1719253445/rmbjpuzctjdbtt8hewaz.png",
  "https://res.cloudinary.com/dj5q966nb/image/upload/v1719253433/ticeufjqvf6napjhdiee.png",
];

const Home = () => {

  return (
    <>
    <Navbar />
    <div className="container">
      <div className="left">
      <button>
          become a seller
        </button>
        <aside>
        <div className="categories">
          <h1>Categories</h1>
          <ul>
            <li>
            <a href="/search?category=electronics">Electronics</a></li>
            <li>
              <a href="/search?category=mobiles">Mobiles</a>
            </li>
            <li>
              <a href="/search?category=laptops">Laptops</a>
            </li>
            <li>
              <a href="/search?category=books">Books</a>
            </li>
            <li>
              <a href="/search?category=fashion">Fashion</a>
            </li>
            <li>
              <a href="/search?category=appliances">Appliances</a>
            </li>
            <li>
              <a href="/search?category=furniture">Furniture</a>
            </li>
            <li>
              <a href="/search?category=home decor">Home Decor</a>
            </li>
            <li>
              <a href="/search?category=grocery">Grocery</a>
            </li>
            <li>
              <a href="/search?category=beauty">Beauty</a>
            </li>
            <li>
              <a href="/search?category=toys">Toys</a>
            </li>
            <li>
              <a href="/search?category=fitness">Fitness</a>
            </li>
          </ul>
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
            <Link to={"/products"} id="more">MORE</Link>
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
