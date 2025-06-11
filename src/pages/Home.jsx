/** @format */

import React from "react";
import "../styles/pages/home.css";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div className="home-page-container">
      <Navbar />
      <main className="home-body">
        <section className="hero-section">
          <h1>Welcome to QuizMaster!</h1>
          <p>
            Test your knowledge, challenge your friends, and learn new things.
          </p>
          <Link to="/quiz-list" className="cta-button">
            Explore Quizzes
          </Link>
        </section>

        <section className="features-section">
          <h2>Why Choose Us?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3>✓ Engaging Quizzes</h3>
              <p>
                Enjoy a wide variety of quizzes that are fun, challenging, and
                educational.
              </p>
            </div>
            <div className="feature-card">
              <h3>✓ Track Your Progress</h3>
              <p>
                Monitor your performance and improve with detailed analytics and
                feedback.
              </p>
            </div>
            <div className="feature-card">
              <h3>✓ Create & Share</h3>
              <p>
                Design your own quizzes and share them with friends or the
                community.
              </p>
            </div>
          </div>
        </section>

        <section className="motivation-section">
          <h2>"Fuel Your Curiosity. Master Every Quiz!"</h2>
          <p>
            Join now and unlock a world of fun, learning, and friendly
            competition.
          </p>
          <Link to="/signup" className="btn btn-highlight">
            Sign Up & Explore Now
          </Link>
        </section>
      </main>
      <Footer />
    </div>
  );
};
export default Home;
