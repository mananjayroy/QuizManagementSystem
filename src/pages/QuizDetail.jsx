/** @format */

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import "../styles/components/QuizDetail.css";

const QuizDetail = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);
  const [summary, setSummary] = useState([]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await fetch("/data/quizzes.json");
        const data = await response.json();
        const selectedQuiz = data.find((q) => q.id === quizId);
        if (selectedQuiz) {
          setQuiz(selectedQuiz);
        } else {
          navigate("/");
        }
      } catch (error) {
        console.error("Failed to load quizzes:", error);
      }
    };

    fetchQuizzes();
  }, [quizId, navigate]);

  const handleOptionSelect = (option) => {
    if (answered) return;

    const question = quiz.questions[currentQuestionIndex];
    const correct = question.answer === option;
    setSelectedOption(option);
    setIsCorrect(correct);
    setAnswered(true);

    if (correct) {
      setScore((prev) => prev + 1);
    }
    setSummary((prev) => [
      ...prev,
      {
        question: question.question,
        options: question.options,
        selected: option,
        correctAnswer: question.answer,
        isCorrect: correct,
      },
    ]);
  };

  const handleNext = () => {
    const isLast = currentQuestionIndex === quiz.questions.length - 1;
    if (isLast) {
      setShowResult(true);
    } else {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOption(null);
      setAnswered(false);
      setIsCorrect(null);
    }
  };

  const closePopup = () => {
    setShowResult(false);
    navigate("/quiz-list");
  };

  if (!quiz) {
    return (
      <>
        <Navbar />
        <div className="quiz-layout">
          <Sidebar />
          <div className="QuizBody">
            <p>Loading quiz...</p>
          </div>
        </div>
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
        <div className="QuizBody center-question">
          <h2>{quiz.title} Quiz</h2>
          <div className="question-block">
            <p>
              <strong>Q{currentQuestionIndex + 1}:</strong>{" "}
              {currentQuestion.question}
            </p>
            {currentQuestion.options.map((option, i) => (
              <label
                key={i}
                className={`option-label ${
                  answered
                    ? option === currentQuestion.answer
                      ? "correct"
                      : option === selectedOption
                      ? "incorrect"
                      : ""
                    : ""
                }`}
              >
                <input
                  type="radio"
                  name={`q${currentQuestionIndex}`}
                  value={option}
                  checked={selectedOption === option}
                  onChange={() => handleOptionSelect(option)}
                  disabled={answered}
                />
                {option}
              </label>
            ))}
            {answered && (
              <button className="btn btn-primary next-btn" onClick={handleNext}>
                {currentQuestionIndex === quiz.questions.length - 1
                  ? "Finish Quiz"
                  : "Next Question"}
              </button>
            )}
          </div>
        </div>
      </div>

      {showResult && (
        <div className="result-popup">
          <div className="result-content summary-scroll">
            <h4>Quiz Summary</h4>
            <p>
              You answered <strong>{score}</strong> out of{" "}
              {quiz.questions.length} questions correctly.
            </p>

            <div className="summary-list">
              {summary.map((item, idx) => (
                <div key={idx} className="summary-item">
                  <p>
                    <strong>Q{idx + 1}:</strong> {item.question}
                  </p>
                  <p>
                    Your Answer:{" "}
                    <span
                      className={
                        item.isCorrect ? "correct-answer" : "incorrect-answer"
                      }
                    >
                      {item.selected}
                    </span>
                  </p>
                  {!item.isCorrect && (
                    <p>
                      Correct Answer:{" "}
                      <span className="correct-answer">
                        {item.correctAnswer}
                      </span>
                    </p>
                  )}
                </div>
              ))}
            </div>

            <button className="btn btn-secondary" onClick={closePopup}>
              Close
            </button>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default QuizDetail;
