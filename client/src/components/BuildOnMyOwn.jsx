import React, { useState } from 'react';
import ComponentSelector from './ComponentSelector';
import PCConfiguration from './PCConfiguration';
import BenchmarkSystem from './BenchmarkSystem';
import { ADD_BUILD } from '../../utils/mutations';
import { useMutation } from '@apollo/client';

const styles = {
  inputStyle: {
    "border-radius": "8px",
  },
};

const BuildOnMyOwn = () => {
  const [buildText, setBuildText] = useState('');
  const [selectedComponents, setSelectedComponents] = React.useState({});

  const handleComponentSelection = (category, component) => {
    setSelectedComponents(prev => ({ ...prev, [category]: component }));
  };

  const handleInputChange = (event) => {
    event.preventDefault();
    setBuildText(event.target.value);
  };

  const handleButtonClick = async (event) => {
    event.preventDefault();

    try {
      if(buildText === '') {
        alert(`Please enter a Build Name to continue.`);
        return;
      }
      
    //   const { data } = await addBuild({
    //     variables: {
    //         "user":"66b5727207b73059ab72bdf8",
    //         "name":"testName",
    //         "cpu":"testCPU",
    //         "gpu":"testGPU",
    //         "ram":"testRAM",
    //         "storage":"testSorage",
    //         "motherboard":"testMotherboard",
    //         "powerSupply":"testpowerSupply",
    //         "caseName":"testCase",
    //         "cooling": "testCooling",
    //       },
    //   });
      
      alert(`You entered: ${buildText}`);
      setBuildText('');
    } catch (err) {
      console.error(err);
    }
  };

  // const handleFormSubmit = async (event) => {
  //   event.preventDefault();

  //   try {
  //     const { data } = await addThought({
  //       variables: {
  //         thoughtText,
  //         thoughtAuthor: Auth.getProfile().data.username,
  //       },
  //     );

  //     setThoughtText('');
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

      

      // const [addBuild, { error }] = useMutation
      // (ADD_BUILD, {
      //   refetchQueries: [
      //     QUERY_BUILDS,
      //     'getBuild',
      //     QUERY_ME,
      //     'me'
      //   ]
      // });

   
    
    
    // try {
    //   const { data } = await addThought({
    //     variables: {

    //       name
    //       cpu
    //       gpu
    //       ram
    //       storage
    //       motherboard
    //       powerSupply
    //       caseName
    //       cooling
    //       createdAt


    //       thoughtText,
    //       thoughtAuthor: Auth.getProfile().data.username,

          
    //     },
    //   });
    //   alert(`You entered: ${buildText}`);
    //   setBuildText('');
    // } catch (err) {
    //   console.error(err);
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
      <div>
        <input
          style={styles.inputStyle}
          type="text"
          onChange={handleInputChange}
          placeholder="Build Name..."
        />
        <br/>
        <br/>
        <button className="btn btn-primary btn-block py-3" onClick={handleButtonClick} >Save Build</button>
      </div>
    </div>
  );
};

export default BuildOnMyOwn;