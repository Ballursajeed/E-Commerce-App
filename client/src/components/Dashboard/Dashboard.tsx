import Navbar from "../Navbar/Navbar";
import "./Dashboard.css";
import SideBar from "../SideBar/SideBar";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
   <>
    <Navbar />
    <div className="dashboard">
      <div className="sidebar">
       <SideBar />
      </div>
     <div className="main-dashboard">
       <Outlet/>
     </div>
    </div>
   </>
  )
}

export default Dashboard
