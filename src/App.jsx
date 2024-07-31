import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ComponentSelector from './components/ComponentSelector';
import BudgetForm from './components/BudgetForm';
import AIRecommendation from './components/AIRecommendation';
import PCConfiguration from './components/PCConfiguration';
import BenchmarkSystem from './components/BenchmarkSystem';

const App = () => {
  const [budget, setBudget] = useState(0);
  const [usage, setUsage] = useState('');
  const [selectedComponents, setSelectedComponents] = useState({});
  const [aiRecommendation, setAiRecommendation] = useState(null);

  const handleComponentSelection = (category, component) => {
    setSelectedComponents(prev => ({ ...prev, [category]: component }));
  };

  const handleAIRecommendation = (recommendation) => {
    setAiRecommendation(recommendation);
  };

  return (
    <div className="min-h-screen bg-secondary-50 text-secondary-900">
      <header className="bg-white shadow-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-primary-600">PC Builder Pro</h1>
            <nav>
              <ul className="flex space-x-4">
                <li><a href="#" className="text-secondary-600 hover:text-primary-600 transition-soft">Home</a></li>
                <li><a href="#" className="text-secondary-600 hover:text-primary-600 transition-soft">About</a></li>
                <li><a href="#" className="text-secondary-600 hover:text-primary-600 transition-soft">Contact</a></li>
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
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            <div className="space-y-6">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="card"
              >
                <h2 className="text-xl font-semibold mb-4 text-secondary-800">Build Parameters</h2>
                <BudgetForm
                  budget={budget}
                  usage={usage}
                  onBudgetChange={setBudget}
                  onUsageChange={setUsage}
                />
                <AIRecommendation
                  budget={budget}
                  usage={usage}
                  onRecommendation={handleAIRecommendation}
                />
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="card"
              >
                <h2 className="text-xl font-semibold mb-4 text-secondary-800">Component Selection</h2>
                <ComponentSelector onSelect={handleComponentSelection} />
              </motion.div>
            </div>
            <div className="space-y-6">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="card"
              >
                <PCConfiguration
                  selectedComponents={selectedComponents}
                  aiRecommendation={aiRecommendation}
                />
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="card"
              >
                <BenchmarkSystem selectedComponents={selectedComponents} />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </main>
      <footer className="bg-white mt-12">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-secondary-500">&copy; 2024 PC Builder Pro. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;