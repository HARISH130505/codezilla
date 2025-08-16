import React from "react";
import logoImg from "./zilla.logo.jpg";
import "./App.css";

const Navbar: React.FC = () => (
  <nav className="navbar">
    <div className="logo-container">
      <img src={logoImg} className="logo-img" alt="Logo" />
    </div>
    <div className="navbar-links">
      <a href="#">Home</a>
      <a href="#">Upcoming Events</a>
      <a href="#">About Our Club</a>
      <a href="#">Our Past Events</a>
      <a href="#">Club Members</a>
    </div>
    <button className="contact-btn">Contact Us</button>
  </nav>
);

export default Navbar;
