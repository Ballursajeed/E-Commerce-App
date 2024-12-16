import Navbar from "../Navbar/Navbar";
import "./Dashboard.css";
import SideBar from "../SideBar/SideBar";

const Dashboard = () => {
  return (
   <>
    <Navbar />
    <div className="dashboard">
     <div className="sidebar">
        <SideBar />
     </div>
     <div className="main-dashboard">
          
     </div>
    </div>
   </>
  )
}

export default Dashboard
