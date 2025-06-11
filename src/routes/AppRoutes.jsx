/** @format */

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import QuizList from "../pages/QuizList";
import QuizPage from "../pages/QuizPage";
// import Results from "../pages/Results";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import QuizDetail from "../pages/QuizDetail";
import AdminPage from "../pages/Adminpage";
import UserPage from "../pages/UserPage";
import CreateQuiz from "../pages/CreateQuiz";
import QuizConfirmationPage from "../pages/QuizConfirmationPage";

// import NotFound from "../pages/NotFound"; // For handling undefined routes

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz-list" element={<QuizList />} />
        {/* <Route path="/quiz/:id" element={<QuizPage />} /> 
        <Route path="/results" element={<Results />} /> */}
        <Route path="/quiz/:quizId" element={<QuizDetail />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/create-quiz" element={<CreateQuiz />} />
        <Route
          path="/quizzes/:quizId/confirm"
          element={<QuizConfirmationPage />}
        />
        <Route path="/quizzes/:quizId" element={<QuizPage />} />
        {/* <Route path="*" element={<NotFound />} /> Catch-all for 404 errors */}
      </Routes>
    </Router>
  );
};

export default AppRoutes;
