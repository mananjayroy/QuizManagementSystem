/** @format */

import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import QuizCard from "../components/QuizCard";
import "../styles/components/QuizList.css";
import Sidebar from "../components/Sidebar";

const QuizList = () => {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await fetch("/data/quizzes.json");
        const data = await response.json();
        setQuizzes(data);
      } catch (error) {
        console.error("Failed to load quizzes:", error);
      }
    };

    fetchQuizzes();
  }, []);

  const handleStart = (quizId) => {
    window.location.href = `/quiz/${quizId}`;
  };

  return (
    <>
      <Navbar />
      <div className="quiz-layout">
        <Sidebar />
        <div className="QuizBody">
          <h2>Available Quizzes</h2>
          <p>Select a quiz to test your knowledge!</p>
          <div className="quiz-continer">
            {quizzes.map((quiz) => (
              <QuizCard
                key={quiz.id}
                title={quiz.title}
                description={quiz.description || quiz.questions[0]?.question}
                onStart={() => handleStart(quiz.id)}
              />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default QuizList;
