/** @format */

import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const QuizConfirmationPage = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const [accepted, setAccepted] = useState(false);

  const handleCheckboxChange = () => {
    setAccepted(!accepted);
  };

  const handleProceed = () => {
    if (accepted) {
      navigate(`/quizzes/${quizId}`);
    } else {
      alert("Please accept the terms and conditions to proceed.");
    }
  };

  return (
    <div className="confirmation-page">
      <h2>Terms & Conditions</h2>
      <p>
        Please read and accept the terms and conditions before starting the
        quiz.
      </p>
      <div>
        <input
          type="checkbox"
          id="acceptTnC"
          checked={accepted}
          onChange={handleCheckboxChange}
        />
        <label htmlFor="acceptTnC">I accept the Terms and Conditions</label>
      </div>
      <button onClick={handleProceed} disabled={!accepted}>
        Proceed to Quiz
      </button>
    </div>
  );
};

export default QuizConfirmationPage;
