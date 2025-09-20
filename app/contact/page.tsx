import { Mail, Phone, MapPin, MessageSquare } from "lucide-react";

export default function Page() {
  return (
    <div className="min-h-screen bg-white text-[#020202] font-sans">
      <section className="px-6 md:px-12 py-12 text-center">
        <h2 className="text-3xl font-bold text-black mb-2">Contact Our Friendly Family</h2>
        <h3 className="text-xl text-gray-400 font-semibold mb-8">Connect, Collaborate, Create Together.</h3>

        <div className="flex flex-col lg:flex-row gap-10 justify-between mt-8">
          {/* Left Info */}
          <div className="flex-1 text-left text-[#DE5D26] text-lg">
            <div className="flex items-center gap-3 mb-4">
              <h4 className="text-xl font-bold text-black">Send Us a Message</h4>
              <MessageSquare className="w-7 h-7" />
            </div>
            <p>
              Feel free to reach out through the contact form or find our contact information below. Your feedback, questions, and suggestions are important to us as we strive to foster a vibrant tech community at our university.
            </p>

            {/* Cards */}
            <div className="flex flex-col md:flex-row gap-6 mt-6">
              <div className="relative border-2 border-black rounded-md shadow-sm p-4 w-48 h-48 flex flex-col items-start gap-2 hover:shadow-lg hover:-translate-y-1 transition">
                <Mail className="w-8 h-8 text-[#DE5D26]" />
                <h4 className="text-lg font-bold text-black">Chat To Support</h4>
                <span className="text-sm">codezillaclub@gmail.com</span>
              </div>

              <div className="relative border-2 border-black rounded-md shadow-sm p-4 w-48 h-48 flex flex-col items-start gap-2 hover:shadow-lg hover:-translate-y-1 transition">
                <Phone className="w-8 h-8 text-[#DE5D26]" />
                <h4 className="text-lg font-bold text-black">Call Us</h4>
                <a href="tel:+917498133608" className="underline">+91 74981 33608</a>
              </div>

              <div className="relative border-2 border-black rounded-md shadow-sm p-4 w-48 h-48 flex flex-col items-start gap-2 hover:shadow-lg hover:-translate-y-1 transition">
                <MapPin className="w-8 h-8 text-[#DE5D26]" />
                <h4 className="text-lg font-bold text-black">Reach Us</h4>
                <p className="text-xs leading-tight">
                  SRM University,<br />
                  Bharathi Salai, Ramapuram,<br />
                  Chennai, Tamil Nadu 600089
                </p>
                <a href="https://maps.app.goo.gl/bWd8gwjzZpGGHx7y5" className="underline text-blue-600 text-xs">
                  View On Google Maps
                </a>
              </div>
            </div>
          </div>

          {/* Right Form */}
          <form className="flex flex-col items-center bg-[#DE5D26] rounded-3xl p-6 w-full max-w-sm text-black">
            <h4 className="text-xl font-bold text-center mb-4">Get In Touch</h4>
            <input
              type="text"
              placeholder="Your Name"
              required
              className="w-full h-12 rounded-lg bg-[#ff9460] text-center mb-4 text-lg outline-none"
            />
            <input
              type="email"
              placeholder="Your Email"
              required
              className="w-full h-12 rounded-lg bg-[#ff9460] text-center mb-4 text-lg outline-none"
            />
            <textarea
              placeholder="Write Your Message Here"
              required
              className="w-full h-40 rounded-lg bg-[#ff9460] text-center mb-4 text-lg outline-none resize-none"
            />
            <button
              type="submit"
              className="bg-black text-white font-bold px-6 py-3 rounded-lg hover:bg-[#DE5D26] hover:text-black transition"
            >
              SEND →
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}