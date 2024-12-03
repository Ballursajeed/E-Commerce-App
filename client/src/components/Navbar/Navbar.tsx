import { useState } from "react";
import { useSelector } from "react-redux";
import "./Navbar.css";
import { Link } from "react-router-dom";

interface stateType {
  auth: {
    user: string;
  };
}

const Navbar = () => {
  const user = useSelector((state: stateType) => state.auth.user);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-logo">
          <h1>E-Shop</h1>
          <button className="hamburger" onClick={toggleMenu}>
          &#9776;
         </button>
        </div>
        
        <div className={`navbar-menu ${isMenuOpen ? "open" : ""}`}>
          <div className="navbar-search">
            <input type="text" placeholder="Search for products..." />
            <button className="search-button">Search</button>
          </div>
          <div className="navbar-buttons">
            <button className="nav-btn">
              <Link to={"/"}>Home</Link>
            </button>
            <button className="nav-btn">
              {user ? (
                <Link to={"/profile"}>Account</Link>
              ) : (
                <Link to={"/login"}>Login</Link>
              )}
            </button>
            <button className="nav-btn">
               <Link to={'/admin'}>become a seller</Link>
            </button>
            <button className="nav-btn">
              <Link to={"/myOrder"}>Orders</Link>
            </button>
            <button className="nav-btn">
              <Link to={"/cart"}>Cart</Link>
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
