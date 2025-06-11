/** @format */

import React, { useState } from "react";
// import "../styles/pages/login.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const initialState = {
    email: "",
    password: "",
    role: "",
  };

  const [formData, setFormData] = useState(initialState);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   console.log("Login attempt with data:", formData);

  //   const Email = "admin@com";
  //   const Password = "admin";
  //   const Role = "admin";

  //   try {
  //     if (
  //       formData.email === Email &&
  //       formData.password === Password &&
  //       formData.role === Role
  //     ) {
  //       console.log("Login successful with hardcoded credentials");

  //       localStorage.setItem("loggedInUserEmail", formData.email);
  //       alert("Login successful!");

  //       navigate("/admin");
  //     } else {
  //       console.error("Invalid hardcoded credentials");
  //       setError("Invalid login credentials");
  //     }
  //   } catch (err) {
  //     console.error("Unexpected error:", err);
  //     setError("Unexpected error occurred");
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Login attempt with data:", formData);

    try {
      console.log("Sending login request with data:", formData);

      const response = await axios.post(
        "http://localhost:8087/api/users/login",
        {
          email: formData.email,
          role: formData.role,
          password: formData.password,
        }
      );

      console.log("Login successful:", response.data);
      const { email } = response.data;
      localStorage.setItem("loggedInUserEmail", email);

      alert("Login successful!");
      // After successful login response, e.g. in your login component

      if (formData.role === "admin") {
        navigate("/admin");
      } else if (formData.role === "user") {
        navigate("/user");
      }
      // navigate("/admin");
    } catch (err) {
      console.error("Login error:", err);
      setError(err.response?.data?.message || " login credentials");
    }
  };

  const handleReset = () => {
    setFormData(initialState);
    setError("");
  };

  return (
    <div className="nav-page">
      <Navbar />

      <div className="auth-container">
        <div className="auth-content"></div>
        <h2>Login</h2>
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Role:</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </div>

          {error && <p className="error">{error}</p>}

          <div className="form-buttons">
            <button type="submit">Sign In</button>
            <button type="button" onClick={handleReset}>
              Reset
            </button>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
};

export default Login;
