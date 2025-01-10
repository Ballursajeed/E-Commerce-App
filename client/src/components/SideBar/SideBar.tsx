// import "../Dashboard/Dashboard.css";
import { AiFillProduct } from "react-icons/ai";
import { TbDeviceAnalytics } from "react-icons/tb";
import { FaUsers } from "react-icons/fa";
import { GrTransaction } from "react-icons/gr";
import { Link, useLocation } from "react-router-dom";
import { stateType } from "../Navbar/Navbar";
import { useSelector } from "react-redux";

const SideBar = ({toggleMenu}:{toggleMenu:() => void}) => {

  const location = useLocation();
  const user = useSelector((state: stateType) => state.auth.user);

  return (
      <ul>
        <span className="dashboard-title">Dashboard</span>
        <li>
          <Link 
          className={location.pathname==="/dashboard/products" ? "sidebar-link-active" : "sidebar-link"} 
          to={'/dashboard/products'}
          onClick={toggleMenu}>
            <AiFillProduct className="icon" />
            Products
          </Link>
        </li>
        <li>
          {
             user.role === 'admin' && <Link 
             className={location.pathname==="/dashboard/analytics" ? "sidebar-link-active" : "sidebar-link"} 
             to={'/dashboard/analytics'}
             onClick={toggleMenu}>
             <TbDeviceAnalytics className="icon" />
             Analytics
           </Link>
          }
          
        </li>
        <li>
          <Link 
          className={location.pathname==="/dashboard/customers" ? "sidebar-link-active" : "sidebar-link"} 
          to={'/dashboard/customers'}
          onClick={toggleMenu}>
            <FaUsers className="icon" />
            Customers
          </Link>
        </li>
        <li>
          <Link 
          className={location.pathname==="/dashboard/my-orders" ? "sidebar-link-active" : "sidebar-link"} 
          to={'/dashboard/my-orders'}
          onClick={toggleMenu}>
            <GrTransaction className="icon" />
            Transaction
          </Link>
        </li>
      </ul>
  );
}

export default SideBar;
