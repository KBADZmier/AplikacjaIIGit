import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ token, username, handleLogout }) => {
  return (
    <div className="navbaro">
      <nav className="navbar">
        <div className="navdiv">
          <div className="logo">
            <NavLink to="/home">Home</NavLink>
          </div>
          <div className="nav-items">
            <ul>
              <li>
                <NavLink to="/home">Home</NavLink>
              </li>
              <li>
                <NavLink to="/about">About</NavLink>
              </li>
              <li>
                <NavLink to="/contact">Contact</NavLink>
              </li>
            </ul>
            {token ? (
              <div className="auth-section">
                <span className="username">{username}!</span>
                <button onClick={handleLogout} className="logout-button">
                  Logout
                </button>
              </div>
            ) : (
              <NavLink to="/login" className="login-button">
                Zaloguj
              </NavLink>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
