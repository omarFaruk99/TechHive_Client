import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaQuoteLeft, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const testimonials = [
  {
    id: 1,
    name: "John Doe",
    role: "Software Engineer",
    image: "https://i.pravatar.cc/150?img=1",
    text: "Working with TechHive has been transformative for our business. Their innovative solutions and dedicated support team have exceeded our expectations.",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    role: "Product Manager",
    image: "https://i.pravatar.cc/150?img=2",
    text: "The quality of service and technical expertise provided by TechHive is outstanding. They've helped us stay ahead in the competitive market.",
  },
  {
    id: 3,
    name: "Michael Chen",
    role: "CEO",
    image: "https://i.pravatar.cc/150?img=3",
    text: "TechHive's commitment to excellence and innovative approach has made them our go-to technology partner. Highly recommended!",
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-[#1e3a8a] to-[#3183e7]">
      <div className="relative container mx-auto py-16 px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white mb-4">
            Client Testimonials
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#3183e7] to-[#60A5FA] mx-auto"></div>
        </div>

        <div className="relative">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
            className="bg-white/10 backdrop-blur-lg p-8 md:p-12 rounded-xl border border-white/20 shadow-xl"
          >
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
              <div className="w-12 h-12 bg-gradient-to-r from-[#3183e7] to-[#60A5FA] rounded-full flex items-center justify-center">
                <FaQuoteLeft className="text-2xl text-white" />
              </div>
            </div>

            <p className="text-white text-xl md:text-2xl leading-relaxed mb-8 text-center mt-6">
              {testimonials[currentIndex].text}
            </p>

            <div className="flex flex-col items-center gap-4">
              <motion.img
                whileHover={{ scale: 1.1 }}
                src={testimonials[currentIndex].image}
                alt={testimonials[currentIndex].name}
                className="w-20 h-20 rounded-full object-cover border-4 border-white/30"
              />
              <div className="text-center">
                <h3 className="font-semibold text-xl text-white">
                  {testimonials[currentIndex].name}
                </h3>
                <p className="text-white/80">
                  {testimonials[currentIndex].role}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Progress Indicator with updated colors */}
          <div className="flex justify-center mt-8 gap-2">
            {testimonials.map((_, idx) => (
              <div
                key={idx}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === currentIndex ? "w-8 bg-[#60A5FA]" : "w-2 bg-white/30"
                }`}
              ></div>
            ))}
          </div>

          {/* Navigation Buttons with updated styles */}
          <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between px-4">
            <button
              onClick={handlePrev}
              className="w-12 h-12 rounded-full bg-white/10 hover:bg-[#3183e7]/20 backdrop-blur-lg 
              flex items-center justify-center text-white border border-white/20 transition-all"
            >
              <FaChevronLeft />
            </button>
            <button
              onClick={handleNext}
              className="w-12 h-12 rounded-full bg-white/10 hover:bg-[#3183e7]/20 backdrop-blur-lg 
              flex items-center justify-center text-white border border-white/20 transition-all"
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
