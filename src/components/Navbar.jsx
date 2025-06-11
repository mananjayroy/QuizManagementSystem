/** @format */

import React from "react";
import "../styles/components/navbar.css";
import { Link } from "react-router-dom";
import { FaHome, FaSignInAlt, FaUserPlus } from "react-icons/fa"; // Import icons

const Navbar = () => {
  return (
    <div className="main-navbar">
    <header className="home-header">
      <nav className="navbar">
        <div className="navbar-brand">
          <Link to="/" className="brand-link">
            QuizMaster
          </Link>
        </div>
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              <FaHome style={{ marginRight: "6px" }} />
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/login" className="nav-link">
              <FaSignInAlt style={{ marginRight: "6px" }} />
              Login
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/signup" className="nav-link">
              <FaUserPlus style={{ marginRight: "6px" }} />
              Sign Up
            </Link>
          </li>
        </ul>
      </nav>
    </header>
    </div>
  );
};

export default Navbar;
