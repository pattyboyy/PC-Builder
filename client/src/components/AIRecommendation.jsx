import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { OPENAI_API_KEY } from '../env';

const AIRecommendation = ({ budget, usage, onRecommendation }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('OPENAI_API_KEY:', OPENAI_API_KEY ? 'Set' : 'Not set');
  }, []);

  const generateRecommendation = async () => {
    if (!budget || !usage) {
      setError('Please provide both budget and usage information.');
      return;
    }

    if (!OPENAI_API_KEY) {
      setError('OpenAI API key is not set. Please check your configuration.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: "You are an expert PC builder assistant that provides detailed and thorough PC build recommendations."
            },
            {
              role: "user",
              content: `Generate a detailed PC build recommendation for a budget of $${budget} and usage: ${usage}.`
            }
          ],
          max_tokens: 1500,
          n: 1,
          temperature: 0.7,
        },
        {
          headers: {
            'Authorization': `Bearer ${OPENAI_API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const recommendation = response.data.choices[0].message.content.trim();
      onRecommendation(recommendation);
    } catch (err) {
      console.error('Error generating recommendation:', err);
      if (err.response) {
        console.error(err.response.data);
        console.error(err.response.status);
        console.error(err.response.headers);
        setError(`API Error: ${err.response.status} - ${err.response.data.error?.message || 'Unknown error'}`);
      } else if (err.request) {
        console.error(err.request);
        setError('No response received from the server. Please check your internet connection and try again.');
      } else {
        console.error('Error', err.message);
        setError(`Error: ${err.message}`);
      }
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