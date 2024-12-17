// import "../Dashboard/Dashboard.css";
import { AiFillProduct } from "react-icons/ai";
import { TbDeviceAnalytics } from "react-icons/tb";
import { FaUsers } from "react-icons/fa";
import { GrTransaction } from "react-icons/gr";
import { Link } from "react-router-dom";

const SideBar = () => {
  return (
      <ul>
        <span className="dashboard-title">Dashboard</span>
        <li>
          <Link className="sidebar-link" to={'/dashboard/products'}>
            <AiFillProduct className="icon" />
            Products
          </Link>
        </li>
        <li>
          <Link className="sidebar-link" to={'/analytics'}>
            <TbDeviceAnalytics className="icon" />
            Analytics
          </Link>
        </li>
        <li>
          <Link className="sidebar-link" to={'/customers'}>
            <FaUsers className="icon" />
            Customers
          </Link>
        </li>
        <li>
          <Link className="sidebar-link" to={'/my-orders'}>
            <GrTransaction className="icon" />
            Transaction
          </Link>
        </li>
      </ul>
  );
}

export default SideBar;
