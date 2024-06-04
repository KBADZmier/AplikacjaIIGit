// src/components/Navbar/Navbar.jsx
import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ token, username, handleLogout }) => {
  return (
    <div className="navbaro">
      <h1 className="firma">Nazwa</h1>
      <ul className="lista">
        <li className="lis">
          <Link to="/home">Home</Link>
        </li>
        <li className="lis">
          <Link to="/about">O nas</Link>
        </li>
        <li className="lis">
          <Link to="/pricing">Cennik</Link>
        </li>
        <li className="lis">
          <Link to="/blog">Blog</Link>
        </li>
        <li>
          {" "}
          <div className="auth-section">
            {token ? (
              <div>
                <span className="username"> {username}!</span>
                <button onClick={handleLogout} className="logout-button">
                  Logout
                </button>
              </div>
            ) : (
              <NavLink to="/login">Login</NavLink>
            )}
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
