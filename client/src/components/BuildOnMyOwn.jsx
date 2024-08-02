import React from 'react';
import ComponentSelector from './ComponentSelector';
import PCConfiguration from './PCConfiguration';
import BenchmarkSystem from './BenchmarkSystem';

const BuildOnMyOwn = () => {
  const [selectedComponents, setSelectedComponents] = React.useState({});

  const handleComponentSelection = (category, component) => {
    setSelectedComponents(prev => ({ ...prev, [category]: component }));
  };

  return (
    <div>
      <h2>Build My Own Rig</h2>
      <ComponentSelector onSelect={handleComponentSelection} />
      <PCConfiguration
        selectedComponents={selectedComponents}
        aiRecommendation={null}
      />
      <BenchmarkSystem selectedComponents={selectedComponents} />
    </div>
  );
};

export default BuildOnMyOwn;