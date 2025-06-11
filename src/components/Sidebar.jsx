import React from "react";
import "../styles/components/Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h3>Quiz Filters</h3>
      <ul>
        <li>All Quizzes</li>
        <li>Beginner</li>
        <li>Intermediate</li>
        <li>Advanced</li>
        <li>Categories</li>
      </ul>
    </div>
  );
};

export default Sidebar;
