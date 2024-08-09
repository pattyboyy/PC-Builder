import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Welcome from './components/Welcome';
import BuildForMe from './components/BuildForMe';
import BuildOnMyOwn from './components/BuildOnMyOwn';
import LoginModal from './components/LoginModal';
import SignupModal from './components/SignupModal';
import logo from './assets/RBPro(final).png'; // Logo for the website
import './App.css';
import Auth from '../utils/auth';

console.log("App.jsx is being processed");

// Create an http link
const httpLink = createHttpLink({
  uri: '/graphql', // This will use the Vite proxy
});

// Create an auth link
const authLink = setContext((_, { headers }) => {
  const token = Auth.getToken();
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

// Create the Apollo Client instance
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  credentials: 'include' // Add this line for handling cookies if needed
});

const App = () => {
    console.log("App component is rendering");

    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showSignupModal, setShowSignupModal] = useState(false);

    useEffect(() => {
        console.log("App component mounted");
    }, []);

    const handleLogout = () => {
        Auth.logout();
        window.location.assign('/');
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
                        onClick={() => setShowLoginModal(true)} 
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
    };

    return (
        <Router>
            <div className="min-h-screen bg-secondary-50 text-secondary-900">
                {console.log("Rendering header")}
                <header className="bg-white shadow-soft">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center py-6">
                            <div className='header'>
                                <Link to="/" className="text-3xl font-bold text-primary-600">Rig-Builder Pro</Link>
                            </div>
                            <nav>
                                <ul className="flex space-x-4">
                                    <li><Link to="/" className="text-secondary-600 hover:text-primary-600 transition-soft">Home</Link></li>
                                    <li><Link to="/build-on-my-own" className="text-secondary-600 hover:text-primary-600 transition-soft">Build My Own</Link></li>
                                    <li><Link to="/build-for-me" className="text-secondary-600 hover:text-primary-600 transition-soft">Build For Me</Link></li>
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
                            </Routes>
                        </motion.div>
                    </div>
                </main>
                <footer className="bg-white mt-12">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                        <p className="text-center text-secondary-500">&copy; 2024 Rig-Builder Pro. All rights reserved.</p>
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
        </Router>
    );
};

function AppWrapper() {
    console.log("AppWrapper is rendering");
    return (
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>
    );
}

export default AppWrapper;