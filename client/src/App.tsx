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

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/register" element={<Register/>} />  
        <Route path="/login" element={<Login/>} />  
        <Route path="/cart" element={<Cart/>} />  
        <Route path="/order/:id/:stocks" element={<CheckOut/>} />  
        <Route path="/view" element={<ListProducts/>} />  
        <Route path="/single/:id" element={<GetSingleProduct/>} />  
        <Route path="/search" element={<SearchResult />} />
        <Route path="/become-admin" element={<NewAdmin />}>
          <Route path="agree" element={<PolicyAgree />} />
        </Route> 
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  )
}

export default App
