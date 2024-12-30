import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";

import { useEffect, useState } from "react"
import "./Analytics.css";
import { FcSearch } from "react-icons/fc";
import { MdNotificationsNone } from "react-icons/md";
import KipCard from "./KipCard";
import axios from "axios";
import { SERVER } from "../../constant";
import { BarChart } from "./BarChart";

Chart.register(CategoryScale);

interface revenueType {
      month: String,
      revenue: Number
}

const Analytics = () => {

  const [searchvalue,setSearchValue] = useState('');
  const [revenue,setRevenue] = useState('');
  const [transacions,setTransacions] = useState('');
  const [products,setProducts] = useState('');
  const [users,setUsers] = useState('');
  const [data,setData] = useState([]);

  const [revenueGrowth,setRevenueGrowth] = useState(0);
  const [transacionsGrowth,setTransacionsGrowth] = useState(0);
  const [productsGrowth,setProductsGrowth] = useState(0);
  const [usersGrowth,setUsersGrowth] = useState(0);

  const [chartData, setChartData] = useState({
    labels: data.map((data:revenueType) => data.month), 
    datasets: [
      {
        label: "Users Gained ",
        data: data.map((data:revenueType) => data.revenue),
        width:1,
        backgroundColor:[
          "rgba(75,192,192,1)",
        ],
        borderColor: "black",
        borderWidth: 1
      }
    ]
  });


  const handleSearch = () => {
  console.log("searched:",searchvalue);
  }

  useEffect(() => {
    const revenueAndTransactions = async() => {
      const resonse = await axios.get(`${SERVER}/order/admin/thisMonthRevenueAndTransacions`,{
        withCredentials:true
      });
      if (resonse.data.success) {
         setRevenue(resonse.data.revenue)
         setRevenueGrowth(resonse.data.revenueGrowRate)

         setTransacions(resonse.data.transactions)
         setTransacionsGrowth(resonse.data.transactionGrowRate)
      }
    }

    const products = async() => {
      const resonse = await axios.get(`${SERVER}/product/admin/thisMonthProducts`,{
        withCredentials:true
      });
      console.log(resonse.data);
      if (resonse.data.success) {
         setProducts(resonse.data.products)
         setProductsGrowth(resonse.data.productGrowthRate)
      }
    }
    const users = async() => {
      const resonse = await axios.get(`${SERVER}/user/admin/thisMonthUsers`,{
        withCredentials:true
      });
      console.log(resonse.data);
      if (resonse.data.success) {
         setUsers(resonse.data.users)
         setUsersGrowth(resonse.data.usersGrowthRate)
      }
    }
    const getAllMonthRevenue = async() => {
      const resonse = await axios.get(`${SERVER}/order/admin/allMonthRevenue`,{
        withCredentials:true
      });
       if (resonse.data.success) {
        console.log("response:",resonse.data);
        
        setData(resonse.data.allMonthRevenue);
        setChartData({
          labels: resonse.data.allMonthRevenue.map((data:revenueType) => data.month), 
          datasets: [
            {
              label: "Revenue",
              data: resonse.data.allMonthRevenue.map((data:revenueType) => data.revenue),
              width:1,
              backgroundColor:[
                "rgb(57, 81, 219)",
              ],
              borderColor: "black",
              borderWidth: 1
            }
          ]
        })
       }
    }

    revenueAndTransactions();
    products();
    users();
    getAllMonthRevenue()
  },[]);

console.log('data:', chartData);

  return (
    <div className="analytics">
     <div className="analytics-nav">
      <div className="search-analytics">
        <input type="text" onChange={(e) => setSearchValue(e.target.value)} placeholder="Search for data,user or docs..." />
        <button className="search-an"><FcSearch  onClick={handleSearch} /></button>
      </div>
      <div className="analytics-right">
      <div className="notification">
       <MdNotificationsNone />
      </div> 
     
      <div className="admin-avatar">
         <img src="/images.png" alt="" />
      </div>
      </div>
     </div>
     <div className="main-analytics">
       <div className="kpi">
        <KipCard heading={'Revenue'} value={String('$'+revenue)} rate={revenueGrowth} color="blue"/>
        <KipCard heading={'Users'} value={users} rate={usersGrowth} color="rgb(44, 145, 184)"/>
        <KipCard heading={'Transactions'} value={transacions} rate={transacionsGrowth} color="yellow"/>
        <KipCard heading={'Products'} value={products} rate={productsGrowth} color="darkblue"/>
       </div>
       <div className="chart-inventory">
        <div className="chart">
         <BarChart chartData={chartData} />
        </div>
        <div className="inventory">
          boc
        </div>
       </div>
     </div>
    </div>
  )
}

export default Analytics
