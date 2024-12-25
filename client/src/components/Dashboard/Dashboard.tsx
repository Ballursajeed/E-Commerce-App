import "./Dashboard.css";
import SideBar from "../SideBar/SideBar";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useCheckAuth } from "../../hooks/useAuthCheck";

const Dashboard = () => {

  const checkAuth = useCheckAuth()

  useEffect(() => {
       checkAuth('/login')
  },[])

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
