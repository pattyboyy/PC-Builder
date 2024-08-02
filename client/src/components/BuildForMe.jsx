import React from 'react';
import BudgetForm from './BudgetForm';
import AIRecommendation from './AIRecommendation';
import PCConfiguration from './PCConfiguration';

const BuildForMe = () => {
  const [budget, setBudget] = React.useState(0);
  const [usage, setUsage] = React.useState('');
  const [aiRecommendation, setAiRecommendation] = React.useState(null);

  const handleAIRecommendation = (recommendation) => {
    setAiRecommendation(recommendation);
  };

  return (
    <div>
      <h2>Build It For Me</h2>
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
      {aiRecommendation && (
        <PCConfiguration
          selectedComponents={{}}
          aiRecommendation={aiRecommendation}
        />
      )}
    </div>
  );
};

export default BuildForMe;