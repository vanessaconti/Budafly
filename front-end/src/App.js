//import "./App.css";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import About from "./Components/About";
import Home from "./Components/Home";
import NavBar from "./Components/NavBar";
import Product from "./Components/singleProduct";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import ForgotPassword from "./Components/ForgotPassword";
// import Modal from "./Components/Modal";
import SearchBar from "./Components/Search";
import Faqs from "./Components/FAQs";
import Laws from "./Components/Laws";
import Demo from "./Components/seller/demoProfile";

//import Search from "./Components/Search";

import Cart from "./Components/Cart";
import LandingPage from "./Components/seller/landingPage";
import SingleView from "./Components/seller/singleView";
import EditProductForm from "./Components/seller/editProduct";
import AddProductForm from "./Components/seller/addProductForm";
import FourOFour from "./Components/FourOFour";

const App = () => {
  // const [modalOpen, setModalOpen] = useState(false);

  const [cart, setCart] = useState([]);
  const [login, setLogin] = useState(false);

  const addItem = (item) => {
    item.quantity = 1;

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

  const deleteItem = (i) => {
    let tempArr = [...cart];
    tempArr.splice(i, 1);
    setCart(tempArr);
    localStorage.setItem("cart", JSON.stringify(tempArr));
  };

  useEffect(() => {
    if (localStorage.getItem("cart")) {
      setCart(JSON.parse(localStorage.getItem("cart")));
    }
  }, []);

  return (
    <div className="App">
      <NavBar login={login} />
      {/* <button
        className="openModalBtn"
        onClick={() => {
          setModalOpen(true);
        }}
      >
        Shop Now
      </button>

      {modalOpen && <Modal setOpenModal={setModalOpen} />} */}
      <Routes>
        <Route exact path="/" element={<Home addItem={addItem} />} />
        <Route path="/About" element={<About />} />
        <Route path="/products/:id" element={<Product addItem={addItem} />} />
        <Route
          path="/seller/:id/products"
          element={<LandingPage login={login} />}
        />
        <Route path="/seller/:id/products/new" element={<AddProductForm />} />
        <Route
          path="/seller/:id/products/:pid"
          element={<SingleView login={login} />}
        />
        <Route
          path="/seller/:id/products/:pid/edit"
          element={<EditProductForm />}
        />
        <Route
          path="/Login"
          element={<Login setLogin={setLogin} login={login} />}
        />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/ForgotPassword" element={<ForgotPassword />} />
        <Route
          path="/Cart"
          element={
            <Cart cart={cart} deleteItem={deleteItem} setCart={setCart} />
          }
        />{" "}
        <Route path="/Search" element={<SearchBar />} />
        <Route path="/FAQs" element={<Faqs />} />
        <Route path="/Laws" element={<Laws />} />
        <Route path="/userProfile" element={<Demo />} />
        <Route path="*" element={<FourOFour />} />
      </Routes>
    </div>
  );
};

export default App;
