// App.jsx
import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import "./App.css";
import Navitems from "./component/Navitems";
import Footer from "./home/Footer";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const isAboutPage = location.pathname === '/about';
  const page = location.pathname === '/' || location.pathname === '/blog' || location.pathname === '/shop' || location.pathname === '/cart-page' || location.pathname.startsWith('/shop/')||location.pathname === "/liked-products"||location.pathname.startsWith('/blog/');

  if (isAboutPage || !page) {
    return (
      <Outlet />
    );
    
  }

  return (
    <>
      <Navitems />
      <div className="min-vh-100">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default App;
