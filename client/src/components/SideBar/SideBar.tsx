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
          <Link className="icons" to={'/my-products'}><div ><AiFillProduct /></div>Products</Link>
          <Link className="icons" to={'/analytics'}><div ><TbDeviceAnalytics /></div>Analytics</Link>
          <Link className="icons" to={'/customers'}><div ><FaUsers /></div>Customers</Link>
          <Link className="icons" to={'/my-orders'}><div ><GrTransaction /></div>Transaction</Link>
        </ul>
    </>
     
   
  )
}

export default SideBar
