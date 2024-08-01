// src/components/AIRecommendation.jsx
import React, { useState } from 'react';
import axios from 'axios';

const AIRecommendation = ({ budget, usage, onRecommendation }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateRecommendation = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content: "You are an expert PC builder assistant that provides detailed and thorough PC build recommendations. Your recommendations should include explanations for each component choice and how they work together to meet the user's needs."
            },
            {
              role: "user",
              content: `Generate a detailed PC build recommendation for a budget of $${budget} and usage: ${usage}. Please format your response as follows:

1. Start with a brief overview of the build and how it meets the user's needs.
2. For each component, provide:
   - The recommended part
   - Its price
   - A detailed explanation of why this part was chosen, its performance characteristics, and how it fits with the overall build and usage requirements.
3. Include a section on how the components work together to achieve the desired performance for the specified usage.
4. End with a total cost breakdown and any final thoughts or potential upgrade paths.

Please ensure your explanation is thorough and easy to understand for someone who may not be an expert in PC building.`
            }
          ],
          max_tokens: 1500,
          n: 1,
          temperature: 0.7,
        },
        {
          headers: {
            'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const recommendation = response.data.choices[0].message.content.trim();
      onRecommendation(recommendation);
    } catch (err) {
      console.error('Error generating recommendation:', err);
      setError('Failed to generate recommendation. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6">
      <button
        onClick={generateRecommendation}
        disabled={loading || !budget || !usage}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition duration-150 ease-in-out"
      >
        {loading ? 'Generating Detailed Recommendation...' : 'Get Detailed AI Recommendation'}
      </button>
      {error && (
        <div className="mt-2 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
          <p className="text-sm">{error}</p>
        </div>
      )}
    </div>
  );
};

export default AIRecommendation;