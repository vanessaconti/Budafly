import "./App.css";
import { useState, useEffect } from "react";
import { Routes, Route, createPath } from "react-router-dom";
import About from "./Components/About";
import Home from "./Components/Home";
import NavBar from "./Components/NavBar";
import Product from "./Components/singleProduct";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import ForgotPassword from "./Components/ForgotPassword";
import SearchBar from "./Components/searchBar";
import Cart from "./Components/Cart";

const App = () => {
  const [cart, setCart] = useState([]);

  const addItem = (item) => {
    setCart([...cart, item]);
    let tempArr = [...cart];
    if (!cart.length) {
      localStorage.setItem(
        "cart",
        JSON.stringify(tempArr.length === 0 ? [item] : tempArr)
      );
    } else {
      tempArr.push(item);
      localStorage.setItem("cart", JSON.stringify(tempArr));
    }
  };

  useEffect(() => {
    if (localStorage.getItem("cart")) {
      setCart(JSON.parse(localStorage.getItem("cart")));
    }
  }, []);

  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route exact path="/" element={<Home addItem={addItem} />} />
        <Route path="/About" element={<About />} />
        <Route path="/products/:id" element={<Product />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/ForgotPassword" element={<ForgotPassword />} />
        <Route path="/Cart" element={<Cart cart={cart} />} />
      </Routes>
    </div>
  );
};

export default App;
