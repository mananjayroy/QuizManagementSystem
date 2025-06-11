/** @format */

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import NavbarAdmin from "../components/NavbarAdmin";
import Footer from "../components/Footer";
import QuizCard from "../components/QuizCard";
import "../styles/pages/UserPage.css";

const UserPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [quizzes, setQuizzes] = useState([]);
  const loggedInEmail = localStorage.getItem("loggedInUserEmail");

  // Fetch user by email
  useEffect(() => {
    const fetchUser = async () => {
      try {
        console.log("Fetching user with email:", loggedInEmail);
        const res = await axios.get(
          `http://localhost:8087/api/users/email/${loggedInEmail}`
        );
        setUser(res.data);
      } catch (err) {
        console.error("Failed to fetch user", err);
      }
    };

    fetchUser();
  }, [id, loggedInEmail]);

  // Fetch quizzes
  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const res = await axios.get("http://localhost:8086/api/quizzes");
        setQuizzes(res.data);
      } catch (err) {
        console.error("Failed to fetch quizzes", err);
      }
    };

    fetchQuizzes();
  }, []);

  const handleStart = (quizId) => {
    navigate(`/quizzes/${quizId}`);
  };

  return (
    <>
      <NavbarAdmin />
      <div className="userpage-container">
        <h2>{"Welcome " + user.name}</h2>
        <p>Email: {user.email}</p>
        <p>Role: {user.role}</p>

        <div className="quiz-container">
          <h3>Available Quizzes</h3>
          {quizzes.map((quiz) => (
            <QuizCard
              key={quiz.id}
              title={quiz.title}
              description={quiz.description}
              onStart={() => handleStart(quiz.id)}
            />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UserPage;
