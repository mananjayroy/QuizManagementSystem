/** @format */

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import "../styles/pages/QuizPage.css";

const QuizPage = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8086/api/quizzes/${quizId}`
        );
        setQuiz(response.data);
      } catch (err) {
        console.error("Failed to fetch quiz:", err);
        navigate("/user"); // fallback if quiz not found
      }
    };

    fetchQuiz();
  }, [quizId, navigate]);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleNext = () => {
    const currentQuestion = quiz.questions[currentQuestionIndex];

    const isCorrect = selectedOption === currentQuestion.answer;
    if (isCorrect) setScore((prev) => prev + 1);

    setAnswers((prev) => [
      ...prev,
      {
        question: currentQuestion.question,
        selected: selectedOption,
        correct: currentQuestion.answer,
        isCorrect: isCorrect,
      },
    ]);

    setSelectedOption(null);
    if (currentQuestionIndex === quiz.questions.length - 1) {
      setShowResult(true);
    } else {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
      setSelectedOption(answers[currentQuestionIndex - 1]?.selected || null);
    }
  };

  const handleFinish = () => {
    navigate("/user");
  };

  if (!quiz) {
    return (
      <>
        <Navbar />
        <div className="quiz-body">Loading quiz...</div>
        <Footer />
      </>
    );
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];

  return (
    <>
      <Navbar />
      <div className="quiz-layout">
        <Sidebar />
        <div className="quiz-body">
          {!showResult ? (
            <>
              <h2>{quiz.title} Quiz</h2>
              <p>
                <strong>Q{currentQuestionIndex + 1}:</strong>{" "}
                {currentQuestion.question}
              </p>

              <div className="options">
                {currentQuestion.options.map((option, index) => (
                  <label key={index} className="option">
                    <input
                      type="radio"
                      name="option"
                      value={option}
                      checked={selectedOption === option}
                      onChange={() => handleOptionSelect(option)}
                    />
                    {option}
                  </label>
                ))}
              </div>

              <div className="quiz-buttons">
                <button
                  onClick={handlePrevious}
                  disabled={currentQuestionIndex === 0}
                >
                  Previous
                </button>
                <button onClick={handleNext} disabled={!selectedOption}>
                  {currentQuestionIndex === quiz.questions.length - 1
                    ? "Submit"
                    : "Next"}
                </button>
              </div>
            </>
          ) : (
            <div className="result">
              <h3>Quiz Completed!</h3>
              <p>
                You scored <strong>{score}</strong> out of{" "}
                {quiz.questions.length}
              </p>

              <div className="summary">
                {answers.map((ans, index) => (
                  <div key={index} className="summary-item">
                    <p>
                      <strong>Q{index + 1}:</strong> {ans.question}
                    </p>
                    <p>
                      Your Answer:{" "}
                      <span className={ans.isCorrect ? "correct" : "incorrect"}>
                        {ans.selected}
                      </span>
                    </p>
                    {!ans.isCorrect && (
                      <p>
                        Correct Answer:{" "}
                        <span className="correct">{ans.correct}</span>
                      </p>
                    )}
                  </div>
                ))}
              </div>

              <button onClick={handleFinish}>Back to Dashboard</button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default QuizPage;
