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
import Progress_bar from "./Progress";
import { useSelector } from "react-redux";
import { stateType } from "../Navbar/Navbar";
import { useNavigate } from "react-router-dom";

Chart.register(CategoryScale);

interface revenueType {
      month: String,
      revenue: Number
}

interface transactionType {
  _id:String,
  items: String[],
  discount: Number,
  totalAmount: Number,
  status: String,
}



const Analytics = () => {

  const user = useSelector((state: stateType) => state.auth.user);
  const navigate = useNavigate();

  const [searchvalue,setSearchValue] = useState('');
  const [revenue,setRevenue] = useState('');
  const [transacions,setTransacions] = useState('');
  const [topTransactions,setTopTransacions] = useState([]);
  const [products,setProducts] = useState('');
  const [users,setUsers] = useState('');
  const [data,setData] = useState([]);
  const [categories,setCategory] = useState<{ [key: string]: number }>({});

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
      if (resonse.data.success) {
         setProducts(resonse.data.products)
         setProductsGrowth(resonse.data.productGrowthRate)
      }
    }
    const users = async() => {
      const resonse = await axios.get(`${SERVER}/user/admin/thisMonthUsers`,{
        withCredentials:true
      });
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
    const fetchCategory = async() => {
          const response = await axios.get(`${SERVER}/product/admin/inventory`,{
            withCredentials:true,
          });
          
          if (response.data.success) {
              setCategory(response.data.inventory)
          }
    }    
    const topTransacions = async() => {
      const response = await axios.get(`${SERVER}/order/admin/topTransactions`,{
        withCredentials:true,
      });
      
      if (response.data.success) {
          console.log(response.data);
          setTopTransacions(response.data.Transactions)
      }
    }

    revenueAndTransactions();
    products();
    users();
    getAllMonthRevenue();
    fetchCategory();
    topTransacions();

  },[]);

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
     
      <div className="admin-avatar" onClick={() => navigate('/dashboard/admin-profile')}>
         <img src={user.avatar} alt="" />
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
          <h1>Inventory</h1>
                  {
                    Object.keys(categories).map((key) => {
                    return (
                      <div className="keys"> 
                        <div>{key}</div>
                          <Progress_bar progress={`${categories[key]}%`} />                          
                        <div>{`${categories[key]}%`}</div>
                      </div>
                   
                    )
                    }
                  )
                  }
        </div>
       </div>
       <div className="transactions">
         <h1>Top Transactions</h1>
           <table>
                 <thead>
                   <tr>
                     <th>Id</th>
                     <th>Quantity</th>
                     <th>Discount</th>
                     <th>Amount</th>
                     <th>Status</th>
                   </tr>
                 </thead>
                 <tbody>
                   {topTransactions.map((transaction: transactionType) => (
                     <tr key={Number(transaction._id)}>
                       <td>
                          {transaction._id}
                       </td>
                       <td>{`${transaction.items.length}`}</td>
                       <td>{`${transaction.discount || 0}`}</td>
                       <td>{`₹ ${transaction.totalAmount}`}</td>
                       <td>
                       {`${transaction.status}`}
                       </td>
                     </tr>
                   ))}
                 </tbody>
               </table>
       </div>
     </div>
    </div>
  )
}

export default Analytics
