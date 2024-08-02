import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Welcome = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-secondary-100 to-secondary-200">
      <motion.h1 
        className="text-5xl font-bold text-primary-600 mb-12"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Rig-Builder Pro
      </motion.h1>
      <div className="flex flex-col sm:flex-row gap-8">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Link to="/build-on-my-own" className="block w-64 h-64 bg-white rounded-lg shadow-lg p-6 flex flex-col items-center justify-center text-center hover:bg-primary-50 transition-colors duration-300">
            <h2 className="text-2xl font-semibold text-primary-600 mb-4">Build My Own Rig</h2>
            <p className="text-secondary-600">Choose your own components and create a custom PC build.</p>
          </Link>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Link to="/build-for-me" className="block w-64 h-64 bg-white rounded-lg shadow-lg p-6 flex flex-col items-center justify-center text-center hover:bg-primary-50 transition-colors duration-300">
            <h2 className="text-2xl font-semibold text-primary-600 mb-4">Build It For Me</h2>
            <p className="text-secondary-600">Get an AI-assisted PC build recommendation based on your needs.</p>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Welcome;