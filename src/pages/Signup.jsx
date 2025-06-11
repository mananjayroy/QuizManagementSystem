/** @format */

import React, { useState } from "react";
import "../styles/pages/signup.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";

const Signup = () => {
  const initialState = {
    name: "",
    email: "",
    role: "",
    password: "",
    confirmPassword: "",
  };

  const [formData, setFormData] = useState(initialState);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted with data:", formData);

    if (formData.password !== formData.confirmPassword) {
      console.error("Password mismatch");
      setError("Passwords do not match");
      return;
    }

    try {
      console.log("Sending request to backend...");
      const response = await axios.post(
        "http://localhost:8087/api/users/register",
        {
          name: formData.name,
          email: formData.email,
          role: formData.role,
          password: formData.password,
        }
      );

      console.log("Response from backend:", response.data);
      alert("Registration successful!");
      handleReset();
    } catch (err) {
      console.error("Error during registration:", err);
      setError(err.response?.data?.message || "Registration failed");
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
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

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
            <label>Confirm Password:</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          {error && <p className="error">{error}</p>}

          <div className="form-buttons">
            <button type="submit">Sign Up</button>
            <button type="button" onClick={handleReset}>
              Reset
            </button>
          </div>

          <p className="form-footer">
            Already have an account? <a href="/login">Log in</a>
          </p>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Signup;
