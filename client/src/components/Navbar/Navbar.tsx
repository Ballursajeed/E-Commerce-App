import { useState } from "react";
import { useSelector } from "react-redux";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";

export interface stateType {
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
    setIsMenuOpen(false);
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

  return (
    <>
      <nav className="navbar">
        <div className="navbar-logo">
          <h1>E-Shop</h1>
        </div>
        <button className="hamburger" onClick={toggleMenu}>
          &#9776;
         </button>
        <div className={`navbar-menu ${isMenuOpen ? "open" : ""}`}>
       
          <div className="navbar-search">
            <input type="text" onChange={(e) => setSearchValue(e.target.value)} placeholder="Search for products..." />
            <button onClick={handleSearch} className="search-button">Search</button>
          </div>
          <div className="navbar-buttons">
            <button className="nav-btn">
              <Link to={"/"} onClick={() => setIsMenuOpen(false)}>Home</Link>
            </button>
            <button className="nav-btn">
              {user._id ? (
                <Link to={"/profile"} onClick={() => setIsMenuOpen(false)}>Account</Link>
              ) : (
                <Link to={"/login"} onClick={() => setIsMenuOpen(false)}>Login</Link>
              )}
            </button>
                 {user._id &&   <button className="nav-btn">
               {
                user.role === 'seller' || user.role === 'admin' ? (
                 <Link to={'/dashboard/analytics'} onClick={() => setIsMenuOpen(false)}>Dashboard</Link>
                )
                 : 
                (
                  <Link to={'/become-admin'} onClick={() => setIsMenuOpen(false)}>become a seller</Link>
                )
               }
            </button> }
          
          {/* { user._id &&  <button className="nav-btn">
              <Link to={"/myOrder"} onClick={() => setIsMenuOpen(false)}>Orders</Link>
            </button>} */}
            <button className="nav-btn">
              <Link to={"/cart"} onClick={() => setIsMenuOpen(false)}>Cart</Link>
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
