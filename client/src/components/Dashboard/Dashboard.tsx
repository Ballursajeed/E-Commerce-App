import "./Dashboard.css";
import SideBar from "../SideBar/SideBar";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCheckAuth } from "../../hooks/useAuthCheck";

const Dashboard = () => {

  const checkAuth = useCheckAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
       checkAuth('/login')
  },[]);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };



  return (
   <>
    <div className='dashboard'>
   <div className="side-hamber">
   <button className="side-hamburger" onClick={toggleMenu}>
          &#9776;
    </button>
   </div>
      <div className={`sidebar ${isMenuOpen ? "open" : ""}`}>
       <SideBar toggleMenu={toggleMenu} />
      </div>
     <div className="main-dashboard">
       <Outlet/>
     </div>
    </div>
   </>
  )
}

export default Dashboard
