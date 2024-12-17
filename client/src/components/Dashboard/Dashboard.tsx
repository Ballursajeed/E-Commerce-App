import "./Dashboard.css";
import SideBar from "../SideBar/SideBar";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
   <>
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
