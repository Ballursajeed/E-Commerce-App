import Register from "./components/Register/Register";

import { Route,  Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import Login from "./components/login/Login";
import Cart from "./components/Cart/Cart";
import ListProducts from "./components/ListProducts/ListProducts";
import GetSingleProduct from "./components/GetSingleProduct/GetSingleProduct";
import CheckOut from "./components/CheckOut/CheckOut";
import SearchResult from "./components/SeachResult/SearchResult";
import NewAdmin from "./components/NewAdmin/NewAdmin";
import PolicyAgree from "./components/PolicyAgree/PolicyAgree";
import Dashboard from "./components/Dashboard/Dashboard";
import Profile from "./components/Profile/Profile";
import AdminProducts from "./components/AdminProducts/AdminProducts";
import Analytics from "./components/Analytics/Analytics";
import Customer from "./components/Customer/Customer";
import GetOrders from "./components/GetOrder/GetOrders";
import EditProduct from "./components/EditProduct/EditProduct";
import Navbar from "./components/Navbar/Navbar";
import NewProduct from "./components/NewProduct/NewProduct";
import EditUser from "./components/EditUser/EditUser";
import GetSingleOrder from "./components/GetSingleOrder/GetSingleOrder";
import GetSingleCutomer from "./components/GetSingleCustomer/GetSingleCutomer";


function App() {

  

  return (
    <>
    <Navbar />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/register" element={<Register/>} />  
        <Route path="/login" element={<Login/>} />  
        <Route path="/cart" element={<Cart/>} />  
        <Route path="/order/:id/:stocks" element={<CheckOut/>} />  
        <Route path="/view" element={<ListProducts/>} />  
        <Route path="/single/:id" element={<GetSingleProduct/>} />  
        <Route path="/search" element={<SearchResult />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/edit-profile/:id" element={<EditUser />} />
        <Route path="/become-admin" element={<NewAdmin />}>
          <Route path="agree" element={<PolicyAgree />} />
        </Route> 
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="products" element={<AdminProducts />} />
          <Route path="new" element={<NewProduct />} />
          <Route path="manage-product/:id" element={<GetSingleProduct isSeller={true}/>} />
          <Route path="update-product/:id" element={<EditProduct />} />
          <Route path="manage-order/:id" element={<GetSingleOrder />} />
          <Route path="manage-customer/:id" element={<GetSingleCutomer />} />
          <Route path="analytics" element={<Analytics />} /> 
          <Route path="customers" element={<Customer />} />
          <Route path="my-orders" element={<GetOrders />} /> 
        </Route>
      </Routes>
    </>
  )
}

export default App
