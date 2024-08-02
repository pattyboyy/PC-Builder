import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Welcome from './components/Welcome';
import BuildForMe from './components/BuildForMe';
import BuildOnMyOwn from './components/BuildOnMyOwn';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-secondary-50 text-secondary-900">
        <header className="bg-white shadow-soft">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <Link to="/" className="text-3xl font-bold text-primary-600">Rig-Builder Pro</Link>
              <nav>
                <ul className="flex space-x-4">
                  <li><Link to="/" className="text-secondary-600 hover:text-primary-600 transition-soft">Home</Link></li>
                  <li><Link to="/build-on-my-own" className="text-secondary-600 hover:text-primary-600 transition-soft">Build My Own</Link></li>
                  <li><Link to="/build-for-me" className="text-secondary-600 hover:text-primary-600 transition-soft">Build For Me</Link></li>
                  <li><Link to="/about" className="text-secondary-600 hover:text-primary-600 transition-soft">About</Link></li>
                  <li><Link to="/contact" className="text-secondary-600 hover:text-primary-600 transition-soft">Contact</Link></li>
                </ul>
              </nav>
            </div>
          </div>
        </header>
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 sm:px-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Routes>
                <Route path="/" element={<Welcome />} />
                <Route path="/build-for-me" element={<BuildForMe />} />
                <Route path="/build-on-my-own" element={<BuildOnMyOwn />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
            </motion.div>
          </div>
        </main>
        <footer className="bg-white mt-12">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <p className="text-center text-secondary-500">&copy; 2024 Rig-Builder Pro. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
};

const About = () => (
  <div>
    <h2 className="text-2xl font-semibold mb-4">About Rig-Builder Pro</h2>
    <p>Rig-Builder Pro is a powerful tool designed to help you create the perfect custom PC configuration.</p>
  </div>
);

const Contact = () => (
  <div>
    <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
    <p>If you have any questions or feedback, please don't hesitate to reach out to us.</p>
  </div>
);

export default App;