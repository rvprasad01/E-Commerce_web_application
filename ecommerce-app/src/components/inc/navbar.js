import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = ({ authenticated, handleLogout }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showLogoutAlert, setShowLogoutAlert] = useState(false);
  

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  const handleLogoutClick = () => {
    setShowLogoutAlert(true);
  };

  const confirmLogout = () => {
    handleLogout();
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          AK Shopping
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className={`nav-item ${isActive('/')}`}>
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            <li className={`nav-item ${isActive('/products')}`}>
              <Link to="/products" className="nav-link">
                Products
              </Link>
            </li>
            <li className={`nav-item ${isActive('/order')}`}>
              <Link to="/order" className="nav-link">
                Order
              </Link>
            </li>
            <li className={`nav-item ${isActive('/cart')}`}>
              <Link to="/cart" className="nav-link">
                Cart
              </Link>
            </li>

           
          </ul>

          <form className="d-flex align-items-center">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-info me-2" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
      {authenticated && (
        <>
          <button
            className="btn btn-outline-danger "
            onClick={handleLogoutClick}
          >
            Logout
          </button>
          {/* Logout Confirmation Alert */}
          {showLogoutAlert && (
            <div className="alert alert-primary  " role="alert">
              Are you sure you want to logout?{' '}
            <button
              type="button"
              className="alert-link"
              onClick={() => {
                confirmLogout();
                setShowLogoutAlert(false);
              }}
            >
              Yes, Logout
            </button>

              {' | '}
              <button
                type="button"
                className="btn-close"
                onClick={() => setShowLogoutAlert(false)}
              ></button>
            </div>
          )}
        </>
      )}
    </nav>
  );
};

export default Navbar;
