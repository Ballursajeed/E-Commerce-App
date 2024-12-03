import Register from "./components/Register/Register";

import { Route,  Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import Login from "./components/login/Login";
import Cart from "./components/Cart/Cart";
import ListProducts from "./components/ListProducts/ListProducts";
import GetSingleProduct from "./components/GetSingleProduct/GetSingleProduct";
import Order from "./components/Order/Order";

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/register" element={<Register/>} />  
        <Route path="/login" element={<Login/>} />  
        <Route path="/cart" element={<Cart/>} />  
        <Route path="/order/:id/:stocks" element={<Order/>} />  
        <Route path="/view" element={<ListProducts/>} />  
        <Route path="/single/:id" element={<GetSingleProduct/>} />  
      </Routes>
    </>
  )
}

export default App
