/** @format */

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import "../styles/components/NavbarAdmin.css";

const NavbarAdmin = () => {
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const navigate = useNavigate();

  const confirmLogout = () => {
    localStorage.removeItem("loggedInUserEmail");
    setShowLogoutConfirm(false);
    navigate("/");
  };

  const cancelLogout = () => {
    setShowLogoutConfirm(false);
  };

  return (
    <nav className="admin-header">
      <div className="navbar-admin">
        <div className="navbar-brand">
          <Link to="/" className="brand-link">
            QuizMaster
          </Link>
        </div>
        <div className="navbar-buttons">
          <button>
            <FaUserCircle style={{ marginRight: "6px" }} />
            Profile
          </button>
          <button onClick={() => setShowLogoutConfirm(true)}>
            <FaSignOutAlt style={{ marginRight: "6px" }} />
            Logout
          </button>
        </div>
      </div>

      {showLogoutConfirm && (
        <div className="logout-confirmation">
          <div>
            <p>Are you sure you want to logout?</p>
            <button onClick={confirmLogout}>Yes</button>
            <button onClick={cancelLogout}>No</button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavbarAdmin;
