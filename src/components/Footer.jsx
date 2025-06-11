import React from "react";
import "../styles/components/footer.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faPhone,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer className="home-footer">
      <div className="footer-content">
        <div className="footer-section about">
          <h4>About QuizMaster</h4>
          <p>
            QuizMaster is your go-to platform for fun, engaging, and educational
            quizzes. Whether you're a student, teacher, or trivia enthusiast —
            we've got something for everyone!
          </p>
        </div>

        <div className="footer-section links">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/login">Login</a></li>
            <li><a href="/signup">Sign Up</a></li>
            <li><a href="#">About Us</a></li>
          </ul>
        </div>

        <div className="footer-section contact">
          <h4>Contact Us</h4>
          <p><FontAwesomeIcon icon={faEnvelope} /> support@quizmaster.com</p>
          <p><FontAwesomeIcon icon={faPhone} /> +91 79799 88234</p>
          <p><FontAwesomeIcon icon={faMapMarkerAlt} /> Newtown, West Bengal</p>
        </div>

        <div className="footer-section social">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a href="#"><FontAwesomeIcon icon={faFacebook} /></a>
            <a href="#"><FontAwesomeIcon icon={faTwitter} /></a>
            <a href="#"><FontAwesomeIcon icon={faInstagram} /></a>
          </div>
        </div>
        </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} QuizMaster. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
