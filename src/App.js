import React from 'react';
import { useState } from "react";
import { createContext } from "react";
import { useEffect } from "react";


import Input from './components/inputfield.js';
import Scoreboard from './components/scoreboard.js';

import './App.css';

// Create a new context and export
export const PointsContext = createContext();
 
// Create a Context Provider
const PointsContextProvider = ({ children }) => {
    const [points, setPoints] = useState(0);
 
    return (
        <PointsContext.Provider value={{ points, setPoints }}>
            {children}
        </PointsContext.Provider>
    );
};
function App() {
  
  const [treat, setTreat] = React.useState('');
  const [visible, setVisible] = React.useState(false);
  const [points, setPoints] = React.useState(0);
  const [minCount, setMinCount] = React.useState(1);


  function updateMinCount () {
    if (treat === "Theatre Box Candy") {
setMinCount(1);
    }
    else if (treat === "Candy Assorted") {
      setMinCount(5);
    }
    else if (treat === "Snack Variety") {
      setMinCount(1);
    }
    else if (treat === "Dum Dums") {
      setMinCount(15);
    }
    else if (treat === "Juice Soda") {
      setMinCount(1);
    }
    else if (treat === "Cookies and Cupcakes") {
      setMinCount(1);
    }
    else {
    }

  }
  const handleChange = (event) => {
    setTreat(event.target.value);
    setVisible(true)

 
  };
  useEffect(() => {
    console.log(treat); 
    updateMinCount(); // Access the updated value here
  }, [treat]);
  return (
    <div>
      <PointsContextProvider>
    <h1>Sweet Sixteen Scoreboard</h1>
    
<Scoreboard points = {0}/>

    <h2>Select Treat Type</h2>

<select onChange={handleChange}  >
<option hidden value="Select Treat Type">Select Treat Type</option>
<option >Theatre Box Candy</option>
<option >Candy Assorted</option>
<option >Snack Variety</option>
<option >Dum Dums</option>
<option>Juice and Soda</option>
<option >Cookies and Cupcakes</option>
</select>
   {visible ? <Input minCount = {minCount} itemName = {treat} /> : null }
   </PointsContextProvider>
   </div>
  );
  
}

export default App;
