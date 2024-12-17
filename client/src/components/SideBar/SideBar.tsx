// import "../Dashboard/Dashboard.css";
import { AiFillProduct } from "react-icons/ai";
import { TbDeviceAnalytics } from "react-icons/tb";
import { FaUsers } from "react-icons/fa";
import { GrTransaction } from "react-icons/gr";
import { Link, useLocation } from "react-router-dom";

const SideBar = () => {

  const location = useLocation()

  return (
      <ul>
        <span className="dashboard-title">Dashboard</span>
        <li>
          <Link className={location.pathname==="/dashboard/products" ? "sidebar-link-active" : "sidebar-link"} to={'/dashboard/products'}>
            <AiFillProduct className="icon" />
            Products
          </Link>
        </li>
        <li>
          <Link className={location.pathname==="/dashboard/analytics" ? "sidebar-link-active" : "sidebar-link"} to={'/dashboard/analytics'}>
            <TbDeviceAnalytics className="icon" />
            Analytics
          </Link>
        </li>
        <li>
          <Link className={location.pathname==="/dashboard/customers" ? "sidebar-link-active" : "sidebar-link"} to={'/dashboard/customers'}>
            <FaUsers className="icon" />
            Customers
          </Link>
        </li>
        <li>
          <Link className={location.pathname==="/dashboard/my-orders" ? "sidebar-link-active" : "sidebar-link"} to={'/dashboard/my-orders'}>
            <GrTransaction className="icon" />
            Transaction
          </Link>
        </li>
      </ul>
  );
}

export default SideBar;
