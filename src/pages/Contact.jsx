import  { useState } from "react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const Contact = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-[#1e3a8a] to-[#3183e7]">
      {/* Content Container */}
      <div className="relative container mx-auto py-16 px-4">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-4">Get in Touch</h1>
          <div className="w-24 h-1 bg-gradient-to-r from-[#3183e7] to-[#60A5FA] mx-auto"></div>
        </div>

        {/* Contact Info Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {[
            { icon: <FaPhone />, title: "Phone", content: "+1 (555) 123-4567" },
            {
              icon: <FaEnvelope />,
              title: "Email",
              content: "contact@techhive.com",
            },
            {
              icon: <FaMapMarkerAlt />,
              title: "Location",
              content: "123 Tech Street, NY 10001",
            },
          ].map((item, index) => (
            <div key={index} className="group">
              <div
                className="bg-white/10 backdrop-blur-lg p-8 rounded-xl shadow-xl text-center 
                                          transform transition-all duration-500 ease-in-out 
                                          hover:scale-105 hover:bg-[#3183e7]/20 hover:shadow-2xl
                                          border border-white/20"
              >
                <div
                  className="text-4xl text-[#60A5FA] mx-auto mb-4 group-hover:scale-110 
                                              transition-transform duration-300"
                >
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">
                  {item.title}
                </h3>
                <p className="text-gray-300">{item.content}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Form */}
        <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur-lg rounded-xl shadow-xl p-8 border border-white/20">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white mb-2">First Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg 
                                             text-white placeholder-gray-400 focus:outline-none focus:border-pink-500
                                             transition-all duration-300"
                  placeholder="John"
                />
              </div>
              <div>
                <label className="block text-white mb-2">Last Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg 
                                             text-white placeholder-gray-400 focus:outline-none focus:border-pink-500
                                             transition-all duration-300"
                  placeholder="Doe"
                />
              </div>
            </div>
            <div>
              <label className="block text-white mb-2">Email</label>
              <input
                type="email"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg 
                                         text-white placeholder-gray-400 focus:outline-none focus:border-pink-500
                                         transition-all duration-300"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label className="block text-white mb-2">Message</label>
              <textarea
                rows="5"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg 
                                         text-white placeholder-gray-400 focus:outline-none focus:border-pink-500
                                         transition-all duration-300"
                placeholder="Your message here..."
              ></textarea>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-[#3183e7] to-[#60A5FA] text-white py-4 rounded-lg
                                     transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg
                                     disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Sending...
                </span>
              ) : (
                "Send Message"
              )}
            </button>
          </form>
        </div>

        {/* Map Section */}
        <div className="mt-16">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830869428!2d-74.119763973046!3d40.69766374874431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1645454805701!5m2!1sen!2s"
            className="w-full h-96 rounded-xl shadow-xl border border-white/20"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact;
