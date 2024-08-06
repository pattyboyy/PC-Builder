// src/components/PCConfiguration.jsx
import React, { useState } from 'react';
import axios from 'axios';

const PCConfiguration = ({ selectedComponents, aiRecommendation }) => {
  const [compatibilityResult, setCompatibilityResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const checkCompatibility = async () => {
    setLoading(true);
    setError(null);

    const componentList = Object.entries(selectedComponents)
      .map(([category, component]) => `${category}: ${component}`)
      .join('\n');

    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: "You are an expert PC builder assistant that checks computer component compatibility. Provide detailed, comprehensive assessments covering all components."
            },
            {
              role: "user",
              content: `Perform a comprehensive compatibility check for the following PC components:

${componentList}

Please provide your assessment in the following format:
1. Start with a brief overall compatibility statement.
2. For each component, provide a detailed compatibility analysis, including any potential issues or considerations. Format as "Component Name: Analysis".
3. After individual component analyses, list any general issues or concerns, each on a new line prefixed with "Issue: ".
4. Provide recommendations for improving compatibility or performance, each on a new line prefixed with "Recommendation: ".
5. End with a conclusion statement summarizing the build's compatibility and any major points to consider.

Ensure your response is detailed, covering all components, clear, and professional.`
            }
          ],
          max_tokens: 1000,
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

      const result = response.data.choices[0].message.content.trim();
      setCompatibilityResult(result);
    } catch (err) {
      console.error('Error checking compatibility:', err);
      setError('Failed to check compatibility. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderAIRecommendation = () => {
    if (!aiRecommendation) return null;

    const sections = aiRecommendation.split('\n\n');
    const overview = sections[0];
    const components = sections.slice(1, -2);
    const synergy = sections[sections.length - 2];
    const conclusion = sections[sections.length - 1];

    return (
      <div className="mt-8 bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Detailed AI Recommendation</h3>
        </div>
        <div className="border-t border-gray-200">
          <div className="px-4 py-5 sm:p-6">
            <h4 className="text-md font-medium text-gray-900 mb-2">Overview</h4>
            <p className="text-sm text-gray-600 mb-4">{overview}</p>
            
            <h4 className="text-md font-medium text-gray-900 mb-2">Recommended Components:</h4>
            {components.map((component, index) => {
              const [title, ...details] = component.split('\n');
              return (
                <div key={index} className="mb-4">
                  <h5 className="text-sm font-medium text-gray-900">{title}</h5>
                  <p className="text-sm text-gray-600">{details.join('\n')}</p>
                </div>
              );
            })}

            <h4 className="text-md font-medium text-gray-900 mb-2 mt-4">Component Synergy</h4>
            <p className="text-sm text-gray-600 mb-4">{synergy}</p>

            <h4 className="text-md font-medium text-gray-900 mb-2">Conclusion and Cost Breakdown</h4>
            <p className="text-sm text-gray-600">{conclusion}</p>
          </div>
        </div>
      </div>
    );
  };

  const renderCompatibilityResult = () => {
    if (!compatibilityResult) return null;

    const sections = compatibilityResult.split('\n\n');
    const overallStatement = sections[0];
    const componentAnalyses = sections.slice(1, -3);
    const issues = sections[sections.length - 3].split('\n');
    const recommendations = sections[sections.length - 2].split('\n');
    const conclusion = sections[sections.length - 1];

    return (
      <div className="mt-8 bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Compatibility Assessment</h3>
        </div>
        <div className="border-t border-gray-200">
          <div className="px-4 py-5 sm:p-6">
            <p className="text-sm text-gray-600 mb-4">{overallStatement}</p>
            
            <h4 className="text-md font-medium text-gray-900 mb-2">Component Analysis:</h4>
            {componentAnalyses.map((analysis, index) => {
              const [component, ...details] = analysis.split(': ');
              return (
                <div key={index} className="mb-4">
                  <h5 className="text-sm font-medium text-gray-900">{component}:</h5>
                  <p className="text-sm text-gray-600">{details.join(': ')}</p>
                </div>
              );
            })}

            {issues.length > 1 && (
              <>
                <h4 className="text-md font-medium text-gray-900 mb-2 mt-4">Potential Issues:</h4>
                <ul className="list-disc list-inside space-y-1">
                  {issues.slice(1).map((issue, index) => (
                    <li key={index} className="text-sm text-gray-600">{issue.replace('Issue: ', '')}</li>
                  ))}
                </ul>
              </>
            )}

            {recommendations.length > 1 && (
              <>
                <h4 className="text-md font-medium text-gray-900 mb-2 mt-4">Recommendations:</h4>
                <ul className="list-disc list-inside space-y-1">
                  {recommendations.slice(1).map((recommendation, index) => (
                    <li key={index} className="text-sm text-gray-600">{recommendation.replace('Recommendation: ', '')}</li>
                  ))}
                </ul>
              </>
            )}

            <p className="mt-4 text-sm text-gray-600">{conclusion}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Your PC Configuration</h2>
      <div className="bg-gray-50 shadow overflow-hidden sm:rounded-lg mb-6">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Selected Components</h3>
        </div>
        <div className="border-t border-gray-200">
          <dl>
            {Object.entries(selectedComponents).map(([category, component], index) => (
              <div key={category} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6`}>
                <dt className="text-sm font-medium text-gray-500">{category}</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{component}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <button
        onClick={checkCompatibility}
        disabled={loading || Object.keys(selectedComponents).length === 0}
        className="w-full mb-6 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition duration-150 ease-in-out"
      >
        {loading ? 'Checking Compatibility...' : 'Check Compatibility'}
      </button>

      {renderCompatibilityResult()}
      {renderAIRecommendation()}
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default PCConfiguration;