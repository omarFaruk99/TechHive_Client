import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-accentDark via-accent to-gray-600">
      <div className="text-center text-white px-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-9xl font-bold mb-4">404</h1>
          <h2 className="text-4xl font-semibold mb-6">Oops! Page Not Found</h2>
          <p className="text-xl mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Link
            to="/"
            className="inline-block px-8 py-3 bg-white text-purple-600 rounded-full font-semibold 
                                 transition-transform hover:scale-105 hover:shadow-lg"
          >
            Back to Home
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default ErrorPage;
