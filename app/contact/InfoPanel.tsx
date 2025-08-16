import React from "react";
import "./App.css";

// Import images from src folder
import envelopeImg from "./enevolope.jpg";
import inboxImg from "./inbox.jpg";
import callImg from "./call.jpg";
import locateImg from "./locate1.jpg";

const InfoPanel: React.FC = () => (
  <div className="info-panel">
    <div className="send-message-row">
      <span>Send Us a Message</span>
      <img src={envelopeImg} alt="mail" className="mini-icon" />
    </div>
    <span className="send-message-underline"></span>
    <div className="send-message-desc">
      Feel free to reach out through the contact form or find our contact information below.
      Your feedback, questions, and suggestions are important to us as we strive to foster
      a vibrant tech community at our university.
    </div>
    <div className="info-row">
      <div className="info-box">
        <img src={inboxImg} alt="mail" className="mini-icon" /><br></br>
        <div className="info-box-title">Chat To Support</div>
        <div className="info-box-content">codezillaclub@gmail.com</div>
      </div>
      <div className="info-box">
        <img src={callImg} alt="phone" className="mini-icon" /><br></br>
        <div className="info-box-title">Call Us</div>
        <div className="info-box-content">+91 74981 33608</div>
      </div>
      <div className="info-box">
        <img src={locateImg} alt="location" className="mini-icon"></img><br></br>
        <div className="info-box-title">Reach Us</div>
        <div className="info-box-content">
          SRM University, <br />
          Bharathi Salai, Ramapuram, <br />
          Chennai, Tamil Nadu 600089 <br />
          <a href="https://maps.app.goo.gl/nuKkLNe3G9Pd7zwG6" target="_blank" rel="noopener noreferrer">View On Google Maps</a>
        </div>
      </div>
    </div>
  </div>
);

export default InfoPanel;
