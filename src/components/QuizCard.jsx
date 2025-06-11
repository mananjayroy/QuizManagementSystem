import React from "react";
import "../styles/components/QuizCard.css";

const QuizCard = ({ title, description, onStart }) => {
  return (
    <div className="quiz-card">
      <h2>{title}</h2>
      <p>{description}</p>
      <button onClick={onStart} className="quiz-button">
        Start
      </button>
    </div>
  );
};

export default QuizCard;
