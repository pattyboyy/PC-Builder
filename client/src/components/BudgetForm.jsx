// src/components/BudgetForm.jsx
import React from 'react';

const BudgetForm = ({ budget, usage, onBudgetChange, onUsageChange }) => {
  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="budget" className="block text-sm font-medium text-secondary-700">Budget ($)</label>
        <input
          type="number"
          id="budget"
          value={budget}
          onChange={(e) => onBudgetChange(Number(e.target.value))}
          className="mt-1 block w-full border-secondary-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="usage" className="block text-sm font-medium text-secondary-700">Usage Requirements</label>
        <input
          type="text"
          id="usage"
          value={usage}
          onChange={(e) => onUsageChange(e.target.value)}
          className="mt-1 block w-full border-secondary-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
        />
      </div>
    </div>
  );
};

export default BudgetForm;