import React from 'react';
import ComponentSelector from './ComponentSelector';
import PCConfiguration from './PCConfiguration';
import BenchmarkSystem from './BenchmarkSystem';
import { CREATE_BUILD } from '../../utils/mutations';
import { useMutation } from '@apollo/client';

const BuildOnMyOwn = () => {
  const [selectedComponents, setSelectedComponents] = React.useState({});

  const handleComponentSelection = (category, component) => {
    setSelectedComponents(prev => ({ ...prev, [category]: component }));
  };

  // const saveBuild = () => {
  //   const []
  // }

  return (
    <div>
      <h2>Build My Own Rig</h2>
      <ComponentSelector onSelect={handleComponentSelection} />
      <PCConfiguration
        selectedComponents={selectedComponents}
        aiRecommendation={null}
      />
      <BenchmarkSystem selectedComponents={selectedComponents} />
      <br/>
      <button className="btn btn-primary btn-block py-3" type="submit">Save Build</button>
    </div>
  );
};

export default BuildOnMyOwn;