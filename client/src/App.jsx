import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ApolloClient, InMemoryCache, ApolloProvider, useApolloClient } from '@apollo/client';
import Welcome from './components/Welcome';
import BuildForMe from './components/BuildForMe';
import BuildOnMyOwn from './components/BuildOnMyOwn';
import MyBuilds from './components/MyBuilds';
import LoginModal from './components/LoginModal';
import SignupModal from './components/SignupModal';
import logo from './assets/RBPro(final).png'; // Logo for the website
import './App.css';
import Auth from '../utils/auth';

const client = new ApolloClient({
  uri: 'http://localhost:3001/graphql', // Replace with your actual GraphQL endpoint
  cache: new InMemoryCache(),
});

const AppContent = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const apolloClient = useApolloClient();
  const navigate = useNavigate();

  const handleLogout = () => {
    Auth.logout();
    apolloClient.resetStore();
    navigate('/');
    setIsMenuOpen(false); // Close the menu after logging out
  };

  const showLogout = () => {
    if (Auth.loggedIn()) {
      return (
        <li>
          <button
            onClick={handleLogout}
            className="text-secondary-600 hover:text-primary-600 transition-soft"
          >
            Logout
          </button>
        </li>
      );
    } else {
      return (
        <li>
          <button
            onClick={() => {
              setShowLoginModal(true);
              setIsMenuOpen(false); // Close the menu after opening the login modal
            }}
            className="text-secondary-600 hover:text-primary-600 transition-soft"
          >
            Login
          </button>
        </li>
      );
    }
  };

  const handleSignup = () => {
    setShowSignupModal(true);
    setIsMenuOpen(false); // Close the menu after opening the signup modal
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-secondary-50 text-secondary-900">
      <header className="bg-white shadow-soft relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            {/* Logo with text */}
            <div className="flex items-center">
              <img src={logo} alt="Rig-Builder Pro Logo" className="h-10 w-auto" />
              <Link to="/" className="text-3xl font-bold text-primary-600 ml-2">
                Rig-Builder Pro
              </Link>
            </div>

            {/* Hamburger Icon */}
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="text-secondary-600 hover:text-primary-600 focus:outline-none"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="hidden md:flex space-x-4">
              <ul className="flex space-x-4">
                <li>
                  <Link
                    to="/"
                    className="text-secondary-600 hover:text-primary-600 transition-soft"
                    onClick={closeMenu}
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/build-on-my-own"
                    className="text-secondary-600 hover:text-primary-600 transition-soft"
                    onClick={closeMenu}
                  >
                    Build My Own
                  </Link>
                </li>
                <li>
                  <Link
                    to="/build-for-me"
                    className="text-secondary-600 hover:text-primary-600 transition-soft"
                    onClick={closeMenu}
                  >
                    Build For Me
                  </Link>
                </li>
                <li>
                  <Link
                    to="/my-builds"
                    className="text-secondary-600 hover:text-primary-600 transition-soft"
                    onClick={closeMenu}
                  >
                    My Builds
                  </Link>
                </li>
                {showLogout()}
                <li>
                  <button
                    onClick={handleSignup}
                    className="text-secondary-600 hover:text-primary-600 transition-soft"
                  >
                    Signup
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        {/* Dropdown Menu */}
        <div
          className={`${
            isMenuOpen ? 'block' : 'hidden'
          } md:hidden absolute top-full left-0 w-full bg-white shadow-lg`}
        >
          <ul className="flex flex-col space-y-2 p-4">
            <li>
              <Link
                to="/"
                className="text-secondary-600 hover:text-primary-600 transition-soft"
                onClick={closeMenu}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/build-on-my-own"
                className="text-secondary-600 hover:text-primary-600 transition-soft"
                onClick={closeMenu}
              >
                Build My Own
              </Link>
            </li>
            <li>
              <Link
                to="/build-for-me"
                className="text-secondary-600 hover:text-primary-600 transition-soft"
                onClick={closeMenu}
              >
                Build For Me
              </Link>
            </li>
            <li>
              <Link
                to="/my-builds"
                className="text-secondary-600 hover:text-primary-600 transition-soft"
                onClick={closeMenu}
              >
                My Builds
              </Link>
            </li>
            {showLogout()}
            <li>
              <button
                onClick={handleSignup}
                className="text-secondary-600 hover:text-primary-600 transition-soft"
              >
                Signup
              </button>
            </li>
          </ul>
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
              <Route path="/my-builds" element={<MyBuilds />} />
            </Routes>
          </motion.div>
        </div>
      </main>

      <footer className="bg-white mt-12">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-secondary-500">
            &copy; 2024 Rig-Builder Pro. All rights reserved.
          </p>
        </div>
      </footer>

      {showLoginModal && (
        <LoginModal
          onClose={() => setShowLoginModal(false)}
          onSignupClick={() => {
            setShowLoginModal(false);
            setShowSignupModal(true);
          }}
        />
      )}
      {showSignupModal && (
        <SignupModal
          onClose={() => setShowSignupModal(false)}
          onLoginClick={() => {
            setShowSignupModal(false);
            setShowLoginModal(true);
          }}
        />
      )}
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

function AppWrapper() {
  return (
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  );
}

export default AppWrapper;
