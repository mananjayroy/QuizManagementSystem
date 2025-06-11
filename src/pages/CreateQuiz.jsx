/** @format */

import React from "react";
import axios from "axios";
import NavbarAdmin from "../components/NavbarAdmin";
import Footer from "../components/Footer";

const CreateQuiz = () => {
  const [quiz, setQuiz] = React.useState({
    title: "",
    description: "",
    questions: [
      {
        question: "",
        options: ["", "", "", ""],
        answer: "",
      },
    ],
  });

  // Handle quiz meta changes
  const handleQuizChange = (e) => {
    const { name, value } = e.target;
    setQuiz({ ...quiz, [name]: value });
  };

  // Handle each question input
  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...quiz.questions];
    if (field === "question" || field === "answer") {
      updatedQuestions[index][field] = value;
    } else if (field.startsWith("option")) {
      const optionIndex = parseInt(field.replace("option", ""));
      updatedQuestions[index].options[optionIndex] = value;
    }
    setQuiz({ ...quiz, questions: updatedQuestions });
  };

  // Add a new blank question
  const handleAddQuestion = () => {
    const newQuestion = {
      question: "",
      options: ["", "", "", ""],
      answer: "",
    };
    setQuiz({ ...quiz, questions: [...quiz.questions, newQuestion] });
  };

  // Submit to backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    const confirmed = window.confirm("Submit quiz to database?");
    if (!confirmed) return;

    try {
      const res = await axios.post(
        "http://localhost:8086/api/quizzes/register",
        quiz
      );
      console.log("Quiz saved successfully:", res.data);
      alert("Quiz created and saved!");
      // Reset form
      setQuiz({
        title: "",
        description: "",
        questions: [
          {
            question: "",
            options: ["", "", "", ""],
            answer: "",
          },
        ],
      });
    } catch (error) {
      console.error("Error saving quiz:", error);
      alert("Failed to save quiz.");
    }
  };

  return (
    <div>
      <NavbarAdmin />
      <div
        className="create-quiz-container"
        style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}
      >
        <h1>Create a New Quiz</h1>
        <form onSubmit={handleSubmit}>
          {/* Quiz Info */}
          <div className="form-group">
            <label>Quiz Title</label>
            <input
              type="text"
              name="title"
              value={quiz.title}
              onChange={handleQuizChange}
              required
              className="form-control"
            />
            <label>Quiz Description</label>
            <textarea
              name="description"
              value={quiz.description}
              onChange={handleQuizChange}
              required
              className="form-control"
            />
          </div>

          {/* Questions UI */}
          <hr />
          {quiz.questions.map((q, index) => (
            <div key={index} style={{ marginBottom: "25px" }}>
              <h4>Question {index + 1}</h4>
              <label>Question Text</label>
              <input
                type="text"
                value={q.question}
                onChange={(e) =>
                  handleQuestionChange(index, "question", e.target.value)
                }
                className="form-control"
                required
              />
              {q.options.map((opt, i) => (
                <div key={i}>
                  <label>Option {i + 1}</label>
                  <input
                    type="text"
                    value={opt}
                    onChange={(e) =>
                      handleQuestionChange(index, `option${i}`, e.target.value)
                    }
                    className="form-control"
                    required
                  />
                </div>
              ))}
              <label>Correct Answer</label>
              <input
                type="text"
                value={q.answer}
                onChange={(e) =>
                  handleQuestionChange(index, "answer", e.target.value)
                }
                className="form-control"
                required
              />
              <hr />
            </div>
          ))}

          {/* Action Buttons */}
          <div>
            <button
              type="button"
              className="btn btn-primary me-2"
              onClick={handleAddQuestion}
            >
              Add More Questions
            </button>
            <button
              type="submit"
              className="btn btn-success"
              style={{ padding: "10px 20px" }}
            >
              Submit Quiz
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default CreateQuiz;
