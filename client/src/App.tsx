import Register from "./components/Register/Register";

import { Route,  Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import Login from "./components/login/Login";
import Cart from "./components/Cart/Cart";
import ListProducts from "./components/ListProducts/ListProducts";

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/register" element={<Register/>} />  
        <Route path="/login" element={<Login/>} />  
        <Route path="/cart" element={<Cart/>} />  
        <Route path="/view" element={<ListProducts/>} />  
      </Routes>
    </>
  )
}

export default App
