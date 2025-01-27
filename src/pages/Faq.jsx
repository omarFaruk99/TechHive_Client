import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiPlus, FiMinus } from "react-icons/fi";
import { Link } from "react-router-dom";

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqData = [
    {
      question: "What services does TechHive provide?",
      answer:
        "TechHive offers a comprehensive range of tech solutions including web development, mobile app development, cloud services, and IT consulting. We specialize in creating custom solutions tailored to your business needs.",
    },
    {
      question: "How do I get started with TechHive?",
      answer:
        "Getting started is easy! Simply contact us through our website or give us a call. We'll schedule a free consultation to discuss your project requirements and provide you with a detailed proposal.",
    },
    {
      question: "What is your typical project timeline?",
      answer:
        "Project timelines vary depending on complexity and scope. Typically, small projects take 4-6 weeks, while larger projects can take 3-6 months. We'll provide you with a detailed timeline during our initial consultation.",
    },
    {
      question: "Do you provide ongoing support?",
      answer:
        "Yes, we offer comprehensive support and maintenance packages for all our solutions. Our team is available 24/7 to handle any issues and ensure your systems run smoothly.",
    },
    {
      question: "What technologies do you work with?",
      answer:
        "We work with a wide range of modern technologies including React, Node.js, Python, AWS, Azure, and more. Our team stays up-to-date with the latest tech trends to provide cutting-edge solutions.",
    },
  ];

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-[#1e3a8a] to-[#3183e7] py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-4">
            Frequently Asked Questions
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-[#3183e7] to-[#60A5FA] mx-auto"></div>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-lg rounded-lg overflow-hidden border border-white/20 hover:border-[#60A5FA]/30"
            >
              <button
                className="w-full p-6 text-left flex items-center justify-between text-white hover:bg-white/5 transition-colors duration-300"
                onClick={() => toggleAccordion(index)}
              >
                <span className="text-xl font-medium">{faq.question}</span>
                <motion.div
                  animate={{ rotate: activeIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-[#60A5FA] text-2xl"
                >
                  {activeIndex === index ? <FiMinus /> : <FiPlus />}
                </motion.div>
              </button>

              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="p-6 pt-0 text-gray-300">{faq.answer}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="mt-16 text-center">
          <p className="text-white text-lg mb-4">
            Still have questions? We're here to help!
          </p>
          <button
            className="bg-gradient-to-r from-[#3183e7] to-[#60A5FA] text-white px-8 py-3 rounded-lg
                                     transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            <Link to="/contact">Contact Us</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Faq;
