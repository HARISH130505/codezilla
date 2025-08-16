import React from "react";
import Navbar from "./Navbar";
import InfoPanel from "./InfoPanel";
import ContactForm from "./ContactForm";
import "./App.css";

function App() {
  return (
    <>
      <Navbar />
      <div className="main-section">
        <h1 className="contact-heading">
          Contact Our Friendly Team
        </h1>
        <h2 className="contact-subheading">
          Connect, Collaborate, Create Together.
        </h2>
        <div className="contact-content">
          <InfoPanel />
          <ContactForm />
        </div>
      </div>
    </>
  );
}

export default App;
