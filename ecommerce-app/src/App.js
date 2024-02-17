import React, { useState } from "react";
import {  BrowserRouter as Router, Route, Routes } from "react-router-dom";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.js';

import Navbar from "./components/inc/navbar.js";
import Home from "./components/pages/Home.js";
import Footer from "./components/inc/footer.js";
import Login from "./components/pages/login.js";
import Signup from "./components/pages/signup.js";
import Cart from "./components/pages/cart.js"
import Order from "./components/pages/order.js"
import Add from "./components/admin pages/add.js"
import Products from "./components/pages/Products.js";
import Adminlogin from "./components/admin pages/adminlogin.js";
import Orderconfirm from "./components/pages/order confirm.js";

function App() {
    const [authenticated, setAuthenticated] = useState(false);

    const handleLogout = () => {
        setAuthenticated(false);
        // Remove login flag from localStorage
        localStorage.removeItem('isLoggedIn');
    };

    return (
        <Router>
            <div>
                {authenticated ? (
                    <>
                        <Navbar authenticated={authenticated} handleLogout={handleLogout} />
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/products" element={<Products />} />
                            <Route path="/cart" element={<Cart />} />
                            <Route path="/order" element={<Order />} />
                            <Route path="/Add" element={<Add />} />
                            <Route path="/Orderconfirm" element={<Orderconfirm/>} />
                        </Routes>
                        <Footer />
                    </>
                ) : (
                    <Routes>
                        <Route path="/Add" element={<Add />} />
                        <Route path="/Home" element={<Home/>} />
                        <Route path="/" element={<Login setauth={setAuthenticated} />} />
                        <Route path="/login" element={<Login setauth={setAuthenticated} />} />
                        <Route path="/adminlogin" element={<Adminlogin />} />
                        <Route path="/signup" element={<Signup />} />
                    </Routes>
                )}
            </div>
        </Router>
    );
}

export default App;
