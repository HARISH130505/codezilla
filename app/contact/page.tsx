import { Mail, Phone, MapPin, MessageSquare } from "lucide-react";
import React from 'react';

export default function Page() {
  return (
    <div className="min-h-screen bg-white text-[#020202] font-sans">
      <section className="px-6 md:px-12 lg:px-24 py-12 text-center">
        <h2 className="text-3xl md:text-5xl font-passion text-black mb-2">Contact Our Friendly Family</h2>
        <h3 className="text-lg md:text-2xl text-gray-400 font-passion mb-8">Connect, Collaborate, Create Together.</h3>

        <div className="flex flex-col lg:flex-row gap-10 justify-between mt-8">
          {/* Left Info */}
          <div className="flex-1 text-left text-[#DE5D26] text-lg">
            <div className="flex items-center gap-3 mb-4 justify-center lg:justify-start">
              <h4 className="text-xl md:text-2xl font-bold text-black">Send Us a Message</h4>
              <MessageSquare className="w-7 h-7" />
            </div>
            <p className="text-sm md:text-base text-gray-600 text-center lg:text-left mb-6">
              Feel free to reach out through the contact form or find our contact information below. Your feedback, questions, and suggestions are important to us as we strive to foster a vibrant tech community at our university.
            </p>

            {/* Cards - Now a responsive grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              <div className="relative border-2 border-black rounded-xl shadow-sm p-4 flex flex-col items-center justify-center gap-2 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <Mail className="w-8 h-8 text-[#DE5D26]" />
                <h4 className="text-lg font-bold text-black">Chat To Support</h4>
                <span className="text-sm text-center break-words">codezillaclub@gmail.com</span>
              </div>

              <div className="relative border-2 border-black rounded-xl shadow-sm p-4 flex flex-col items-center justify-center gap-2 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <Phone className="w-8 h-8 text-[#DE5D26]" />
                <h4 className="text-lg font-bold text-black">Call Us</h4>
                <a href="tel:+917498133608" className="underline text-blue-600 font-medium">+91 74981 33608</a>
              </div>

              <div className="relative border-2 border-black rounded-xl shadow-sm p-4 flex flex-col items-center justify-center gap-2 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <MapPin className="w-8 h-8 text-[#DE5D26]" />
                <h4 className="text-lg font-bold text-black">Reach Us</h4>
                <p className="text-xs leading-tight text-center">
                  SRM University,<br />
                  Bharathi Salai, Ramapuram,<br />
                  Chennai, Tamil Nadu 600089
                </p>
                <a href="https://maps.app.goo.gl/bWd8gwjzZpGGHx7y5" className="underline text-blue-600 text-xs mt-2">
                  View On Google Maps
                </a>
              </div>
            </div>
          </div>

          {/* Right Form */}
          <form className="flex-1 flex flex-col items-center bg-gradient-to-br from-[#DE5D26] to-[#FF8C42] rounded-3xl p-6 shadow-xl w-full max-w-lg lg:max-w-none mx-auto text-black">
            <h4 className="text-2xl font-bold text-center mb-6">Get In Touch</h4>
            <input
              type="text"
              placeholder="Your Name"
              required
              className="w-full h-12 rounded-xl bg-white/20 placeholder-white/80 backdrop-blur-sm px-4 mb-4 text-lg outline-none text-white focus:ring-2 focus:ring-white transition-all"
            />
            <input
              type="email"
              placeholder="Your Email"
              required
              className="w-full h-12 rounded-xl bg-white/20 placeholder-white/80 backdrop-blur-sm px-4 mb-4 text-lg outline-none text-white focus:ring-2 focus:ring-white transition-all"
            />
            <textarea
              placeholder="Write Your Message Here"
              required
              className="w-full h-40 rounded-xl bg-white/20 placeholder-white/80 backdrop-blur-sm px-4 py-3 mb-6 text-lg outline-none resize-none text-white focus:ring-2 focus:ring-white transition-all"
            />
            <button
              type="submit"
              className="w-full bg-black text-white font-bold px-6 py-3 rounded-xl hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-105"
            >
              SEND →
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
