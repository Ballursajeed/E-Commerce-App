import Register from "./components/Register/Register";

import { Route,  Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import Login from "./components/login/Login";
import Cart from "./components/Cart/Cart";

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/register" element={<Register/>} />  
        <Route path="/login" element={<Login/>} />  
        <Route path="/cart" element={<Cart/>} />  
      </Routes>
    </>
  )
}

export default App
