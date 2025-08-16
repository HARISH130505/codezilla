import React, { useState, FormEvent } from "react";
import "./App.css";

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    alert("Message sent successfully!");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <form className="contact-card-form" onSubmit={handleSubmit}>
      <h4 className="contact-form-title">Get In Touch</h4>
      <input
        type="text"
        name="name"
        value={formData.name}
        placeholder="Your Name"
        onChange={handleChange}
        required
        className="contact-input"
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        placeholder="Your Email"
        onChange={handleChange}
        required
        className="contact-input"
      />
      <textarea
        name="message"
        value={formData.message}
        placeholder="Write Your Message Here"
        onChange={handleChange}
        required
        className="contact-textarea"
        rows={5}
      />
      <button type="submit" className="send-btn">
        SEND &rarr;
      </button>
    </form>
  );
};

export default ContactForm;
