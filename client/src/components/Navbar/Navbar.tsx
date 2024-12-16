import { useState } from "react";
import { useSelector } from "react-redux";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";

interface stateType {
  auth: {
    user: {
      _id: string;
      fullName: string;
      email: string;
      username: string;
      password: string;
      avatar?: string;
      role:string;
      isAdmin: Boolean;
      accessToken: string;
      products:Document[];
    };
  };
}

const Navbar = () => {
  
  const user = useSelector((state: stateType) => state.auth.user);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleSearch = async () => {
    if (!searchValue.trim()) {
      alert("Please enter a search term.");
      return;
    }

    try {
      navigate(`/search?query=${searchValue}`);
    } catch (error) {
      console.error("Error during search:", error);
    }
  };
  
  console.log("User role:",user);
  

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
            <input type="text" onChange={(e) => setSearchValue(e.target.value)} placeholder="Search for products..." />
            <button onClick={handleSearch} className="search-button">Search</button>
          </div>
          <div className="navbar-buttons">
            <button className="nav-btn">
              <Link to={"/"}>Home</Link>
            </button>
            <button className="nav-btn">
              {user._id ? (
                <Link to={"/profile"}>Account</Link>
              ) : (
                <Link to={"/login"}>Login</Link>
              )}
            </button>
            <button className="nav-btn">
               {
                user.role === 'seller' ? (
                 <Link to={'/dashboard'}>Dashboard</Link>
                )
                 : 
                (
                  <Link to={'/become-admin'}>become a seller</Link>
                )
               }
            </button>
            <button className="nav-btn">
              <Link to={"/myOrder"}>Orders</Link>
            </button>
            <button className="nav-btn">.
              <Link to={"/cart"}>Cart</Link>
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
