import "../Dashboard/Dashboard.css"
import { AiFillProduct } from "react-icons/ai";
import { TbDeviceAnalytics } from "react-icons/tb";
import { FaUsers } from "react-icons/fa";
import { GrTransaction } from "react-icons/gr";
import { Link } from "react-router-dom";

const SideBar = () => {
  return (
    <>
     <span>Dashboard</span>
        <ul>
          <Link to={'/my-products'}><div className="icons"><AiFillProduct /></div>Products</Link>
          <Link to={'/analytics'}><div className="icons"><TbDeviceAnalytics /></div>Analytics</Link>
          <Link to={'/customers'}><div className="icons"><FaUsers /></div>Customers</Link>
          <Link to={'/my-orders'}><div className="icons"><GrTransaction /></div>Transaction</Link>
        </ul>
    </>
     
   
  )
}

export default SideBar
